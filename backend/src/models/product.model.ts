import mongoose, { type Document, Schema } from "mongoose"

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  size?: string
  weight: number
  type: string
  category: mongoose.Types.ObjectId
  images: string[]
  stock: number
  isShapedCandle: boolean
  shape?: string
  featured: boolean
  ratings: {
    userId: mongoose.Types.ObjectId
    rating: number
    review?: string
    date: Date
  }[]
  averageRating: number
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
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    size: {
      type: String,
      enum: ["65g", "165g", "275g", "300g", "320g", null],
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
    },
    images: {
      type: [String],
      default: [],
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
    },
    featured: {
      type: Boolean,
      default: false,
    },
    ratings: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        review: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Calculate average rating before saving
productSchema.pre("save", function (next) {
  if (this.ratings.length > 0) {
    this.averageRating = this.ratings.reduce((sum, item) => sum + item.rating, 0) / this.ratings.length
  }
  next()
})

// Virtual for related products
productSchema.virtual("relatedProducts", {
  ref: "Product",
  localField: "category",
  foreignField: "category",
  justOne: false,
  options: { limit: 4 },
})

export default mongoose.model<IProduct>("Product", productSchema)

