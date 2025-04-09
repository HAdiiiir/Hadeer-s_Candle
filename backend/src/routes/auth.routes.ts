import express from "express";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

// =============================================
// PUBLIC ROUTES (No authentication required)
// =============================================

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", (req: express.Request, res: express.Response) => {
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token: "sample-token",
    user: {
      id: "new-user-id",
      name: req.body.name,
      email: req.body.email,
      role: "user",
    },
  });
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and get token
 * @access  Public
 */
router.post("/login", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    token: "sample-token",
    user: {
      id: "user-id",
      name: "Sample User",
      email: req.body.email,
      role: "user",
    },
  });
});

// =============================================
// PROTECTED ROUTES (Require authentication)
// =============================================

/**
 * @route   GET /api/auth/me
 * @desc    Get current user's profile
 * @access  Private
 */
router.get("/me", authenticate, (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    user: {
      id: (req as any).user.id,
      name: "Sample User",
      email: "user@example.com",
      role: (req as any).user.role,
    },
  });
});

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put("/profile", authenticate, (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: {
      id: (req as any).user.id,
      ...req.body,
    },
  });
});

/**
 * @route   PUT /api/auth/password
 * @desc    Change user password
 * @access  Private
 */
router.put("/password", authenticate, (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

export default router;