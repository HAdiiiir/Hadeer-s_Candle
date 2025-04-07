"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { cartAPI } from "./api"
import { useAuth } from "./auth-context"

interface CartItem {
  product: {
    _id: string
    name: string
    price: number
    images: string[]
    type: string
    size?: string
  }
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  total: number
  loading: boolean
  error: string | null
  addToCart: (productId: string, quantity: number) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  clearCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  // Fetch cart when user logs in
  useEffect(() => {
    if (user) {
      fetchCart()
    } else {
      // Clear cart when user logs out
      setItems([])
      setTotal(0)
    }
  }, [user])

  // Fetch cart from API
  const fetchCart = async () => {
    if (!user) return

    setLoading(true)
    setError(null)
    try {
      const { cart, total } = await cartAPI.getCart()
      setItems(cart.items || [])
      setTotal(total || 0)
    } catch (err: any) {
      setError(err.message || "Failed to fetch cart")
    } finally {
      setLoading(false)
    }
  }

  // Add item to cart
  const addToCart = async (productId: string, quantity: number) => {
    if (!user) return

    setLoading(true)
    setError(null)
    try {
      const { cart, total } = await cartAPI.addToCart(productId, quantity)
      setItems(cart.items || [])
      setTotal(total || 0)
    } catch (err: any) {
      setError(err.message || "Failed to add item to cart")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Update item quantity
  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) return

    setLoading(true)
    setError(null)
    try {
      const { cart, total } = await cartAPI.updateCartItem(productId, quantity)
      setItems(cart.items || [])
      setTotal(total || 0)
    } catch (err: any) {
      setError(err.message || "Failed to update cart")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Remove item from cart
  const removeItem = async (productId: string) => {
    if (!user) return

    setLoading(true)
    setError(null)
    try {
      const { cart, total } = await cartAPI.removeFromCart(productId)
      setItems(cart.items || [])
      setTotal(total || 0)
    } catch (err: any) {
      setError(err.message || "Failed to remove item from cart")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Clear cart
  const clearCart = async () => {
    if (!user) return

    setLoading(true)
    setError(null)
    try {
      await cartAPI.clearCart()
      setItems([])
      setTotal(0)
    } catch (err: any) {
      setError(err.message || "Failed to clear cart")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        loading,
        error,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

