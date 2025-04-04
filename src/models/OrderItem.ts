import mongoose, { type Document, Schema } from "mongoose"

export interface IOrderItem extends Document {
  order: mongoose.Types.ObjectId
  product: mongoose.Types.ObjectId
  name: string
  quantity: number
  price: number
  image: string
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const OrderItem = mongoose.model<IOrderItem>("OrderItem", orderItemSchema)

