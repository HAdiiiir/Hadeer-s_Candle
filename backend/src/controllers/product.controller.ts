import type { Request, Response } from "express"
import Product from "../models/product.model"
import Category from "../models/category.model"
import mongoose from "mongoose"

// Get all products with filtering, sorting, and pagination
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    // Build filter object
    const filter: any = {}

    // Filter by category
    if (req.query.category) {
      filter.category = req.query.category
    }

    // Filter by type
    if (req.query.type) {
      filter.type = req.query.type
    }

    // Filter by size
    if (req.query.size) {
      filter.size = req.query.size
    }

    // Filter by price range
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {}
      if (req.query.minPrice) {
        filter.price.$gte = Number.parseInt(req.query.minPrice as string)
      }
      if (req.query.maxPrice) {
        filter.price.$lte = Number.parseInt(req.query.maxPrice as string)
      }
    }

    // Filter shaped candles
    if (req.query.isShapedCandle) {
      filter.isShapedCandle = req.query.isShapedCandle === "true"
    }

    // Filter by shape
    if (req.query.shape) {
      filter.shape = req.query.shape
    }

    // Filter featured products
    if (req.query.featured) {
      filter.featured = req.query.featured === "true"
    }

    // Search by name or description
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search as string, "i")
      filter.$or = [{ name: searchRegex }, { description: searchRegex }]
    }

    // Build sort object
    let sort: any = {}
    if (req.query.sort) {
      const sortField = req.query.sort as string
      const sortOrder = req.query.order === "desc" ? -1 : 1
      sort[sortField] = sortOrder
    } else {
      // Default sort by createdAt desc
      sort = { createdAt: -1 }
    }

    // Execute query with pagination
    const products = await Product.find(filter).populate("category", "name slug").sort(sort).skip(skip).limit(limit)

    // Get total count for pagination
    const total = await Product.countDocuments(filter)

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      products,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    })
  }
}

// Get a single product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name slug").populate({
      path: "ratings.userId",
      select: "name",
    })

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    // Get related products
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    })
      .limit(4)
      .select("name price images type size")

    res.status(200).json({
      success: true,
      product,
      relatedProducts,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    })
  }
}

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    // Check if category exists
    const categoryExists = await Category.findById(req.body.category)
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
      })
    }

    const product = await Product.create(req.body)

    res.status(201).json({
      success: true,
      product,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    })
  }
}

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    // Check if category exists if it's being updated
    if (req.body.category) {
      const categoryExists = await Category.findById(req.body.category)
      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid category",
        })
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    res.status(200).json({
      success: true,
      product,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    })
  }
}

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    })
  }
}

// Add a product rating
export const addProductRating = async (req: Request, res: Response) => {
  try {
    const { rating, review } = req.body
    const userId = (req as any).user.id // From auth middleware

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      })
    }

    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    // Check if user already rated this product
    const existingRatingIndex = product.ratings.findIndex((r) => r.userId.toString() === userId)

    if (existingRatingIndex !== -1) {
      // Update existing rating
      product.ratings[existingRatingIndex].rating = rating
      product.ratings[existingRatingIndex].review = review
      product.ratings[existingRatingIndex].date = new Date()
    } else {
      // Add new rating
      product.ratings.push({
        userId: new mongoose.Types.ObjectId(userId),
        rating,
        review,
        date: new Date(),
      })
    }

    // Calculate average rating
    product.averageRating = product.ratings.reduce((sum, item) => sum + item.rating, 0) / product.ratings.length

    await product.save()

    res.status(200).json({
      success: true,
      message: "Rating added successfully",
      averageRating: product.averageRating,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error adding rating",
      error: error.message,
    })
  }
}

// Get featured products
export const getFeaturedProducts = async (req: Request, res: Response) => {
  try {
    const limit = Number.parseInt(req.query.limit as string) || 4

    const featuredProducts = await Product.find({ featured: true }).populate("category", "name slug").limit(limit)

    res.status(200).json({
      success: true,
      count: featuredProducts.length,
      products: featuredProducts,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching featured products",
      error: error.message,
    })
  }
}

