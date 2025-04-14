import mongoose, { Document, Schema, Model, Types } from "mongoose";
import slugify from "slugify"; // For automatic slug generation
import { IProduct } from "./product.model"; // Assuming you have a Product model

// =============================================
// ENHANCED INTERFACE DEFINITIONS
// =============================================
export interface ICategory extends Document {
  name: string;
  description: string;
  image?: string;
  bannerImage?: string;
  icon?: string;
  slug: string;
  parent?: Types.ObjectId | ICategory;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
  path?: string[];
  ancestors: Types.ObjectId[];
  childrenCount?: number;
  productCount?: number;
}

// =============================================
// SCHEMA DEFINITION WITH ENHANCED VALIDATION
// =============================================
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
      maxlength: [50, "Category name cannot exceed 50 characters"],
      minlength: [2, "Category name must be at least 2 characters"],
    },
    description: {
      type: String,
      required: [true, "Category description is required"],
      trim: true,
      minlength: [10, "Description should be at least 10 characters"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    image: {
      type: String,
      validate: {
        validator: (value: string) => {
          if (!value) return true;
          return /\.(jpg|jpeg|png|webp|avif)$/i.test(value);
        },
        message: "Please provide a valid image URL (jpg, jpeg, png, webp, avif)",
      },
    },
    bannerImage: {
      type: String,
      validate: {
        validator: (value: string) => {
          if (!value) return true;
          return /\.(jpg|jpeg|png|webp|avif)$/i.test(value);
        },
        message: "Please provide a valid banner image URL",
      },
    },
    icon: {
      type: String,
      validate: {
        validator: (value: string) => {
          if (!value) return true;
          return /\.(svg|png)$/i.test(value);
        },
        message: "Icon must be an SVG or PNG file",
      },
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-z0-9-]+$/,
        "Slug can only contain letters, numbers and hyphens",
      ],
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      validate: {
        validator: async function (value: Types.ObjectId) {
          if (!value) return true;
          if (this._id && value.equals(this._id)) return false; // Can't be parent of itself
          return mongoose.model("Category").exists({ _id: value });
        },
        message: "Parent category does not exist or is invalid",
      },
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    seoTitle: {
      type: String,
      trim: true,
      maxlength: [70, "SEO title cannot exceed 70 characters"],
    },
    seoDescription: {
      type: String,
      trim: true,
      maxlength: [160, "SEO description cannot exceed 160 characters"],
    },
    displayOrder: {
      type: Number,
      default: 0,
      min: [0, "Display order cannot be negative"],
    },
    ancestors: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
      default: [],
      index: true,
    },
    path: {
      type: [String],
      default: [],
      select: false, // Typically not needed in queries
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
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
    collation: { locale: "en", strength: 2 }, // Case-insensitive queries
  }
);

// =============================================
// INDEXES FOR PERFORMANCE OPTIMIZATION
// =============================================
categorySchema.index({ slug: 1 });
categorySchema.index({ name: "text", description: "text" });
categorySchema.index({ featured: 1, displayOrder: 1 });
categorySchema.index({ parent: 1, displayOrder: 1 });

// =============================================
// PRE-SAVE MIDDLEWARE
// =============================================

// Auto-generate slug if not provided
categorySchema.pre<ICategory>("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Update ancestors and path when parent changes
categorySchema.pre<ICategory>("save", async function (next) {
  if (this.isModified("parent")) {
    if (this.parent) {
      const parentCategory = await mongoose
        .model("Category")
        .findById(this.parent)
        .select("ancestors path");
      
      this.ancestors = [...(parentCategory?.ancestors || []), this.parent];
      this.path = [...(parentCategory?.path || []), this.parent.toString()];
    } else {
      this.ancestors = [];
      this.path = [];
    }
  }
  next();
});

// Update descendants when parent changes (post-save)
categorySchema.post<ICategory>("save", async function (doc) {
  if (doc.isModified("parent") || doc.isModified("ancestors")) {
    // Find all descendants and update their ancestors
    const descendants = await mongoose
      .model("Category")
      .find({ ancestors: doc._id });
    
    for (const descendant of descendants) {
      const newAncestors = [...doc.ancestors, doc._id];
      await descendant.updateOne({ ancestors: newAncestors });
    }
  }
});

// =============================================
// VIRTUAL FIELDS AND POPULATE
// =============================================

// Subcategories count
categorySchema.virtual("childrenCount", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
  count: true,
});

// Products count
categorySchema.virtual("productCount", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
  count: true,
});

// Subcategories with sorting
categorySchema.virtual("subcategories", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
  justOne: false,
  options: { 
    sort: { displayOrder: 1, name: 1 },
    select: "name slug image description featured",
  },
});

// Featured products in category
categorySchema.virtual("featuredProducts", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
  justOne: false,
  options: {
    match: { featured: true },
    limit: 8,
    sort: { createdAt: -1 },
    select: "name price images slug",
  },
});

// Breadcrumb path
categorySchema.virtual("breadcrumb", {
  ref: "Category",
  localField: "ancestors",
  foreignField: "_id",
  justOne: false,
  options: {
    select: "name slug",
    sort: { _id: 1 }, // Maintain ancestor order
  },
});

// =============================================
// CUSTOM METHODS
// =============================================

// Get full category hierarchy
categorySchema.methods.getFullHierarchy = async function () {
  const hierarchy = await mongoose
    .model("Category")
    .aggregate()
    .graphLookup({
      from: "categories",
      startWith: "$_id",
      connectFromField: "_id",
      connectToField: "parent",
      as: "hierarchy",
      maxDepth: 10,
    });
  
  return hierarchy[0]?.hierarchy || [];
};

// Get all products in category and subcategories
categorySchema.methods.getAllProducts = async function (
  limit: number = 50,
  skip: number = 0
) {
  const categoryIds = await this.getFullHierarchy();
  const ids = [this._id, ...categoryIds.map((c: any) => c._id)];
  
  return mongoose
    .model("Product")
    .find({ category: { $in: ids } })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("name price images slug rating");
};

// Check if category is ancestor of another category
categorySchema.methods.isAncestorOf = async function (categoryId: Types.ObjectId) {
  const category = await mongoose.model("Category").findById(categoryId);
  return category?.ancestors.some((id) => id.equals(this._id)) || false;
};

// =============================================
// STATIC METHODS
// =============================================

// Get all root categories (no parent)
categorySchema.statics.getRootCategories = async function () {
  return this.find({ parent: { $exists: false } })
    .sort({ displayOrder: 1, name: 1 })
    .select("name slug image description featured");
};

// Get featured categories
categorySchema.statics.getFeaturedCategories = async function (limit = 8) {
  return this.find({ featured: true })
    .sort({ displayOrder: 1, name: 1 })
    .limit(limit)
    .select("name slug image bannerImage description");
};

// Search categories by name
categorySchema.statics.search = async function (query: string, limit = 10) {
  return this.find({ $text: { $search: query } })
    .sort({ score: { $meta: "textScore" } })
    .limit(limit)
    .select("name slug image description");
};

// =============================================
// MODEL EXPORT WITH STRONG TYPING
// =============================================
interface ICategoryModel extends Model<ICategory> {
  getRootCategories(): Promise<ICategory[]>;
  getFeaturedCategories(limit?: number): Promise<ICategory[]>;
  search(query: string, limit?: number): Promise<ICategory[]>;
}

export const Category: ICategoryModel = mongoose.model<ICategory, ICategoryModel>(
  "Category",
  categorySchema
);

export default Category;