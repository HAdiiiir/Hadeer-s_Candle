import mongoose, { type Document, Schema } from "mongoose"

export interface IReview extends Document {
  user: mongoose.Types.ObjectId
  product: mongoose.Types.ObjectId
  rating: number
  comment: string
  createdAt: Date
}

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
  },
  {
    timestamps: true,
  },
)

// Compound index to ensure a user can only review a product once
reviewSchema.index({ user: 1, product: 1 }, { unique: true })

export const Review = mongoose.model<IReview>("Review", reviewSchema)

