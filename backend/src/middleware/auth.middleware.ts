import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface DecodedToken {
  id: string
  role: string
  iat: number
  exp: number
}

// Authenticate user
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      })
    }

    const token = authHeader.split(" ")[1]

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as DecodedToken

    // Add user to request object
    ;(req as any).user = {
      id: decoded.id,
      role: decoded.role,
    }

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token. Please log in again.",
    })
  }
}

// Authorize roles
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user.role

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this resource",
      })
    }

    next()
  }
}

