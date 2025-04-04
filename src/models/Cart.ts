import mongoose, { type Document, Schema } from "mongoose"

export interface ICart extends Document {
  user: mongoose.Types.ObjectId
  items: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "CartItem",
      },
    ],
  },
  {
    timestamps: true,
  },
)

export const Cart = mongoose.model<ICart>("Cart", cartSchema)

