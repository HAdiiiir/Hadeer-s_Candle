import type { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/product.model";
import Category from "../models/category.model";

// Constants
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const FEATURED_PRODUCTS_LIMIT = 4;
const RELATED_PRODUCTS_LIMIT = 4;

// Helper Interfaces
interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
}

interface FilterOptions {
  category?: string;
  type?: string;
  size?: string;
  price?: {
    $gte?: number;
    $lte?: number;
  };
  isShapedCandle?: boolean;
  shape?: string;
  featured?: boolean;
  $or?: Array<{ [key: string]: any }>;
}

// =============================================
// PRODUCT CRUD OPERATIONS
// =============================================

/**
 * Get all products with filtering, sorting, and pagination
 */
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Pagination setup
    const { page, limit, skip } = getPaginationOptions(req);

    // Build filter and sort objects
    const filter = buildProductFilter(req.query);
    const sort = buildProductSort(req.query);

    // Execute query
    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("category", "name slug")
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      products,
    });
  } catch (error: any) {
    handleServerError(res, "Error fetching products", error);
  }
};

/**
 * Get a single product by ID with related products
 */
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name slug")
      .populate({
        path: "ratings.userId",
        select: "name",
      });

    if (!product) {
      return handleNotFound(res, "Product");
    }

    const relatedProducts = await getRelatedProducts(product);

    res.status(200).json({
      success: true,
      product,
      relatedProducts,
    });
  } catch (error: any) {
    handleServerError(res, "Error fetching product", error);
  }
};

/**
 * Create a new product
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    await validateCategory(req.body.category);

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error: any) {
    handleBadRequest(res, "Error creating product", error);
  }
};

/**
 * Update an existing product
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    if (req.body.category) {
      await validateCategory(req.body.category);
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return handleNotFound(res, "Product");
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error: any) {
    handleBadRequest(res, "Error updating product", error);
  }
};

/**
 * Delete a product
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return handleNotFound(res, "Product");
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    handleServerError(res, "Error deleting product", error);
  }
};

// =============================================
// PRODUCT RATINGS
// =============================================

/**
 * Add or update a product rating
 */
export const addProductRating = async (req: Request, res: Response) => {
  try {
    const { rating, review } = req.body;
    const userId = (req as any).user.id;

    validateRating(rating);

    const product = await Product.findById(req.params.id);
    if (!product) {
      return handleNotFound(res, "Product");
    }

    updateProductRating(product, userId, rating, review);
    await product.save();

    res.status(200).json({
      success: true,
      message: "Rating added successfully",
      averageRating: product.averageRating,
    });
  } catch (error: any) {
    handleServerError(res, "Error adding rating", error);
  }
};

// =============================================
// SPECIAL PRODUCT QUERIES
// =============================================

/**
 * Get featured products
 */
export const getFeaturedProducts = async (req: Request, res: Response) => {
  try {
    const limit = Number.parseInt(req.query.limit as string) || FEATURED_PRODUCTS_LIMIT;

    const featuredProducts = await Product.find({ featured: true })
      .populate("category", "name slug")
      .limit(limit);

    res.status(200).json({
      success: true,
      count: featuredProducts.length,
      products: featuredProducts,
    });
  } catch (error: any) {
    handleServerError(res, "Error fetching featured products", error);
  }
};

// =============================================
// HELPER FUNCTIONS
// =============================================

function getPaginationOptions(req: Request): PaginationOptions {
  const page = Number.parseInt(req.query.page as string) || DEFAULT_PAGE;
  const limit = Number.parseInt(req.query.limit as string) || DEFAULT_LIMIT;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

function buildProductFilter(query: any): FilterOptions {
  const filter: FilterOptions = {};

  // Basic filters
  if (query.category) filter.category = query.category as string;
  if (query.type) filter.type = query.type as string;
  if (query.size) filter.size = query.size as string;
  if (query.isShapedCandle) filter.isShapedCandle = query.isShapedCandle === "true";
  if (query.shape) filter.shape = query.shape as string;
  if (query.featured) filter.featured = query.featured === "true";

  // Price range filter
  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number.parseInt(query.minPrice as string);
    if (query.maxPrice) filter.price.$lte = Number.parseInt(query.maxPrice as string);
  }

  // Search filter
  if (query.search) {
    const searchRegex = new RegExp(query.search as string, "i");
    filter.$or = [{ name: searchRegex }, { description: searchRegex }];
  }

  return filter;
}

function buildProductSort(query: any): { [key: string]: 1 | -1 } {
  if (query.sort) {
    const sortField = query.sort as string;
    const sortOrder = query.order === "desc" ? -1 : 1;
    return { [sortField]: sortOrder };
  }
  return { createdAt: -1 }; // Default sort
}

async function getRelatedProducts(product: any) {
  return Product.find({
    category: product.category,
    _id: { $ne: product._id },
  })
    .limit(RELATED_PRODUCTS_LIMIT)
    .select("name price images type size");
}

async function validateCategory(categoryId: string) {
  const categoryExists = await Category.findById(categoryId);
  if (!categoryExists) {
    throw new Error("Invalid category");
  }
}

function validateRating(rating: number) {
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
}

function updateProductRating(product: any, userId: string, rating: number, review?: string) {
  const existingRatingIndex = product.ratings.findIndex(
    (r: any) => r.userId.toString() === userId
  );

  if (existingRatingIndex !== -1) {
    // Update existing rating
    product.ratings[existingRatingIndex] = {
      userId: new mongoose.Types.ObjectId(userId),
      rating,
      review,
      date: new Date(),
    };
  } else {
    // Add new rating
    product.ratings.push({
      userId: new mongoose.Types.ObjectId(userId),
      rating,
      review,
      date: new Date(),
    });
  }

  // Recalculate average
  product.averageRating =
    product.ratings.reduce((sum: number, item: any) => sum + item.rating, 0) /
    product.ratings.length;
}

// =============================================
// ERROR HANDLERS
// =============================================

function handleNotFound(res: Response, entity: string) {
  return res.status(404).json({
    success: false,
    message: `${entity} not found`,
  });
}

function handleBadRequest(res: Response, message: string, error: any) {
  return res.status(400).json({
    success: false,
    message,
    error: error.message,
  });
}

function handleServerError(res: Response, message: string, error: any) {
  return res.status(500).json({
    success: false,
    message,
    error: error.message,
  });
}