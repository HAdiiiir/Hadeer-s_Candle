import type { Request, Response } from "express";
import Cart from "../models/cart.model";
import Product from "../models/product.model";

// =============================================
// CONSTANTS & INTERFACES
// =============================================
const PRODUCT_POPULATE_OPTIONS = {
  path: "items.product",
  select: "name price images type size stock",
};

// =============================================
// CART OPERATIONS
// =============================================

/**
 * Get or create user's cart with calculated total
 */
export const getUserCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    let cart = await getOrCreateCart(userId);

    const total = calculateCartTotal(cart);

    res.status(200).json({
      success: true,
      cart,
      total,
    });

  } catch (error: any) {
    handleServerError(res, "Error fetching cart", error);
  }
};

/**
 * Add item to cart or update quantity if already exists
 */
export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { productId, quantity } = req.body;

    await validateProductForCart(productId, quantity);

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await createNewCart(userId, productId, quantity);
    } else {
      await updateCartItem(cart, productId, quantity);
    }

    const updatedCart = await getPopulatedCart(userId);
    const total = calculateCartTotal(updatedCart);

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart: updatedCart,
      total,
    });

  } catch (error: any) {
    handleBadRequest(res, "Error adding item to cart", error);
  }
};

/**
 * Update cart item quantity
 */
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { productId, quantity } = req.body;

    validateQuantity(quantity);
    await validateProductForCart(productId, quantity);

    const cart = await getExistingCart(userId);
    await updateCartItemQuantity(cart, productId, quantity);

    const updatedCart = await getPopulatedCart(userId);
    const total = calculateCartTotal(updatedCart);

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart: updatedCart,
      total,
    });

  } catch (error: any) {
    handleBadRequest(res, "Error updating cart", error);
  }
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { productId } = req.params;

    const cart = await getExistingCart(userId);
    removeItemFromCart(cart, productId);
    await cart.save();

    const updatedCart = await getPopulatedCart(userId);
    const total = calculateCartTotal(updatedCart);

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart: updatedCart,
      total,
    });

  } catch (error: any) {
    handleBadRequest(res, "Error removing item from cart", error);
  }
};

/**
 * Clear all items from cart
 */
export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const cart = await getExistingCart(userId);

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart,
      total: 0,
    });

  } catch (error: any) {
    handleBadRequest(res, "Error clearing cart", error);
  }
};

// =============================================
// HELPER FUNCTIONS
// =============================================

async function getOrCreateCart(userId: string) {
  let cart = await Cart.findOne({ user: userId }).populate(PRODUCT_POPULATE_OPTIONS);

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await Cart.findOne({ user: userId }).populate(PRODUCT_POPULATE_OPTIONS);
  }

  return cart;
}

async function getPopulatedCart(userId: string) {
  return Cart.findOne({ user: userId }).populate(PRODUCT_POPULATE_OPTIONS);
}

async function getExistingCart(userId: string) {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error("Cart not found");
  return cart;
}

async function createNewCart(userId: string, productId: string, quantity: number) {
  return Cart.create({
    user: userId,
    items: [{ product: productId, quantity }],
  });
}

async function updateCartItem(cart: any, productId: string, quantity: number) {
  const existingItemIndex = cart.items.findIndex(
    (item: any) => item.product.toString() === productId
  );

  if (existingItemIndex !== -1) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
}

async function updateCartItemQuantity(cart: any, productId: string, quantity: number) {
  const itemIndex = cart.items.findIndex(
    (item: any) => item.product.toString() === productId
  );

  if (itemIndex === -1) throw new Error("Item not found in cart");
  
  cart.items[itemIndex].quantity = quantity;
  await cart.save();
}

function removeItemFromCart(cart: any, productId: string) {
  cart.items = cart.items.filter(
    (item: any) => item.product.toString() !== productId
  );
}

async function validateProductForCart(productId: string, quantity: number) {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");
  if (product.stock < quantity) throw new Error("Insufficient stock");
}

function validateQuantity(quantity: number) {
  if (quantity < 1) throw new Error("Quantity must be at least 1");
}

function calculateCartTotal(cart: any) {
  if (!cart?.items?.length) return 0;

  return cart.items.reduce((total: number, item: any) => {
    const product = item.product as any;
    return total + product.price * item.quantity;
  }, 0);
}

// =============================================
// ERROR HANDLERS
// =============================================

function handleBadRequest(res: Response, message: string, error: any) {
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