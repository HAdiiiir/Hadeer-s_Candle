import type { Request, Response } from "express";
import Order from "../models/order.model";
import Product from "../models/product.model";
import Cart from "../models/cart.model";

// =============================================
// CONSTANTS & INTERFACES
// =============================================
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

interface OrderItem {
  product: string;
  quantity: number;
  price?: number;
  name?: string;
}

// =============================================
// ORDER CREATION
// =============================================

/**
 * Create a new order from cart items
 */
export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { items, shippingAddress, paymentMethod, notes } = req.body;

    // Validate order items
    if (!items?.length) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
        code: "EMPTY_ORDER",
      });
    }

    // Process order items and calculate total
    const { orderItems, totalAmount } = await processOrderItems(items);

    // Create order
    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      notes,
      paymentStatus: "pending",
      orderStatus: "pending",
    });

    // Clear user's cart
    await clearUserCart(userId);

    res.status(201).json({
      success: true,
      order,
    });

  } catch (error: any) {
    handleOrderError(res, "Error creating order", error);
  }
};

// =============================================
// ORDER RETRIEVAL
// =============================================

/**
 * Get all orders for authenticated user
 */
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "items.product",
        select: "name images",
      });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error: any) {
    handleServerError(res, "Error fetching user orders", error);
  }
};

/**
 * Get order details by ID
 */
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    const order = await Order.findById(req.params.id)
      .populate({
        path: "items.product",
        select: "name images price",
      })
      .populate({
        path: "user",
        select: "name email",
      });

    if (!order) {
      return handleNotFound(res, "Order");
    }

    // Authorization check
    if (!isAuthorizedToView(order, userId, userRole)) {
      return handleUnauthorized(res);
    }

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error: any) {
    handleServerError(res, "Error fetching order", error);
  }
};

/**
 * Get all orders (Admin only)
 */
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = getPaginationOptions(req);
    const filter = buildOrderFilter(req.query);

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate({ path: "user", select: "name email" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      orders,
    });

  } catch (error: any) {
    handleServerError(res, "Error fetching orders", error);
  }
};

// =============================================
// ORDER MANAGEMENT
// =============================================

/**
 * Update order status (Admin only)
 */
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderStatus, paymentStatus, trackingNumber } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return handleNotFound(res, "Order");
    }

    // Update order fields
    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (trackingNumber) order.trackingNumber = trackingNumber;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order,
    });

  } catch (error: any) {
    handleServerError(res, "Error updating order", error);
  }
};

/**
 * Cancel an order
 */
export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return handleNotFound(res, "Order");
    }

    // Authorization check
    if (!isAuthorizedToCancel(order, userId, userRole)) {
      return handleUnauthorized(res);
    }

    // Validate order can be cancelled
    if (!canCancelOrder(order)) {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel an order that has been shipped or delivered",
        code: "ORDER_CANCEL_RESTRICTED",
      });
    }

    // Process cancellation
    await processOrderCancellation(order);

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
    });

  } catch (error: any) {
    handleServerError(res, "Error cancelling order", error);
  }
};

// =============================================
// HELPER FUNCTIONS
// =============================================

async function processOrderItems(items: OrderItem[]) {
  let totalAmount = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await validateProductForOrder(item);
    
    orderItems.push({
      product: item.product,
      quantity: item.quantity,
      price: product.price,
      name: product.name,
    });

    totalAmount += product.price * item.quantity;
    await updateProductStock(product, item.quantity);
  }

  return { orderItems, totalAmount };
}

async function validateProductForOrder(item: OrderItem) {
  const product = await Product.findById(item.product);
  if (!product) {
    throw new Error(`Product with ID ${item.product} not found`);
  }
  if (product.stock < item.quantity) {
    throw new Error(`Insufficient stock for ${product.name}`);
  }
  return product;
}

async function updateProductStock(product: any, quantity: number) {
  product.stock -= quantity;
  await product.save();
}

async function clearUserCart(userId: string) {
  await Cart.findOneAndUpdate(
    { user: userId },
    { $set: { items: [] } }
  );
}

function getPaginationOptions(req: Request) {
  const page = Number.parseInt(req.query.page as string) || DEFAULT_PAGE;
  const limit = Number.parseInt(req.query.limit as string) || DEFAULT_LIMIT;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

function buildOrderFilter(query: any) {
  const filter: any = {};

  if (query.orderStatus) filter.orderStatus = query.orderStatus;
  if (query.paymentStatus) filter.paymentStatus = query.paymentStatus;

  return filter;
}

function isAuthorizedToView(order: any, userId: string, userRole: string) {
  return userRole === "admin" || order.user._id.toString() === userId;
}

function isAuthorizedToCancel(order: any, userId: string, userRole: string) {
  return userRole === "admin" || order.user.toString() === userId;
}

function canCancelOrder(order: any) {
  return !["shipped", "delivered"].includes(order.orderStatus);
}

async function processOrderCancellation(order: any) {
  order.orderStatus = "cancelled";
  
  // Restore product stock
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: item.quantity },
    });
  }

  await order.save();
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

function handleUnauthorized(res: Response) {
  return res.status(403).json({
    success: false,
    message: "Not authorized to perform this action",
  });
}

function handleOrderError(res: Response, message: string, error: any) {
  res.status(400).json({
    success: false,
    message,
    error: error.message,
  });
}

function handleServerError(res: Response, message: string, error: any) {
  res.status(500).json({
    success: false,
    message,
    error: error.message,
  });
}