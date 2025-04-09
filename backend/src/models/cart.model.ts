import mongoose, { type Document, Schema, Model } from "mongoose";

// =============================================
// INTERFACE DEFINITIONS
// =============================================
export interface ICartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

// =============================================
// SCHEMA DEFINITION
// =============================================
const CartItemSchema = new Schema<ICartItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product reference is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity cannot be less than 1"],
    default: 1,
  },
});

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      unique: true, // One cart per user
    },
    items: {
      type: [CartItemSchema],
      default: [], // Initialize with empty array
      validate: {
        validator: (items: ICartItem[]) => items.length <= 100,
        message: "Cart cannot contain more than 100 items",
      },
    },
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
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

// =============================================
// SCHEMA VIRTUALS & METHODS
// =============================================
cartSchema.virtual("totalItems").get(function (this: ICart) {
  return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

// =============================================
// MODEL EXPORT
// =============================================
const Cart: Model<ICart> = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;