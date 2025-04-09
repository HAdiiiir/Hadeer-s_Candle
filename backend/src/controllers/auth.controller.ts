import type { Request, Response } from "express";
import User from "../models/user.model";

// =============================================
// CONSTANTS & INTERFACES
// =============================================
const INVALID_CREDENTIALS_MESSAGE = "Invalid credentials";
const USER_NOT_FOUND_MESSAGE = "User not found";

interface UserProfile {
  name?: string;
  phone?: string;
  address?: any;
}

// =============================================
// AUTHENTICATION CONTROLLERS
// =============================================

/**
 * Register a new user
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validate email uniqueness
    await validateEmailUniqueness(email);

    // Create and save user
    const user = await User.create({ name, email, password, phone });
    const token = user.generateAuthToken();

    sendAuthResponse(res, 201, {
      message: "Registration successful",
      token,
      user: formatUserResponse(user),
    });

  } catch (error: any) {
    handleAuthError(res, 400, "Error registering user", error);
  }
};

/**
 * Login existing user
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Authenticate user
    const user = await authenticateUser(email, password);
    const token = user.generateAuthToken();

    sendAuthResponse(res, 200, {
      message: "Login successful",
      token,
      user: formatUserResponse(user),
    });

  } catch (error: any) {
    handleAuthError(res, 500, "Error logging in", error);
  }
};

// =============================================
// USER PROFILE CONTROLLERS
// =============================================

/**
 * Get current authenticated user's profile
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await findUserById(userId);

    res.status(200).json({
      success: true,
      user: formatUserResponse(user),
    });

  } catch (error: any) {
    handleAuthError(res, 500, "Error fetching user", error);
  }
};

/**
 * Update user profile information
 */
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { name, phone, address } = req.body;

    const updatedUser = await updateUserProfile(userId, { name, phone, address });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: formatUserResponse(updatedUser),
    });

  } catch (error: any) {
    handleAuthError(res, 400, "Error updating profile", error);
  }
};

/**
 * Change user password
 */
export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { currentPassword, newPassword } = req.body;

    await updateUserPassword(userId, currentPassword, newPassword);

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error: any) {
    handleAuthError(res, 400, "Error changing password", error);
  }
};

// =============================================
// HELPER FUNCTIONS
// =============================================

async function validateEmailUniqueness(email: string) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }
}

async function authenticateUser(email: string, password: string) {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error(INVALID_CREDENTIALS_MESSAGE);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error(INVALID_CREDENTIALS_MESSAGE);
  }

  return user;
}

async function findUserById(userId: string) {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new Error(USER_NOT_FOUND_MESSAGE);
  }
  return user;
}

async function updateUserProfile(userId: string, updates: UserProfile) {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    throw new Error(USER_NOT_FOUND_MESSAGE);
  }

  return user;
}

async function updateUserPassword(userId: string, currentPassword: string, newPassword: string) {
  const user = await User.findById(userId).select("+password");
  if (!user) {
    throw new Error(USER_NOT_FOUND_MESSAGE);
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  user.password = newPassword;
  await user.save();
}

function formatUserResponse(user: any) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    address: user.address,
  };
}

// =============================================
// RESPONSE HELPERS
// =============================================

function sendAuthResponse(res: Response, status: number, data: any) {
  res.status(status).json({
    success: true,
    ...data,
  });
}

function handleAuthError(res: Response, status: number, message: string, error: any) {
  res.status(status).json({
    success: false,
    message,
    error: error.message,
  });
}