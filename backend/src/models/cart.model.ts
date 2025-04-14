import mongoose, { Document, Schema, Model, Types } from "mongoose";
import { IProduct } from "./product.model"; // Assuming you have a Product model
import { IUser } from "./user.model"; // Assuming you have a User model

// =============================================
// ENHANCED INTERFACE DEFINITIONS
// =============================================
export interface ICartItem {
  product: Types.ObjectId | IProduct;
  quantity: number;
  priceSnapshot: number;
  addedAt: Date;
  selected: boolean;
}

export interface ICart extends Document {
  user: Types.ObjectId | IUser;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
  sessionId?: string; // For guest users
  couponCode?: string;
  lastActiveAt: Date;
}

// =============================================
// SCHEMA DEFINITION WITH ENHANCED VALIDATION
// =============================================
const CartItemSchema = new Schema<ICartItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity cannot be less than 1"],
      max: [50, "Cannot add more than 50 of the same product"],
      default: 1,
    },
    priceSnapshot: {
      type: Number,
      required: [true, "Price snapshot is required"],
      min: [0, "Price cannot be negative"],
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
    selected: {
      type: Boolean,
      default: true, // Item is selected for checkout by default
    },
  },
  { _id: false }
);

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return !this.sessionId; // User is required unless it's a guest cart
      },
      unique: true,
      sparse: true, // Allows multiple null values for guest carts
    },
    sessionId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    items: {
      type: [CartItemSchema],
      default: [],
      validate: [
        {
          validator: (items: ICartItem[]) => items.length <= 100,
          message: "Cart cannot contain more than 100 items",
        },
        {
          validator: function (items: ICartItem[]) {
            const productIds = items.map((item) => item.product.toString());
            return new Set(productIds).size === productIds.length; // No duplicates
          },
          message: "Cart cannot contain duplicate products",
        },
      ],
    },
    couponCode: {
      type: String,
      trim: true,
      uppercase: true,
    },
    lastActiveAt: {
      type: Date,
      default: Date.now,
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
    collation: { locale: "en", strength: 2 }, // Case-insensitive queries
  }
);

// =============================================
// INDEXES FOR PERFORMANCE OPTIMIZATION
// =============================================
cartSchema.index({ user: 1 });
cartSchema.index({ sessionId: 1 });
cartSchema.index({ lastActiveAt: 1 });
cartSchema.index({ "items.product": 1 });

// =============================================
// SCHEMA VIRTUALS & METHODS
// =============================================

// Total items count (sum of quantities)
cartSchema.virtual("totalItems").get(function (this: ICart) {
  return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

// Total selected items count (for checkout)
cartSchema.virtual("selectedItemsCount").get(function (this: ICart) {
  return this.items
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.quantity, 0);
});

// Subtotal calculation (sum of selected items)
cartSchema.virtual("subtotal").get(function (this: ICart) {
  return this.items
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.quantity * item.priceSnapshot, 0);
});

// Estimated tax (example 10%)
cartSchema.virtual("estimatedTax").get(function (this: ICart) {
  return this.subtotal * 0.1;
});

// Estimated total
cartSchema.virtual("estimatedTotal").get(function (this: ICart) {
  return this.subtotal + this.estimatedTax;
});

// Check if cart is empty
cartSchema.virtual("isEmpty").get(function (this: ICart) {
  return this.items.length === 0;
});

// Method to add item to cart
cartSchema.methods.addItem = async function (
  productId: Types.ObjectId,
  quantity: number = 1,
  price: number
) {
  const existingItemIndex = this.items.findIndex((item) =>
    item.product.equals(productId)
  );

  if (existingItemIndex >= 0) {
    // Update existing item
    this.items[existingItemIndex].quantity += quantity;
    if (price !== undefined) {
      this.items[existingItemIndex].priceSnapshot = price;
    }
  } else {
    // Add new item
    this.items.push({
      product: productId,
      quantity,
      priceSnapshot: price,
      addedAt: new Date(),
      selected: true,
    });
  }

  this.lastActiveAt = new Date();
  return this.save();
};

// Method to remove item from cart
cartSchema.methods.removeItem = async function (productId: Types.ObjectId) {
  this.items = this.items.filter((item) => !item.product.equals(productId));
  this.lastActiveAt = new Date();
  return this.save();
};

// Method to update item quantity
cartSchema.methods.updateItemQuantity = async function (
  productId: Types.ObjectId,
  newQuantity: number
) {
  const item = this.items.find((item) => item.product.equals(productId));
  if (item) {
    item.quantity = newQuantity;
    this.lastActiveAt = new Date();
    return this.save();
  }
  throw new Error("Item not found in cart");
};

// Method to toggle item selection
cartSchema.methods.toggleItemSelection = async function (
  productId: Types.ObjectId
) {
  const item = this.items.find((item) => item.product.equals(productId));
  if (item) {
    item.selected = !item.selected;
    this.lastActiveAt = new Date();
    return this.save();
  }
  throw new Error("Item not found in cart");
};

// Method to clear cart
cartSchema.methods.clearCart = async function () {
  this.items = [];
  this.couponCode = undefined;
  this.lastActiveAt = new Date();
  return this.save();
};

// Static method to find cart by user or session
cartSchema.statics.findByUserOrSession = async function (
  userId?: Types.ObjectId,
  sessionId?: string
) {
  if (userId) {
    return this.findOne({ user: userId });
  }
  if (sessionId) {
    return this.findOne({ sessionId });
  }
  return null;
};

// =============================================
// MIDDLEWARE FOR CART MANAGEMENT
// =============================================

// Auto-update lastActiveAt on any cart modification
cartSchema.pre("save", function (next) {
  if (this.isModified("items") || this.isModified("couponCode")) {
    this.lastActiveAt = new Date();
  }
  next();
});

// Cleanup abandoned guest carts after 30 days
cartSchema.statics.cleanupGuestCarts = async function () {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  return this.deleteMany({
    user: { $exists: false },
    lastActiveAt: { $lt: thirtyDaysAgo },
  });
};

// =============================================
// MODEL EXPORT WITH STRONG TYPING
// =============================================
interface ICartModel extends Model<ICart> {
  findByUserOrSession(
    userId?: Types.ObjectId,
    sessionId?: string
  ): Promise<ICart | null>;
  cleanupGuestCarts(): Promise<any>;
}

export const Cart: ICartModel = mongoose.model<ICart, ICartModel>(
  "Cart",
  cartSchema
);

export default Cart;