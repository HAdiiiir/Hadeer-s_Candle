import mongoose, { type Document, Schema } from "mongoose"

export interface IProduct extends Document {
  name: string
  description: string
  category: mongoose.Types.ObjectId
  waxType?: "gel" | "palm" | "soy"
  weight?: number
  shape?: string
  price: number
  image: string
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    waxType: {
      type: String,
      enum: ["gel", "palm", "soy"],
    },
    weight: {
      type: Number,
    },
    shape: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual for reviews
productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
})

export const Product = mongoose.model<IProduct>("Product", productSchema)

