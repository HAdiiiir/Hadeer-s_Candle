import type { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { User } from "../models/User"
import { ApiError } from "../utils/ApiError"
import { Cart } from "../models/Cart"

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new ApiError(400, "User with this email already exists")
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
    })

    // Create empty cart for the user
    await Cart.create({
      user: user._id,
      items: [],
    })

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "30d",
    })

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    // Send response without password
    const userWithoutPassword = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error("Error registering user:", error)

    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      })
    }

    res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: (error as Error).message,
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
      throw new ApiError(401, "Invalid email or password")
    }

    // Check if password is correct
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password")
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "30d",
    })

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    // Send response without password
    const userWithoutPassword = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error("Error logging in:", error)

    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      })
    }

    res.status(500).json({
      success: false,
      message: "Failed to login",
      error: (error as Error).message,
    })
  }
}

// Logout user
export const logout = (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  })
}

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // User is already attached to req by auth middleware
    const user = req.user

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    console.error("Error getting current user:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get current user",
      error: (error as Error).message,
    })
  }
}

