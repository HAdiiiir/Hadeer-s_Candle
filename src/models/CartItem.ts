import mongoose, { type Document, Schema } from "mongoose"

export interface ICartItem extends Document {
  cart: mongoose.Types.ObjectId
  product: mongoose.Types.ObjectId
  quantity: number
}

const cartItemSchema = new Schema<ICartItem>(
  {
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
      default: 1,
    },
  },
  {
    timestamps: true,
  },
)

// Compound index to ensure uniqueness of cart-product pairs
cartItemSchema.index({ cart: 1, product: 1 }, { unique: true })

export const CartItem = mongoose.model<ICartItem>("CartItem", cartItemSchema)

