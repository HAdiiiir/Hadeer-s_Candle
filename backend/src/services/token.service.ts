import jwt, { SignOptions } from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// 1. Define the User interface
interface IUser {
  _id: mongoose.Types.ObjectId;
  role: string;
  emailVerified: boolean;
}

// 2. Strongly typed configuration
interface TokenConfig {
  jwtSecret: string;
  jwtExpiresIn: string | number;
  refreshSecret: string;
  refreshExpiresIn: string | number;
}

const config: TokenConfig = {
  jwtSecret: process.env.JWT_SECRET || 'default-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '30d',
  refreshSecret: process.env.REFRESH_TOKEN_SECRET || 'default-refresh-secret',
  refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '90d',
};

// 3. Token payload interfaces
interface AccessTokenPayload {
  id: string;
  role: string;
  emailVerified: boolean;
}

interface RefreshTokenPayload {
  id: string;
}

// 4. Enhanced Token Service
export const TokenService = {
  /**
   * Generate JWT access token
   */
  generateAccessToken(user: IUser): string {
    const payload: AccessTokenPayload = {
      id: user._id.toString(),
      role: user.role,
      emailVerified: user.emailVerified,
    };

    const options: SignOptions = {
      expiresIn: config.jwtExpiresIn,
      algorithm: 'HS256',
    };

    return jwt.sign(payload, config.jwtSecret, options);
  },

  /**
   * Generate refresh token
   */
  generateRefreshToken(user: IUser): string {
    const payload: RefreshTokenPayload = {
      id: user._id.toString(),
    };

    const options: SignOptions = {
      expiresIn: config.refreshExpiresIn,
      algorithm: 'HS256',
    };

    return jwt.sign(payload, config.refreshSecret, options);
  },

  /**
   * Verify refresh token
   */
  verifyRefreshToken(token: string): RefreshTokenPayload {
    return jwt.verify(token, config.refreshSecret) as RefreshTokenPayload;
  },

  /**
   * Verify access token
   */
  verifyAccessToken(token: string): AccessTokenPayload {
    return jwt.verify(token, config.jwtSecret) as AccessTokenPayload;
  },
};

export default TokenService;