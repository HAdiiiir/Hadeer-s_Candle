import express, { Request, Response, NextFunction } from "express";
import { authenticate, authorize } from "../middleware/auth.middleware";
import User from "../models/user.model";
import rateLimit from "express-rate-limit";
import validate from "../middleware/validate.middleware";
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema
} from "../validations/auth.validation";
import {
  generateAuthToken,
  generateRefreshToken,
  verifyRefreshToken
} from "../services/token.service";
import { sendVerificationEmail, sendPasswordResetEmail } from "../services/email.service";

const router = express.Router();

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: "Too many requests from this IP, please try again later"
});

// =============================================
// PUBLIC ROUTES
// =============================================

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     description: Creates a new user account with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or user already exists
 *       429:
 *         description: Too many requests
 */
router.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, phone } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User with this email already exists"
        });
      }

      // Create new user
      const user = await User.create({
        name,
        email,
        password,
        phone,
        preferences: {
          theme: "light",
          notifications: {
            email: true,
            push: true
          }
        }
      });

      // Generate tokens
      const accessToken = generateAuthToken(user);
      const refreshToken = generateRefreshToken(user);

      // Set refresh token as HTTP-only cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: "strict"
      });

      // Respond with user data (excluding sensitive info)
      res.status(201).json({
        success: true,
        message: "User registered successfully. Verification email sent.",
        token: accessToken,
        user: user.toProfileJSON()
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Authenticate user
 *     description: Logs in a user and returns authentication tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       400:
 *         description: Invalid credentials or validation error
 *       401:
 *         description: Email not verified
 *       429:
 *         description: Too many requests
 */
router.post(
  "/login",
  authLimiter,
  validate(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials"
        });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials"
        });
      }

      // Check if email is verified
      if (!user.emailVerified && !user.socialAuth) {
        return res.status(401).json({
          success: false,
          message: "Please verify your email address first"
        });
      }

      // Update last login and login count
      user.lastLogin = new Date();
      user.loginCount += 1;
      await user.save();

      // Generate tokens
      const accessToken = generateAuthToken(user);
      const refreshToken = generateRefreshToken(user);

      // Set refresh token as HTTP-only cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: "strict"
      });

      // Respond with user data
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: accessToken,
        user: user.toProfileJSON()
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     tags: [Authentication]
 *     summary: Refresh access token
 *     description: Generates a new access token using a refresh token
 *     responses:
 *       200:
 *         description: New access token generated
 *       401:
 *         description: Invalid or expired refresh token
 */
router.post("/refresh-token", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "No refresh token provided"
      });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    const accessToken = generateAuthToken(user);
    res.status(200).json({
      success: true,
      token: accessToken
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/auth/verify-email:
 *   post:
 *     tags: [Authentication]
 *     summary: Verify email address
 *     description: Verifies a user's email address using the verification token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyEmail'
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired token
 */
router.post(
  "/verify-email",
  validate(verifyEmailSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.body;

      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      const user = await User.findOne({
        verificationToken: hashedToken,
        verificationTokenExpires: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired verification token"
        });
      }

      user.emailVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpires = undefined;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Email verified successfully"
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     tags: [Authentication]
 *     summary: Request password reset
 *     description: Sends a password reset email to the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPassword'
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       404:
 *         description: User not found
 */
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      const resetToken = user.generatePasswordResetToken();
      await user.save({ validateBeforeSave: false });

      await sendPasswordResetEmail({
        email: user.email,
        name: user.name,
        resetToken
      });

      res.status(200).json({
        success: true,
        message: "Password reset email sent"
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     tags: [Authentication]
 *     summary: Reset password
 *     description: Resets user password using the reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired token
 */
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, password } = req.body;

      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired reset token"
        });
      }

      user.password = password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Password reset successfully"
      });
    } catch (error) {
      next(error);
    }
  }
);

// =============================================
// PROTECTED ROUTES
// =============================================

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     tags: [Authentication]
 *     summary: Get current user profile
 *     description: Returns the authenticated user's profile information
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: Unauthorized
 */
router.get("/me", authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user: user.toProfileJSON()
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/auth/profile:
 *   put:
 *     tags: [Authentication]
 *     summary: Update user profile
 *     description: Updates the authenticated user's profile information
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfile'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/profile",
  authenticate,
  validate(updateProfileSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updates = req.body;
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updates },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: user?.toProfileJSON()
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/auth/password:
 *   put:
 *     tags: [Authentication]
 *     summary: Change user password
 *     description: Changes the authenticated user's password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePassword'
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Current password is incorrect or validation error
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/password",
  authenticate,
  validate(changePasswordSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await User.findById(req.user.id).select("+password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      // Verify current password
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect"
        });
      }

      // Update password
      user.password = newPassword;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully"
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: [Authentication]
 *     summary: Logout user
 *     description: Clears authentication tokens and logs out the user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/logout", authenticate, (req: Request, res: Response) => {
  // Clear refresh token cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
});

export default router;