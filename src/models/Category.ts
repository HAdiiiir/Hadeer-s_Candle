import mongoose, { type Document, Schema } from "mongoose"

export interface ICategory extends Document {
  name: string
  description: string
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Category description is required"],
    },
  },
  {
    timestamps: true,
  },
)

export const Category = mongoose.model<ICategory>("Category", categorySchema)

