import mongoose, { type Document, Schema } from "mongoose"

export interface IProductTag extends Document {
  product: mongoose.Types.ObjectId
  tag: mongoose.Types.ObjectId
}

const productTagSchema = new Schema<IProductTag>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    tag: {
      type: Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Compound index to ensure uniqueness of product-tag pairs
productTagSchema.index({ product: 1, tag: 1 }, { unique: true })

export const ProductTag = mongoose.model<IProductTag>("ProductTag", productTagSchema)

