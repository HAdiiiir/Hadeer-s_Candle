'use client'

import { createContext, useContext, useState, useEffect } from "react"

type CartItem = {
  _id: string
  name: string
  price: number
  size?: string
  type?: string
  category?: string
  fragrance?: string
  images: string[]
  quantity?: number
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem._id === item._id)
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        )
      }
      return [...prevItems, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
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
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}