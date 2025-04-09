import mongoose, { type Document, Schema, Model } from "mongoose";

// =============================================
// INTERFACE DEFINITION
// =============================================
export interface ICategory extends Document {
  name: string;
  description: string;
  image?: string;
  slug: string;
  parent?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// =============================================
// SCHEMA DEFINITION
// =============================================
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
      maxlength: [50, "Category name cannot exceed 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Category description is required"],
      trim: true,
      minlength: [10, "Description should be at least 10 characters"],
    },
    image: {
      type: String,
      validate: {
        validator: (value: string) => {
          if (!value) return true;
          return /\.(jpg|jpeg|png|webp)$/i.test(value);
        },
        message: "Please provide a valid image URL (jpg, jpeg, png, webp)",
      },
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, "Slug can only contain letters, numbers and hyphens"],
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      validate: {
        validator: async function (this: ICategory, value: mongoose.Types.ObjectId) {
          if (!value) return true;
          return mongoose.model("Category").exists({ _id: value });
        },
        message: "Parent category does not exist",
      },
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// =============================================
// VIRTUAL POPULATE
// =============================================
categorySchema.virtual("subcategories", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
  justOne: false,
  options: { sort: { name: 1 } }, // Sort subcategories alphabetically
});

categorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
  justOne: false,
  options: { 
    sort: { createdAt: -1 }, // Newest products first
    limit: 50, // Limit to prevent over-fetching
  },
});

// =============================================
// MODEL EXPORT
// =============================================
const Category: Model<ICategory> = mongoose.model<ICategory>("Category", categorySchema);

export default Category;