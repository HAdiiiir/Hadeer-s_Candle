import type { Request, Response } from "express"
import { Product } from "../models/Product"
import { ProductTag } from "../models/ProductTag"
import { Tag } from "../models/Tag"
import { Category } from "../models/Category"
import mongoose from "mongoose"
import { ApiError } from "../utils/ApiError"

// Get all products with filtering, sorting, and pagination
export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    // Build filter object
    const filter: any = {}

    // Category filter
    if (req.query.category) {
      const category = await Category.findOne({ name: req.query.category })
      if (category) {
        filter.category = category._id
      }
    }

    // Wax type filter
    if (req.query.waxType) {
      filter.waxType = req.query.waxType
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {}
      if (req.query.minPrice) {
        filter.price.$gte = Number.parseFloat(req.query.minPrice as string)
      }
      if (req.query.maxPrice) {
        filter.price.$lte = Number.parseFloat(req.query.maxPrice as string)
      }
    }

    // Featured filter
    if (req.query.featured === "true") {
      filter.featured = true
    }

    // Search by name or description
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search as string, "i")
      filter.$or = [{ name: searchRegex }, { description: searchRegex }]
    }

    // Build sort object
    let sort: any = {}
    if (req.query.sortBy) {
      const sortField = req.query.sortBy as string
      const sortOrder = req.query.sortOrder === "desc" ? -1 : 1
      sort[sortField] = sortOrder
    } else {
      // Default sort by createdAt desc
      sort = { createdAt: -1 }
    }

    // Execute query with pagination
    const products = await Product.find(filter).populate("category", "name").sort(sort).skip(skip).limit(limit)

    // Get total count for pagination
    const total = await Product.countDocuments(filter)

    // Get tags for each product
    const productsWithTags = await Promise.all(
      products.map(async (product) => {
        const productTags = await ProductTag.find({ product: product._id }).populate("tag", "name")
        const tags = productTags.map((pt) => pt.tag)

        return {
          ...product.toObject(),
          tags,
        }
      }),
    )

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      products: productsWithTags,
    })
  } catch (error) {
    console.error("Error getting products:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get products",
      error: (error as Error).message,
    })
  }
}

// Get a single product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "firstName lastName",
        },
      })

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    // Get tags for the product
    const productTags = await ProductTag.find({ product: product._id }).populate("tag", "name")
    const tags = productTags.map((pt) => pt.tag)

    // Get related products (same category)
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    })
      .limit(4)
      .select("name price image")

    res.status(200).json({
      success: true,
      product: {
        ...product.toObject(),
        tags,
      },
      relatedProducts,
    })
  } catch (error) {
    console.error("Error getting product:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get product",
      error: (error as Error).message,
    })
  }
}

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const { name, description, category, waxType, weight, shape, price, image, featured, tags } = req.body

    // Check if category exists
    const categoryDoc = await Category.findById(category)
    if (!categoryDoc) {
      throw new ApiError(400, "Category not found")
    }

    // Create the product
    const product = await Product.create(
      [
        {
          name,
          description,
          category,
          waxType,
          weight,
          shape,
          price,
          image,
          featured: featured || false,
        },
      ],
      { session },
    )

    // Add tags if provided
    if (tags && Array.isArray(tags) && tags.length > 0) {
      const tagDocs = []

      for (const tagName of tags) {
        // Find or create tag
        let tag = await Tag.findOne({ name: tagName })
        if (!tag) {
          tag = await Tag.create([{ name: tagName }], { session })
          tag = tag[0]
        }

        tagDocs.push(tag)
      }

      // Create product-tag relationships
      const productTagPromises = tagDocs.map((tag) =>
        ProductTag.create(
          [
            {
              product: product[0]._id,
              tag: tag._id,
            },
          ],
          { session },
        ),
      )

      await Promise.all(productTagPromises)
    }

    await session.commitTransaction()

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: product[0],
    })
  } catch (error) {
    await session.abortTransaction()
    console.error("Error creating product:", error)

    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      })
    }

    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: (error as Error).message,
    })
  } finally {
    session.endSession()
  }
}

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const { name, description, category, waxType, weight, shape, price, image, featured, tags } = req.body

    // Check if product exists
    const product = await Product.findById(req.params.id)
    if (!product) {
      throw new ApiError(404, "Product not found")
    }

    // Check if category exists if provided
    if (category) {
      const categoryDoc = await Category.findById(category)
      if (!categoryDoc) {
        throw new ApiError(400, "Category not found")
      }
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        category,
        waxType,
        weight,
        shape,
        price,
        image,
        featured,
      },
      { new: true, runValidators: true, session },
    )

    // Update tags if provided
    if (tags && Array.isArray(tags)) {
      // Remove existing product-tag relationships
      await ProductTag.deleteMany({ product: product._id }, { session })

      if (tags.length > 0) {
        const tagDocs = []

        for (const tagName of tags) {
          // Find or create tag
          let tag = await Tag.findOne({ name: tagName })
          if (!tag) {
            tag = await Tag.create([{ name: tagName }], { session })
            tag = tag[0]
          }

          tagDocs.push(tag)
        }

        // Create new product-tag relationships
        const productTagPromises = tagDocs.map((tag) =>
          ProductTag.create(
            [
              {
                product: product._id,
                tag: tag._id,
              },
            ],
            { session },
          ),
        )

        await Promise.all(productTagPromises)
      }
    }

    await session.commitTransaction()

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    })
  } catch (error) {
    await session.abortTransaction()
    console.error("Error updating product:", error)

    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      })
    }

    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: (error as Error).message,
    })
  } finally {
    session.endSession()
  }
}

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // Check if product exists
    const product = await Product.findById(req.params.id)
    if (!product) {
      throw new ApiError(404, "Product not found")
    }

    // Delete product-tag relationships
    await ProductTag.deleteMany({ product: product._id }, { session })

    // Delete the product
    await Product.findByIdAndDelete(req.params.id, { session })

    await session.commitTransaction()

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    await session.abortTransaction()
    console.error("Error deleting product:", error)

    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      })
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: (error as Error).message,
    })
  } finally {
    session.endSession()
  }
}

