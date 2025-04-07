import mongoose, { type Document, Schema } from "mongoose"

export interface ICartItem {
  product: mongoose.Types.ObjectId
  quantity: number
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId
  items: ICartItem[]
  createdAt: Date
  updatedAt: Date
}

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required for a cart"],
    },
    items: [
      {
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
    ],
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<ICart>("Cart", cartSchema)

