// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Helper function for API requests
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`

  // Get token from localStorage if available
  let token = ""
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || ""
  }

  // Set default headers
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  // Handle response
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "An error occurred")
  }

  return response.json()
}

// Mock API responses for development
const mockProducts = [
  {
    _id: "1",
    name: "Luxury Gel Wax Candle",
    price: 310,
    size: "65g",
    type: "Gel Wax",
    fragrance: "Vanilla & Amber",
    images: ["/images/gel-candle.png"],
    description: "Our handcrafted gel wax candles are made with premium materials for a luxurious experience.",
    stock: 10,
    ratings: [],
    averageRating: 4.5,
  },
  {
    _id: "2",
    name: "Natural Soy Wax Candle",
    price: 330,
    size: "65g",
    type: "Soy Wax",
    fragrance: "Lavender & Chamomile",
    images: ["/images/soy-candle.png"],
    description: "Eco-friendly soy wax candles with natural fragrances for a clean, long-lasting burn.",
    stock: 15,
    ratings: [],
    averageRating: 4.8,
  },
  {
    _id: "3",
    name: "Palm Wax Candle",
    price: 269,
    size: "65g",
    type: "Palm Wax",
    fragrance: "Citrus & Bergamot",
    images: ["/images/palm-candle.png"],
    description: "Palm wax candles with a unique crystalline appearance and excellent scent throw.",
    stock: 8,
    ratings: [],
    averageRating: 4.2,
  },
  {
    _id: "4",
    name: "Teddy Bear Shaped Candle",
    price: 450,
    type: "Shaped Candle",
    fragrance: "Cinnamon & Spice",
    images: ["/images/shaped-candle.png"],
    description: "Adorable teddy bear shaped candles, perfect for gifts and special occasions.",
    stock: 5,
    ratings: [],
    averageRating: 4.9,
  },
]

// Product API
export const productAPI = {
  // Get all products with optional filters
  getProducts: async (params = {}) => {
    try {
      // For development, return mock data
      if (process.env.NODE_ENV === "development") {
        return {
          success: true,
          count: mockProducts.length,
          total: mockProducts.length,
          totalPages: 1,
          currentPage: 1,
          products: mockProducts,
        }
      }

      const queryString = new URLSearchParams(params as Record<string, string>).toString()
      return fetchAPI(`/products?${queryString}`)
    } catch (error) {
      console.error("Error fetching products:", error)
      return {
        success: true,
        count: 0,
        total: 0,
        totalPages: 0,
        currentPage: 1,
        products: [],
      }
    }
  },

  // Get a single product by ID
  getProduct: async (id: string) => {
    try {
      // For development, return mock data
      if (process.env.NODE_ENV === "development") {
        const product = mockProducts.find((p) => p._id === id)
        if (!product) throw new Error("Product not found")

        return {
          success: true,
          product,
          relatedProducts: mockProducts.filter((p) => p._id !== id).slice(0, 3),
        }
      }

      return fetchAPI(`/products/${id}`)
    } catch (error) {
      console.error("Error fetching product:", error)
      throw error
    }
  },

  // Get featured products
  getFeaturedProducts: async (limit = 4) => {
    try {
      // For development, return mock data
      if (process.env.NODE_ENV === "development") {
        return {
          success: true,
          count: mockProducts.length,
          products: mockProducts.slice(0, limit),
        }
      }

      return fetchAPI(`/products/featured?limit=${limit}`)
    } catch (error) {
      console.error("Error fetching featured products:", error)
      return {
        success: true,
        count: 0,
        products: [],
      }
    }
  },

  // Add a rating to a product
  addRating: async (id: string, data: { rating: number; review?: string }) => {
    return fetchAPI(`/products/${id}/rating`, {
      method: "POST",
      body: JSON.stringify(data),
    })
  },
}

// Cart API
export const cartAPI = {
  // Get user cart
  getCart: async () => {
    try {
      // For development, return mock data
      if (process.env.NODE_ENV === "development") {
        return {
          success: true,
          cart: { items: [] },
          total: 0,
        }
      }

      return fetchAPI("/cart")
    } catch (error) {
      console.error("Error fetching cart:", error)
      return {
        success: true,
        cart: { items: [] },
        total: 0,
      }
    }
  },

  // Add item to cart
  addToCart: async (productId: string, quantity: number) => {
    return fetchAPI("/cart/add", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    })
  },

  // Update cart item quantity
  updateCartItem: async (productId: string, quantity: number) => {
    return fetchAPI("/cart/update", {
      method: "PUT",
      body: JSON.stringify({ productId, quantity }),
    })
  },

  // Remove item from cart
  removeFromCart: async (productId: string) => {
    return fetchAPI(`/cart/item/${productId}`, {
      method: "DELETE",
    })
  },

  // Clear cart
  clearCart: async () => {
    return fetchAPI("/cart/clear", {
      method: "DELETE",
    })
  },
}

// Order API
export const orderAPI = {
  // Create a new order
  createOrder: async (orderData: any) => {
    return fetchAPI("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  },

  // Get user orders
  getUserOrders: async () => {
    return fetchAPI("/orders/user")
  },

  // Get a single order by ID
  getOrder: async (id: string) => {
    return fetchAPI(`/orders/${id}`)
  },

  // Cancel an order
  cancelOrder: async (id: string) => {
    return fetchAPI(`/orders/${id}/cancel`, {
      method: "PUT",
    })
  },
}

// Auth API
export const authAPI = {
  // Register a new user
  register: async (userData: any) => {
    return fetchAPI("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },

  // Login user
  login: async (email: string, password: string) => {
    return fetchAPI("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  },

  // Get current user
  getCurrentUser: async () => {
    return fetchAPI("/auth/me")
  },

  // Update user profile
  updateProfile: async (profileData: any) => {
    return fetchAPI("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    })
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string) => {
    return fetchAPI("/auth/password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    })
  },
}
