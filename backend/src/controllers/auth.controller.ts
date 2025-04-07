import type { Request, Response } from "express"
import User from "../models/user.model"

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      })
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
    })

    // Generate token
    const token = user.generateAuthToken()

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    })
  }
}

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    // Generate token
    const token = user.generateAuthToken()

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    })
  }
}

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id // From auth middleware

    const user = await User.findById(userId).select("-password")
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    })
  }
}

// Update user profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id // From auth middleware
    const { name, phone, address } = req.body

    // Fields to update
    const updateFields: any = {}
    if (name) updateFields.name = name
    if (phone) updateFields.phone = phone
    if (address) updateFields.address = address

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true },
    ).select("-password")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    })
  }
}

// Change password
export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id // From auth middleware
    const { currentPassword, newPassword } = req.body

    // Find user
    const user = await User.findById(userId).select("+password")
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Check current password
    const isMatch = await user.comparePassword(currentPassword)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      })
    }

    // Update password
    user.password = newPassword
    await user.save()

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error changing password",
      error: error.message,
    })
  }
}

