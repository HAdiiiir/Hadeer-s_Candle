import mongoose, { type Document, Schema, Model } from "mongoose";

// =============================================
// INTERFACE DEFINITIONS
// =============================================
export interface IRating {
  userId: mongoose.Types.ObjectId;
  rating: number;
  review?: string;
  date: Date;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  size?: string;
  weight: number;
  type: string;
  category: mongoose.Types.ObjectId;
  images: string[];
  stock: number;
  isShapedCandle: boolean;
  shape?: string;
  featured: boolean;
  ratings: IRating[];
  averageRating: number;
  createdAt: Date;
  updatedAt: Date;
}

// =============================================
// SCHEMA DEFINITION
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
    maxlength: [500, "Review cannot exceed 500 characters"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      minlength: [20, "Description should be at least 20 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
      get: (price: number) => parseFloat(price.toFixed(2)),
    },
    size: {
      type: String,
      enum: ["65g", "165g", "275g", "300g", "320g", null],
      default: null,
    },
    weight: {
      type: Number,
      required: [true, "Product weight is required"],
      min: [0, "Weight cannot be negative"],
    },
    type: {
      type: String,
      required: [true, "Product type is required"],
      enum: ["Gel Wax", "Palm Wax", "Soy Wax", "Shaped Candle"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
      index: true,
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (images: string[]) => images.length <= 10,
        message: "Cannot have more than 10 product images",
      },
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    isShapedCandle: {
      type: Boolean,
      default: false,
    },
    shape: {
      type: String,
      enum: ["Bride", "Teddy Bear", "Ball", "Cable", "Crescent", "Lantern", "Skull", null],
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    ratings: {
      type: [RatingSchema],
      default: [],
    },
    averageRating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot exceed 5"],
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
      getters: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      getters: true,
    },
  }
);

// =============================================
// MIDDLEWARE
// =============================================
productSchema.pre("save", function (next) {
  if (this.isModified("ratings") && this.ratings.length > 0) {
    const sum = this.ratings.reduce((total, { rating }) => total + rating, 0);
    this.averageRating = parseFloat((sum / this.ratings.length).toFixed(2));
  }
  next();
});

// =============================================
// VIRTUALS & INDEXES
// =============================================
productSchema.virtual("relatedProducts", {
  ref: "Product",
  localField: "category",
  foreignField: "category",
  justOne: false,
  options: {
    limit: 4,
    sort: { averageRating: -1, createdAt: -1 },
    match: { _id: { $ne: this._id } },
  },
});

productSchema.index({ name: "text", description: "text" }); // For text search
productSchema.index({ price: 1 }); // For price sorting
productSchema.index({ averageRating: -1 }); // For top-rated products
productSchema.index({ featured: 1, createdAt: -1 }); // For featured products

// =============================================
// MODEL EXPORT
// =============================================
const Product: Model<IProduct> = mongoose.model<IProduct>("Product", productSchema);

export default Product;