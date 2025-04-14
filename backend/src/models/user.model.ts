import mongoose, { type Document, Schema, Model, Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import crypto from "crypto";
import { sendWelcomeEmail, sendPasswordResetEmail } from "../services/emailService";

// =============================================
// TYPE DEFINITIONS
// =============================================
export interface IUserAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface IUserSocialAuth {
  provider: "google" | "facebook" | "apple";
  providerId: string;
  accessToken?: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin" | "premium";
  phone?: string;
  addresses: IUserAddress[];
  wishlist: Types.ObjectId[];
  socialAuth?: IUserSocialAuth;
  profilePicture?: string;
  emailVerified: boolean;
  verificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  lastLogin?: Date;
  loginCount: number;
  preferences: {
    theme: "light" | "dark";
    notifications: {
      email: boolean;
      push: boolean;
    };
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
  generatePasswordResetToken(): string;
  getDefaultAddress(): IUserAddress | undefined;
  toProfileJSON(): any;
}

// =============================================
// SCHEMA DEFINITIONS
// =============================================
const AddressSchema = new Schema<IUserAddress>({
  street: {
    type: String,
    trim: true,
    required: [true, "Street address is required"],
    maxlength: [200, "Street address cannot exceed 200 characters"]
  },
  city: {
    type: String,
    trim: true,
    required: [true, "City is required"],
    maxlength: [100, "City name cannot exceed 100 characters"]
  },
  state: {
    type: String,
    trim: true,
    required: [true, "State is required"],
    maxlength: [100, "State name cannot exceed 100 characters"]
  },
  postalCode: {
    type: String,
    trim: true,
    required: [true, "Postal code is required"],
    validate: {
      validator: function(v: string) {
        return /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/i.test(v);
      },
      message: "Invalid postal code format"
    }
  },
  country: {
    type: String,
    trim: true,
    required: [true, "Country is required"],
    maxlength: [100, "Country name cannot exceed 100 characters"]
  },
  isDefault: {
    type: Boolean,
    default: false
  }
});

const SocialAuthSchema = new Schema<IUserSocialAuth>({
  provider: {
    type: String,
    enum: ["google", "facebook", "apple"],
    required: true
  },
  providerId: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    select: false
  }
});

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
      minlength: [2, "Name must be at least 2 characters"]
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Please provide a valid email address"
      }
    },
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
      validate: {
        validator: function(this: IUser, value: string) {
          // Only validate password if it's being modified or new
          if (!this.isModified('password') || this.socialAuth) return true;
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
        },
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      }
    },
    role: {
      type: String,
      enum: ["user", "admin", "premium"],
      default: "user"
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: (value: string) => validator.isMobilePhone(value, 'any'),
        message: "Please provide a valid phone number"
      }
    },
    addresses: {
      type: [AddressSchema],
      default: [],
      validate: {
        validator: function(addresses: IUserAddress[]) {
          // Ensure only one default address exists
          const defaultCount = addresses.filter(addr => addr.isDefault).length;
          return defaultCount <= 1;
        },
        message: "Only one address can be set as default"
      }
    },
    wishlist: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
      default: []
    },
    socialAuth: {
      type: SocialAuthSchema,
      select: false
    },
    profilePicture: {
      type: String,
      default: "https://res.cloudinary.com/your-cloud/image/upload/v1620000000/default-profile.png",
      validate: {
        validator: (value: string) => validator.isURL(value, {
          protocols: ['http', 'https'],
          require_protocol: true
        }),
        message: "Profile picture must be a valid URL"
      }
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String,
      select: false
    },
    passwordResetToken: {
      type: String,
      select: false
    },
    passwordResetExpires: {
      type: Date,
      select: false
    },
    lastLogin: {
      type: Date
    },
    loginCount: {
      type: Number,
      default: 0
    },
    preferences: {
      type: {
        theme: {
          type: String,
          enum: ["light", "dark"],
          default: "light"
        },
        notifications: {
          type: {
            email: {
              type: Boolean,
              default: true
            },
            push: {
              type: Boolean,
              default: true
            }
          },
          default: {}
        }
      },
      default: {}
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.socialAuth;
        delete ret.verificationToken;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        return ret;
      }
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.socialAuth;
        delete ret.verificationToken;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        return ret;
      }
    }
  }
);

// =============================================
// VIRTUAL PROPERTIES
// =============================================
userSchema.virtual("fullAddress").get(function() {
  if (this.addresses && this.addresses.length > 0) {
    const defaultAddress = this.addresses.find(addr => addr.isDefault) || this.addresses[0];
    return `${defaultAddress.street}, ${defaultAddress.city}, ${defaultAddress.state} ${defaultAddress.postalCode}, ${defaultAddress.country}`;
  }
  return undefined;
});

// =============================================
// MIDDLEWARE
// =============================================
userSchema.pre<IUser>("save", async function(next) {
  if (!this.isModified("password") || !this.password) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(new Error(`Password hashing failed: ${error.message}`));
  }
});

userSchema.post<IUser>("save", async function(doc) {
  if (this.isNew && !this.socialAuth) {
    try {
      // Generate verification token
      const verificationToken = crypto.randomBytes(20).toString('hex');
      this.verificationToken = crypto
        .createHash('sha256')
        .update(verificationToken)
        .digest('hex');
      
      await this.save({ validateBeforeSave: false });
      
      // Send welcome email with verification link
      await sendWelcomeEmail({
        email: this.email,
        name: this.name,
        verificationToken
      });
    } catch (error) {
      console.error("Error sending welcome email:", error);
    }
  }
});

// =============================================
// INSTANCE METHODS
// =============================================
userSchema.methods.comparePassword = async function(
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function(): string {
  return jwt.sign(
    { 
      id: this._id, 
      role: this.role,
      emailVerified: this.emailVerified
    },
    process.env.JWT_SECRET || "your-secret-key",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "30d",
      algorithm: "HS256",
      issuer: process.env.JWT_ISSUER || "your-app-name"
    }
  );
};

userSchema.methods.generatePasswordResetToken = function(): string {
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  
  return resetToken;
};

userSchema.methods.getDefaultAddress = function(): IUserAddress | undefined {
  if (this.addresses && this.addresses.length > 0) {
    return this.addresses.find(addr => addr.isDefault) || this.addresses[0];
  }
  return undefined;
};

userSchema.methods.toProfileJSON = function(): any {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    profilePicture: this.profilePicture,
    emailVerified: this.emailVerified,
    addresses: this.addresses,
    preferences: this.preferences,
    stats: {
      wishlistCount: this.wishlist.length,
      loginCount: this.loginCount,
      memberSince: this.createdAt
    }
  };
};

// =============================================
// STATIC METHODS
// =============================================
userSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email });
};

userSchema.statics.findBySocialAuth = function(provider: string, providerId: string) {
  return this.findOne({ 
    "socialAuth.provider": provider, 
    "socialAuth.providerId": providerId 
  });
};

// =============================================
// INDEXES
// =============================================
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ "addresses.city": 1, "addresses.country": 1 });
userSchema.index({ "socialAuth.provider": 1, "socialAuth.providerId": 1 }, { sparse: true });
userSchema.index({ createdAt: 1 });
userSchema.index({ lastLogin: 1 });

// =============================================
// MODEL EXPORT
// =============================================
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;