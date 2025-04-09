import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// =============================================
// TYPE DEFINITIONS
// =============================================
interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

// =============================================
// CONSTANTS
// =============================================
const UNAUTHORIZED_MESSAGE = "Authentication required. Please log in.";
const INVALID_TOKEN_MESSAGE = "Invalid token. Please log in again.";
const FORBIDDEN_MESSAGE = "Not authorized to access this resource";

// =============================================
// AUTHENTICATION MIDDLEWARE
// =============================================
export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: UNAUTHORIZED_MESSAGE,
        code: "MISSING_AUTH_TOKEN",
      });
    }

    const token = authHeader.split(" ")[1].trim();

    // Verify and decode token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as DecodedToken;

    // Attach user to request object
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    const errorMessage = error instanceof jwt.TokenExpiredError
      ? "Token expired. Please log in again."
      : INVALID_TOKEN_MESSAGE;

    return res.status(401).json({
      success: false,
      message: errorMessage,
      code: "INVALID_AUTH_TOKEN",
    });
  }
};

// =============================================
// AUTHORIZATION MIDDLEWARE
// =============================================
export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Ensure authentication ran first
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: UNAUTHORIZED_MESSAGE,
        code: "USER_NOT_AUTHENTICATED",
      });
    }

    // Check if user has required role
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: FORBIDDEN_MESSAGE,
        code: "INSUFFICIENT_PERMISSIONS",
        requiredRoles: allowedRoles,
        userRole: req.user.role,
      });
    }

    next();
  };
};

// =============================================
// ROLE-SPECIFIC SHORTCUTS
// =============================================
export const adminOnly = authorize("admin");
export const userOnly = authorize("user");