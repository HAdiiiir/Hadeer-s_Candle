import mongoose, { type Document, Schema } from "mongoose"

export interface ITag extends Document {
  name: string
}

const tagSchema = new Schema<ITag>(
  {
    name: {
      type: String,
      required: [true, "Tag name is required"],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Tag = mongoose.model<ITag>("Tag", tagSchema)

