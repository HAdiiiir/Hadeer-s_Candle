import mongoose, { type Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// =============================================
// INTERFACE DEFINITION
// =============================================
export interface IUserAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  phone?: string;
  address?: IUserAddress;
  wishlist: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
}

// =============================================
// SCHEMA DEFINITION
// =============================================
const AddressSchema = new Schema<IUserAddress>({
  street: {
    type: String,
    trim: true,
    required: [true, "Street address is required when providing address"],
  },
  city: {
    type: String,
    trim: true,
    required: [true, "City is required when providing address"],
  },
  state: {
    type: String,
    trim: true,
    required: [true, "State is required when providing address"],
  },
  postalCode: {
    type: String,
    trim: true,
    required: [true, "Postal code is required when providing address"],
  },
  country: {
    type: String,
    trim: true,
    required: [true, "Country is required when providing address"],
  },
});

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: {
      type: String,
      trim: true,
      match: [
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{3,6}[-\s.]?[0-9]{0,6}$/,
        "Please provide a valid phone number",
      ],
    },
    address: {
      type: AddressSchema,
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        default: [],
      },
    ],
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

// =============================================
// MIDDLEWARE
// =============================================
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(new Error(`Password hashing failed: ${error.message}`));
  }
});

// =============================================
// INSTANCE METHODS
// =============================================
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function (): string {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET || "your-secret-key",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "30d",
      algorithm: "HS256",
    }
  );
};

// =============================================
// INDEXES
// =============================================
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ "address.city": 1, "address.country": 1 });

// =============================================
// MODEL EXPORT
// =============================================
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;