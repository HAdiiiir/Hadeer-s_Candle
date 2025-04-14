import mongoose, { Document, Schema, Model, Types } from "mongoose";
import slugify from "slugify";
import { ICategory } from "./category.model";
import { IUser } from "./user.model";

// =============================================
// ENHANCED INTERFACE DEFINITIONS
// =============================================
export interface IRating {
  userId: Types.ObjectId | IUser;
  rating: number;
  review?: string;
  date: Date;
  verifiedPurchase: boolean;
  helpfulVotes: number;
  images?: string[];
}

export interface IProductVariant {
  size: string;
  price: number;
  weight: number;
  stock: number;
  sku: string;
  images?: string[];
}

// Candle Categories and Types
const CANDLE_CATEGORIES = [
  'sea', 'rose', 'vanilla', 'space', 'romantic', 'decorative', 'seasonal', 'gel-wax', 'palm-wax', 'soy-wax'
] as const;

const CANDLE_TYPES = [
  // Sea-themed
  'iceberg', 'sea-shell', 'ocean-wave', 'pearl', 'coral',
  // Flower-themed
  'damask-rose', 'sunflower', 'lotus', 'lavender',
  // Special shapes
  'cable', 'lantern', 'crescent-moon', 'fish-tail', 'skull', 'geode', 
  'crystal', 'moon', 'star', 'bride', 'teddy-bear', 'ball',
  // Decorative
  'orb', 'bubbles-small', 'bubbles-large', 'pyramid',
  // Seasonal
  'pumpkin', 'snowflake', 'christmas-tree'
] as const;

const CANDLE_MATERIALS = [
  'soy-wax', 'beeswax', 'paraffin', 'palm-wax', 'gel-wax', 'coconut-wax'
] as const;

const CANDLE_FRAGRANCES = [
  'rose', 'vanilla', 'lavender', 'ocean-breeze', 'sandalwood', 'jasmine', 'unscented'
] as const;

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  basePrice: number;
  discountPrice?: number;
  variants: IProductVariant[];
  category: Types.ObjectId | ICategory;
  candleType: string;
  images: string[];
  mainImage: string;
  stock: number;
  materials: string[];
  fragrance?: string;
  burnTime?: string;
  dimensions?: string;
  weight: number;
  ratings: IRating[];
  averageRating: number;
  ratingCount: number;
  salesCount: number;
  viewCount: number;
  seoTitle?: string;
  seoDescription?: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// =============================================
// SCHEMA DEFINITIONS WITH ENHANCED VALIDATION
// =============================================
const RatingSchema = new Schema<IRating>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required for rating"],
  },
  rating: {
    type: Number,
    required: [true, "Rating value is required"],
    min: [1, "Minimum rating is 1"],
    max: [5, "Maximum rating is 5"],
  },
  review: {
    type: String,
    trim: true,
    maxlength: [1000, "Review cannot exceed 1000 characters"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  verifiedPurchase: {
    type: Boolean,
    default: false,
  },
  helpfulVotes: {
    type: Number,
    default: 0,
    min: 0,
  },
  images: {
    type: [String],
    validate: {
      validator: (images: string[]) => images.length <= 3,
      message: "Cannot upload more than 3 review images",
    },
  },
}, { _id: false });

const ProductVariantSchema = new Schema<IProductVariant>({
  size: {
    type: String,
    required: [true, "Variant size is required"],
    enum: ["65g", "165g", "275g", "300g", "320g", "Custom"],
  },
  price: {
    type: Number,
    required: [true, "Variant price is required"],
    min: [0, "Price cannot be negative"],
  },
  weight: {
    type: Number,
    required: [true, "Variant weight is required"],
    min: [0, "Weight cannot be negative"],
  },
  stock: {
    type: Number,
    required: [true, "Variant stock is required"],
    min: [0, "Stock cannot be negative"],
    default: 0,
  },
  sku: {
    type: String,
    required: [true, "SKU is required"],
    unique: true,
    uppercase: true,
    trim: true,
  },
  images: {
    type: [String],
    validate: {
      validator: (images: string[]) => images.length <= 3,
      message: "Cannot have more than 3 variant images",
    },
  },
}, { _id: false });

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
      index: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, "Slug can only contain letters, numbers and hyphens"]
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      minlength: [50, "Description should be at least 50 characters"],
      maxlength: [2000, "Description cannot exceed 2000 characters"]
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [150, "Short description cannot exceed 150 characters"]
    },
    basePrice: {
      type: Number,
      required: [true, "Product base price is required"],
      min: [0, "Price cannot be negative"],
      index: true
    },
    discountPrice: {
      type: Number,
      min: [0, "Discount price cannot be negative"],
      validate: {
        validator: function(this: IProduct, value: number) {
          return !value || value < this.basePrice;
        },
        message: "Discount price must be less than base price",
      }
    },
    variants: {
      type: [ProductVariantSchema],
      validate: {
        validator: (variants: IProductVariant[]) => variants.length > 0,
        message: "At least one product variant is required",
      }
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
      index: true
    },
    candleType: {
      type: String,
      enum: CANDLE_TYPES,
      required: [true, "Candle type is required"],
      index: true
    },
    images: {
      type: [String],
      required: [true, "At least one product image is required"],
      validate: {
        validator: (images: string[]) => images.length <= 10,
        message: "Cannot upload more than 10 product images",
      }
    },
    mainImage: {
      type: String,
      required: [true, "Main product image is required"]
    },
    materials: {
      type: [String],
      required: [true, "Materials list is required"],
      enum: CANDLE_MATERIALS
    },
    fragrance: {
      type: String,
      trim: true,
      enum: CANDLE_FRAGRANCES
    },
    burnTime: {
      type: String,
      trim: true,
      match: [/^\d+\s?-\s?\d+\s?hours$/, 'Burn time format should be like "40-50 hours"']
    },
    dimensions: {
      type: String,
      trim: true,
      match: [/^\d+(\.\d+)?\s?x\s?\d+(\.\d+)?\s?x\s?\d+(\.\d+)?\s?(cm|in)$/, 
             'Dimensions format should be like "10x10x15 cm"']
    },
    weight: {
      type: Number,
      required: [true, "Product weight is required"],
      min: [0, "Weight cannot be negative"]
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0
    },
    ratings: {
      type: [RatingSchema],
      default: []
    },
    averageRating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot exceed 5"],
      set: (value: number) => parseFloat(value.toFixed(1))
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0
    },
    salesCount: {
      type: Number,
      default: 0,
      min: 0
    },
    viewCount: {
      type: Number,
      default: 0,
      min: 0
    },
    seoTitle: {
      type: String,
      trim: true,
      maxlength: [70, "SEO title cannot exceed 70 characters"]
    },
    seoDescription: {
      type: String,
      trim: true,
      maxlength: [160, "SEO description cannot exceed 160 characters"]
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true
    },
    isBestSeller: {
      type: Boolean,
      default: false,
      index: true
    },
    isNewArrival: {
      type: Boolean,
      default: function(this: IProduct) {
        return Date.now() - new Date(this.createdAt).getTime() < 30 * 24 * 60 * 60 * 1000; // 30 days
      },
      index: true
    }
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
    toObject: {
      virtuals: true,
    },
  }
);

// =============================================
// MIDDLEWARE
// =============================================

// Auto-generate slug from name
productSchema.pre<IProduct>("save", function(next) {
  if (!this.slug || this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Update average rating and count when ratings change
productSchema.pre<IProduct>("save", function(next) {
  if (this.isModified("ratings")) {
    if (this.ratings.length > 0) {
      const sum = this.ratings.reduce((total, { rating }) => total + rating, 0);
      this.averageRating = parseFloat((sum / this.ratings.length).toFixed(1));
      this.ratingCount = this.ratings.length;
    } else {
      this.averageRating = 0;
      this.ratingCount = 0;
    }
  }
  next();
});

// Calculate total stock from variants
productSchema.pre<IProduct>("save", function(next) {
  if (this.isModified("variants")) {
    this.stock = this.variants.reduce((sum, variant) => sum + variant.stock, 0);
  }
  next();
});

// =============================================
// VIRTUAL FIELDS
// =============================================

// Discount percentage
productSchema.virtual("discountPercentage").get(function(this: IProduct) {
  if (!this.discountPrice) return 0;
  return Math.round(((this.basePrice - this.discountPrice) / this.basePrice) * 100);
});

// Is in stock
productSchema.virtual("inStock").get(function(this: IProduct) {
  return this.stock > 0;
});

// Current price (discount or base)
productSchema.virtual("currentPrice").get(function(this: IProduct) {
  return this.discountPrice || this.basePrice;
});

// =============================================
// INDEXES FOR PERFORMANCE OPTIMIZATION
// =============================================
productSchema.index({ name: "text", description: "text", shortDescription: "text" });
productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ category: 1, candleType: 1 });
productSchema.index({ basePrice: 1, discountPrice: 1 });
productSchema.index({ averageRating: -1 });
productSchema.index({ isFeatured: 1, createdAt: -1 });
productSchema.index({ isBestSeller: 1, salesCount: -1 });
productSchema.index({ isNewArrival: 1, createdAt: -1 });
productSchema.index({ "variants.sku": 1 }, { unique: true, sparse: true });

// =============================================
// CUSTOM METHODS
// =============================================

// Add rating to product
productSchema.methods.addRating = function(
  userId: Types.ObjectId,
  rating: number,
  review?: string,
  images?: string[]
): Promise<IProduct> {
  const existingRatingIndex = this.ratings.findIndex((r: IRating) => 
    (r.userId as Types.ObjectId).equals(userId)
  );
  
  if (existingRatingIndex >= 0) {
    this.ratings[existingRatingIndex] = {
      userId,
      rating,
      review: review || this.ratings[existingRatingIndex].review,
      date: new Date(),
      verifiedPurchase: this.ratings[existingRatingIndex].verifiedPurchase,
      helpfulVotes: this.ratings[existingRatingIndex].helpfulVotes,
      images: images || this.ratings[existingRatingIndex].images,
    };
  } else {
    this.ratings.push({
      userId,
      rating,
      review,
      date: new Date(),
      verifiedPurchase: false,
      helpfulVotes: 0,
      images,
    });
  }
  
  return this.save();
};

// Mark rating as verified purchase
productSchema.methods.markRatingVerified = function(userId: Types.ObjectId): Promise<IProduct> {
  const rating = this.ratings.find((r: IRating) => 
    (r.userId as Types.ObjectId).equals(userId)
  );
  if (rating) {
    rating.verifiedPurchase = true;
    return this.save();
  }
  throw new Error("Rating not found");
};

// Increment view count
productSchema.methods.incrementViewCount = function(): Promise<IProduct> {
  this.viewCount += 1;
  return this.save();
};

// Update stock after purchase
productSchema.methods.updateStock = function(
  variantId: Types.ObjectId, 
  quantity: number
): Promise<IProduct> {
  const variant = this.variants.find((v: IProductVariant & { _id: Types.ObjectId }) => 
    v._id.equals(variantId)
  );
  if (!variant) throw new Error("Variant not found");
  
  if (variant.stock < quantity) {
    throw new Error("Insufficient stock");
  }
  
  variant.stock -= quantity;
  this.salesCount += quantity;
  return this.save();
};

// =============================================
// STATIC METHODS
// =============================================

interface IProductModel extends Model<IProduct> {
  getFeaturedProducts(limit?: number): Promise<IProduct[]>;
  getBestSellers(limit?: number): Promise<IProduct[]>;
  getNewArrivals(limit?: number): Promise<IProduct[]>;
  searchProducts(query: string, page?: number, limit?: number): Promise<IProduct[]>;
  getProductsByCategory(
    categoryId: Types.ObjectId,
    filters?: any,
    page?: number,
    limit?: number
  ): Promise<IProduct[]>;
  getSortOption(sort?: string): Record<string, 1 | -1>;
}

// Get featured products
productSchema.statics.getFeaturedProducts = function(limit = 8): Promise<IProduct[]> {
  return this.find({ isFeatured: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select("name slug basePrice discountPrice mainImage averageRating ratingCount candleType")
    .exec();
};

// Get best sellers
productSchema.statics.getBestSellers = function(limit = 8): Promise<IProduct[]> {
  return this.find({ isBestSeller: true })
    .sort({ salesCount: -1 })
    .limit(limit)
    .select("name slug basePrice discountPrice mainImage averageRating ratingCount candleType")
    .exec();
};

// Get new arrivals
productSchema.statics.getNewArrivals = function(limit = 8): Promise<IProduct[]> {
  return this.find({ isNewArrival: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select("name slug basePrice discountPrice mainImage averageRating ratingCount candleType")
    .exec();
};

// Search products with pagination
productSchema.statics.searchProducts = function(
  query: string, 
  page = 1, 
  limit = 12
): Promise<IProduct[]> {
  return this.find({ $text: { $search: query } })
    .sort({ score: { $meta: "textScore" } })
    .skip((page - 1) * limit)
    .limit(limit)
    .select("name slug basePrice discountPrice mainImage averageRating ratingCount candleType")
    .exec();
};

// Get products by category with filters
productSchema.statics.getProductsByCategory = function(
  categoryId: Types.ObjectId,
  filters: any = {},
  page = 1,
  limit = 12
): Promise<IProduct[]> {
  const query: any = { category: categoryId };
  
  if (filters.candleType) query.candleType = filters.candleType;
  if (filters.minPrice) query.basePrice = { $gte: filters.minPrice };
  if (filters.maxPrice) query.basePrice = { ...query.basePrice, $lte: filters.maxPrice };
  if (filters.materials) query.materials = { $in: filters.materials };
  if (filters.fragrance) query.fragrance = filters.fragrance;
  
  return this.find(query)
    .sort(this.getSortOption(filters.sort))
    .skip((page - 1) * limit)
    .limit(limit)
    .select("name slug basePrice discountPrice mainImage averageRating ratingCount candleType")
    .exec();
};

// Helper for sort options
productSchema.statics.getSortOption = function(sort?: string): Record<string, 1 | -1> {
  switch (sort) {
    case "price-asc": return { basePrice: 1 };
    case "price-desc": return { basePrice: -1 };
    case "rating": return { averageRating: -1 };
    case "newest": return { createdAt: -1 };
    case "bestselling": return { salesCount: -1 };
    default: return { createdAt: -1 };
  }
};

// =============================================
// MODEL EXPORT WITH STRONG TYPING
// =============================================
export const Product: IProductModel = mongoose.model<IProduct, IProductModel>(
  "Product",
  productSchema
);

export default Product;