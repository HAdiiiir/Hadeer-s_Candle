import type { Request, Response } from "express"
import Cart from "../models/cart.model"
import Product from "../models/product.model"

// Get user cart
export const getUserCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id // From auth middleware

    let cart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      select: "name price images type size stock",
    })

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = await Cart.create({
        user: userId,
        items: [],
      })

      // Populate the newly created cart
      cart = await Cart.findOne({ user: userId }).populate({
        path: "items.product",
        select: "name price images type size stock",
      })
    }

    // Calculate total
    let total = 0
    if (cart && cart.items.length > 0) {
      for (const item of cart.items) {
        const product = item.product as any
        total += product.price * item.quantity
      }
    }

    res.status(200).json({
      success: true,
      cart,
      total,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    })
  }
}

// Add item to cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id // From auth middleware
    const { productId, quantity } = req.body

    // Validate product
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      })
    }

    // Find user's cart
    let cart = await Cart.findOne({ user: userId })

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }],
      })
    } else {
      // Check if product already exists in cart
      const existingItemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

      if (existingItemIndex !== -1) {
        // Update quantity if product already in cart
        cart.items[existingItemIndex].quantity += quantity
      } else {
        // Add new item to cart
        cart.items.push({ product: productId, quantity })
      }

      await cart.save()
    }

    // Get updated cart with populated product details
    const updatedCart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      select: "name price images type size stock",
    })

    // Calculate total
    let total = 0
    if (updatedCart && updatedCart.items.length > 0) {
      for (const item of updatedCart.items) {
        const product = item.product as any
        total += product.price * item.quantity
      }
    }

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart: updatedCart,
      total,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message,
    })
  }
}

// Update cart item quantity
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id // From auth middleware
    const { productId, quantity } = req.body

    // Validate quantity
    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      })
    }

    // Validate product
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      })
    }

    // Find user's cart
    const cart = await Cart.findOne({ user: userId })

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      })
    }

    // Find item in cart
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      })
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity
    await cart.save()

    // Get updated cart with populated product details
    const updatedCart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      select: "name price images type size stock",
    })

    // Calculate total
    let total = 0
    if (updatedCart && updatedCart.items.length > 0) {
      for (const item of updatedCart.items) {
        const product = item.product as any
        total += product.price * item.quantity
      }
    }

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart: updatedCart,
      total,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error updating cart",
      error: error.message,
    })
  }
}

// Remove item from cart
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id // From auth middleware
    const { productId } = req.params

    // Find user's cart
    const cart = await Cart.findOne({ user: userId })

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      })
    }

    // Remove item from cart
    cart.items = cart.items.filter((item) => item.product.toString() !== productId)

    await cart.save()

    // Get updated cart with populated product details
    const updatedCart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      select: "name price images type size stock",
    })

    // Calculate total
    let total = 0
    if (updatedCart && updatedCart.items.length > 0) {
      for (const item of updatedCart.items) {
        const product = item.product as any
        total += product.price * item.quantity
      }
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart: updatedCart,
      total,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error removing item from cart",
      error: error.message,
    })
  }
}

// Clear cart
export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id // From auth middleware

    // Find user's cart
    const cart = await Cart.findOne({ user: userId })

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      })
    }

    // Clear cart items
    cart.items = []
    await cart.save()

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart,
      total: 0,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error clearing cart",
      error: error.message,
    })
  }
}

