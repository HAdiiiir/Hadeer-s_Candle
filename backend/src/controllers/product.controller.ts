import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/product.model";
import Category from "../models/category.model";

// Constants
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const FEATURED_PRODUCTS_LIMIT = 8;
const RELATED_PRODUCTS_LIMIT = 4;

// Candle Types
const CANDLE_TYPES = [
  // Sea-themed
  'iceberg', 'sea-shell', 'ocean-wave', 'pearl', 'coral', 'fish-tail',
  // Flower-themed
  'damask-rose', 'sunflower', 'lotus', 'lavender',
  // Special shapes
  'cable', 'lantern', 'crescent-moon', 'bride', 'teddy-bear', 'orb',
  'skull', 'geode', 'crystal', 'moon', 'star', 'heart',
  // Decorative
  'bubbles-small', 'bubbles-large', 'pyramid',
  // Seasonal
  'pumpkin', 'snowflake', 'christmas-tree'
] as const;

// Helper Interfaces
interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
}

interface FilterOptions {
  category?: string | Types.ObjectId;
  candleType?: typeof CANDLE_TYPES[number];
  price?: {
    $gte?: number;
    $lte?: number;
  };
  materials?: string[];
  fragrance?: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  $or?: Array<{ [key: string]: any }>;
  $text?: { $search: string };
}

// =============================================
// PRODUCT CRUD OPERATIONS
// =============================================

/**
 * Create a new product
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, candleType, images } = req.body;

    // Validate category exists
    await validateCategory(category);

    // Validate candle type
    if (!CANDLE_TYPES.includes(candleType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid candle type"
      });
    }

    const productData = {
      name,
      description,
      price,
      category,
      candleType,
      images,
      materials: req.body.materials || ['soy-wax'],
      fragrance: req.body.fragrance || 'unscented',
      ...req.body
    };

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error: any) {
    handleServerError(res, "Error creating product", error);
  }
};

/**
 * Get all products with advanced filtering
 */
export const getProducts = async (req: Request, res: Response) => {
  try {
    // Pagination setup
    const { page, limit, skip } = getPaginationOptions(req);

    // Build filter and sort
    const filter = buildProductFilter(req.query);
    const sort = buildProductSort(req.query);

    // Execute query
    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("category", "name slug")
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter)
    ]);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: products
    });
  } catch (error: any) {
    handleServerError(res, "Error fetching products", error);
  }
};

/**
 * Get product by ID with related products
 */
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name slug")
      .populate({
        path: "ratings.userId",
        select: "name"
      });

    if (!product) {
      return handleNotFound(res, "Product");
    }

    // Get related products (same category)
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    })
      .limit(RELATED_PRODUCTS_LIMIT)
      .select("name price images candleType");

    res.status(200).json({
      success: true,
      data: {
        product,
        relatedProducts
      }
    });
  } catch (error: any) {
    handleServerError(res, "Error fetching product", error);
  }
};

/**
 * Update product
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    if (req.body.category) {
      await validateCategory(req.body.category);
    }

    if (req.body.candleType && !CANDLE_TYPES.includes(req.body.candleType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid candle type"
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return handleNotFound(res, "Product");
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error: any) {
    handleBadRequest(res, "Error updating product", error);
  }
};

/**
 * Delete product
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return handleNotFound(res, "Product");
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error: any) {
    handleServerError(res, "Error deleting product", error);
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
    const limit = Number(req.query.limit) || FEATURED_PRODUCTS_LIMIT;

    const products = await Product.find({ isFeatured: true })
      .populate("category", "name slug")
      .limit(limit);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error: any) {
    handleServerError(res, "Error fetching featured products", error);
  }
};

/**
 * Get products by candle type
 */
export const getProductsByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    
    if (!CANDLE_TYPES.includes(type as any)) {
      return handleNotFound(res, "Candle type");
    }

    const products = await Product.find({ candleType: type })
      .populate("category", "name slug");

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error: any) {
    handleServerError(res, "Error fetching products by type", error);
  }
};

// =============================================
// PRODUCT RATINGS
// =============================================

/**
 * Add product rating
 */
export const addProductRating = async (req: Request, res: Response) => {
  try {
    const { rating, review } = req.body;
    const userId = (req as any).user.id;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return handleNotFound(res, "Product");
    }

    // Check if user already rated
    const existingRatingIndex = product.ratings.findIndex(
      r => r.userId.toString() === userId
    );

    if (existingRatingIndex >= 0) {
      // Update existing rating
      product.ratings[existingRatingIndex] = {
        userId: new mongoose.Types.ObjectId(userId),
        rating,
        review,
        date: new Date(),
        verifiedPurchase: product.ratings[existingRatingIndex].verifiedPurchase
      };
    } else {
      // Add new rating
      product.ratings.push({
        userId: new mongoose.Types.ObjectId(userId),
        rating,
        review,
        date: new Date(),
        verifiedPurchase: false
      });
    }

    // Recalculate average
    const sum = product.ratings.reduce((total, { rating }) => total + rating, 0);
    product.averageRating = parseFloat((sum / product.ratings.length).toFixed(1));
    product.ratingCount = product.ratings.length;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Rating added successfully",
      averageRating: product.averageRating
    });
  } catch (error: any) {
    handleServerError(res, "Error adding rating", error);
  }
};

// =============================================
// HELPER FUNCTIONS
// =============================================

function getPaginationOptions(req: Request): PaginationOptions {
  const page = Number(req.query.page) || DEFAULT_PAGE;
  const limit = Number(req.query.limit) || DEFAULT_LIMIT;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

function buildProductFilter(query: any): FilterOptions {
  const filter: FilterOptions = {};

  // Basic filters
  if (query.category) filter.category = query.category;
  if (query.candleType) filter.candleType = query.candleType;
  if (query.materials) filter.materials = Array.isArray(query.materials) 
    ? query.materials 
    : [query.materials];
  if (query.fragrance) filter.fragrance = query.fragrance;
  if (query.isFeatured) filter.isFeatured = query.isFeatured === "true";
  if (query.isBestSeller) filter.isBestSeller = query.isBestSeller === "true";
  if (query.isNewArrival) filter.isNewArrival = query.isNewArrival === "true";

  // Price range
  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  // Search
  if (query.search) {
    filter.$text = { $search: query.search };
  }

  return filter;
}

function buildProductSort(query: any): Record<string, 1 | -1> {
  if (query.sort) {
    const sortOptions: Record<string, 1 | -1> = {
      "price-asc": { basePrice: 1 },
      "price-desc": { basePrice: -1 },
      "rating": { averageRating: -1 },
      "newest": { createdAt: -1 },
      "bestselling": { salesCount: -1 }
    };
    return sortOptions[query.sort as string] || { createdAt: -1 };
  }
  return { createdAt: -1 };
}

async function validateCategory(categoryId: string) {
  const categoryExists = await Category.findById(categoryId);
  if (!categoryExists) {
    throw new Error("Invalid category");
  }
}

// =============================================
// ERROR HANDLERS
// =============================================

function handleNotFound(res: Response, entity: string) {
  return res.status(404).json({
    success: false,
    message: `${entity} not found`
  });
}

function handleBadRequest(res: Response, message: string, error: any) {
  return res.status(400).json({
    success: false,
    message,
    error: error.message
  });
}

function handleServerError(res: Response, message: string, error: any) {
  return res.status(500).json({
    success: false,
    message,
    error: error.message
  });
}