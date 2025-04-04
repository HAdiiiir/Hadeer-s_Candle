import mongoose, { type Document, Schema } from "mongoose"

export interface IShippingAddress {
  fullName: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId
  orderItems: mongoose.Types.ObjectId[]
  shippingAddress: IShippingAddress
  paymentMethod: string
  paymentResult?: {
    id: string
    status: string
    update_time: string
    email_address: string
  }
  totalPrice: number
  shippingPrice: number
  taxPrice: number
  isPaid: boolean
  paidAt?: Date
  isDelivered: boolean
  deliveredAt?: Date
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: Date
  updatedAt: Date
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "OrderItem",
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
)

export const Order = mongoose.model<IOrder>("Order", orderSchema)

