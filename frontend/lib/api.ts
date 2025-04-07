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

// Product API
export const productAPI = {
  // Get all products with optional filters
  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params as Record<string, string>).toString()
    return fetchAPI(`/products?${queryString}`)
  },

  // Get a single product by ID
  getProduct: async (id: string) => {
    return fetchAPI(`/products/${id}`)
  },

  // Get featured products
  getFeaturedProducts: async (limit = 4) => {
    return fetchAPI(`/products/featured?limit=${limit}`)
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
    return fetchAPI("/cart")
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

