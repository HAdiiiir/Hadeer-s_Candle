import type { Request, Response } from "express"
import Order from "../models/order.model"
import Product from "../models/product.model"
import Cart from "../models/cart.model"

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id // From auth middleware
    const { items, shippingAddress, paymentMethod, notes } = req.body

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
      })
    }

    // Calculate total amount and validate products
    let totalAmount = 0
    const orderItems = []

    for (const item of items) {
      const product = await Product.findById(item.product)

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.product} not found`,
        })
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        })
      }

      // Add item to order
      orderItems.push({
        product: item.product,
        quantity: item.quantity,
        price: product.price,
        name: product.name,
      })

      // Update total amount
      totalAmount += product.price * item.quantity

      // Update product stock
      product.stock -= item.quantity
      await product.save()
    }

    // Create the order
    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      notes,
      paymentStatus: "pending",
      orderStatus: "pending",
    })

    // Clear user's cart after successful order
    await Cart.findOneAndUpdate({ user: userId }, { $set: { items: [] } })

    res.status(201).json({
      success: true,
      order,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    })
  }
}

// Get all orders for a user
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id // From auth middleware

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).populate({
      path: "items.product",
      select: "name images",
    })

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    })
  }
}

// Get a single order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id // From auth middleware
    const userRole = (req as any).user.role

    const order = await Order.findById(req.params.id)
      .populate({
        path: "items.product",
        select: "name images price",
      })
      .populate({
        path: "user",
        select: "name email",
      })

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      })
    }

    // Check if user is authorized to view this order
    if (userRole !== "admin" && order.user._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this order",
      })
    }

    res.status(200).json({
      success: true,
      order,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: error.message,
    })
  }
}

// Update order status (admin only)
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderStatus, paymentStatus, trackingNumber } = req.body

    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      })
    }

    // Update order fields
    if (orderStatus) order.orderStatus = orderStatus
    if (paymentStatus) order.paymentStatus = paymentStatus
    if (trackingNumber) order.trackingNumber = trackingNumber

    await order.save()

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error updating order",
      error: error.message,
    })
  }
}

// Cancel an order
export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id // From auth middleware
    const userRole = (req as any).user.role

    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      })
    }

    // Check if user is authorized to cancel this order
    if (userRole !== "admin" && order.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this order",
      })
    }

    // Check if order can be cancelled
    if (order.orderStatus === "shipped" || order.orderStatus === "delivered") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel an order that has been shipped or delivered",
      })
    }

    // Update order status
    order.orderStatus = "cancelled"

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity },
      })
    }

    await order.save()

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error cancelling order",
      error: error.message,
    })
  }
}

// Get all orders (admin only)
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    // Build filter object
    const filter: any = {}

    // Filter by status
    if (req.query.orderStatus) {
      filter.orderStatus = req.query.orderStatus
    }

    // Filter by payment status
    if (req.query.paymentStatus) {
      filter.paymentStatus = req.query.paymentStatus
    }

    // Execute query with pagination
    const orders = await Order.find(filter)
      .populate({
        path: "user",
        select: "name email",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    // Get total count for pagination
    const total = await Order.countDocuments(filter)

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      orders,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    })
  }
}

