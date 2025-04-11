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

// Mock API responses for development - Updated with detailed product data
const mockProducts = [
  {
    _id: "CP-GL-001",
    name: "Luxury Gel Wax Candle",
    price: 310,
    size: "65g",
    type: "Gel Wax",
    category: "Cup",
    fragrance: "Vanilla & Amber",
    waxType: "Premium Crystal Gel",
    burnTime: "20-25 hours",
    description:
      "Elegant transparent gel candle in IKEA glass, infused with our signature Vanilla & Amber fragrance blend. Perfect for creating a cozy atmosphere in small spaces.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 10,
    ratings: [],
    averageRating: 4.5,
  },
  {
    _id: "CP-GL-002",
    name: "Clear Gel Wax Candle",
    price: 350,
    size: "165g",
    type: "Gel Wax",
    category: "Cup",
    fragrance: "Ocean Breeze",
    waxType: "Crystal Clear Gel",
    burnTime: "35-40 hours",
    description:
      "Crystal clear gel candle in IKEA tumbler with refreshing Ocean Breeze scent. Features decorative seashell embeds. Ideal for bathrooms and coastal-themed decor.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 15,
    ratings: [],
    averageRating: 4.2,
  },
  {
    _id: "CP-SY-003",
    name: "Natural Soy Wax Candle",
    price: 330,
    size: "65g",
    type: "Soy Wax",
    category: "Cup",
    fragrance: "Lavender & Chamomile",
    waxType: "100% Soy Wax",
    burnTime: "20-25 hours",
    description:
      "Natural soy wax candle in IKEA glass, blended with calming Lavender and Chamomile essential oils. Perfect for bedtime relaxation and meditation spaces.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 12,
    ratings: [],
    averageRating: 4.8,
  },
  {
    _id: "CP-SY-004",
    name: "Premium Soy Wax Candle",
    price: 450,
    size: "165g",
    type: "Soy Wax",
    category: "Cup",
    fragrance: "Sandalwood",
    waxType: "Organic Soy Wax",
    burnTime: "35-40 hours",
    description:
      "Premium soy candle in IKEA jar with exotic Sandalwood fragrance. Features wooden wick for crackling fireplace effect. Great for living rooms and offices.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 8,
    ratings: [],
    averageRating: 4.6,
  },
  {
    _id: "CP-SY-005",
    name: "Large Soy Wax Candle",
    price: 650,
    size: "275g",
    type: "Soy Wax",
    category: "Cup",
    fragrance: "Vanilla Bean",
    waxType: "Soy Wax Blend",
    burnTime: "50-55 hours",
    description:
      "Extra-large soy candle in IKEA container with rich Vanilla Bean aroma. Long-lasting burn time makes it perfect for frequent use in large rooms.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 5,
    ratings: [],
    averageRating: 4.7,
  },
  {
    _id: "CP-PL-006",
    name: "Palm Wax Candle",
    price: 269,
    size: "65g",
    type: "Palm Wax",
    category: "Cup",
    fragrance: "Citrus & Bergamot",
    waxType: "Sustainable Palm Wax",
    burnTime: "20-25 hours",
    description:
      "Eco-friendly palm wax candle in IKEA glass with energizing Citrus & Bergamot blend. Features unique crystalline pattern when solid.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 20,
    ratings: [],
    averageRating: 4.2,
  },
  {
    _id: "CP-PL-007",
    name: "Palm Wax Candle Large",
    price: 500,
    size: "300g",
    type: "Palm Wax",
    category: "Cup",
    fragrance: "Rose & Musk",
    waxType: "Premium Palm Wax",
    burnTime: "60-65 hours",
    description:
      "Luxury palm wax candle in large IKEA vessel with romantic Rose & Musk perfume. Beautiful feathery crystallization pattern develops as it cools.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 7,
    ratings: [],
    averageRating: 4.4,
  },
  {
    _id: "SH-TD-008",
    name: "Teddy Bear Shaped Candle",
    price: 450,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Cinnamon & Spice",
    waxType: "Soy-Palm Blend",
    burnTime: "25-30 hours",
    description:
      "Adorable teddy bear shaped candle with warm Cinnamon & Spice fragrance. Makes a perfect gift for children's rooms or baby showers. Hand-poured with care.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 10,
    ratings: [],
    averageRating: 4.9,
  },
  {
    _id: "SH-BR-009",
    name: "Bride Doll Candle",
    price: 550,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Jasmine & Lily",
    waxType: "Premium Paraffin",
    burnTime: "30-35 hours",
    description:
      "Elegant bride doll candle for weddings and anniversaries. Scented with romantic Jasmine & Lily bouquet. Traditional Egyptian design with intricate details.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 6,
    ratings: [],
    averageRating: 4.7,
  },
  {
    _id: "SH-PD-010",
    name: "Panda Shaped Candle",
    price: 480,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Green Tea",
    waxType: "Soy Wax",
    burnTime: "25-30 hours",
    description:
      "Playful panda shaped candle with refreshing Green Tea fragrance. Features black and white color details. Great for kids' rooms or as desk decor.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 8,
    ratings: [],
    averageRating: 4.5,
  },
  {
    _id: "SH-SK-011",
    name: "Skull Shaped Candle",
    price: 420,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Black Orchid",
    waxType: "Palm-Paraffin Blend",
    burnTime: "25-30 hours",
    description:
      "Edgy skull shaped candle with mysterious Black Orchid scent. Detailed mold captures realistic features. Popular for Halloween and Gothic decor.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 12,
    ratings: [],
    averageRating: 4.3,
  },
  {
    _id: "SH-BL-012",
    name: "Ball Shaped Candle",
    price: 380,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Fresh Cotton",
    waxType: "Soy Wax",
    burnTime: "20-25 hours",
    description:
      "Sleek spherical candle with clean Fresh Cotton fragrance. Minimalist design fits any decor style. Available in multiple pastel color options.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 15,
    ratings: [],
    averageRating: 4.1,
  },
  {
    _id: "SH-SH-013",
    name: "Shell Shaped Candle",
    price: 400,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Sea Salt",
    waxType: "Palm Wax",
    burnTime: "25-30 hours",
    description:
      "Realistic seashell shaped candle with oceanic Sea Salt aroma. Features natural shell texture and pearlescent finish. Perfect for beach-themed decor.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 9,
    ratings: [],
    averageRating: 4.4,
  },
  {
    _id: "SH-RS-014",
    name: "Rose Shaped Candle",
    price: 520,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Damask Rose",
    waxType: "Beeswax-Soy Blend",
    burnTime: "30-35 hours",
    description:
      "Exquisite rose-shaped candle with authentic Damask Rose perfume. Each petal is hand-shaped for realistic appearance. Romantic gift for special occasions.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 7,
    ratings: [],
    averageRating: 4.8,
  },
  {
    _id: "SH-SF-015",
    name: "Sunflower Shaped Candle",
    price: 500,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Honey & Nectar",
    waxType: "Soy Wax",
    burnTime: "30-35 hours",
    description:
      "Cheerful sunflower shaped candle with sweet Honey & Nectar scent. Vibrant yellow petals with brown center. Brings summer vibes to any room.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 8,
    ratings: [],
    averageRating: 4.6,
  },
  {
    _id: "BB-LG-016",
    name: "Large Bubble Candle",
    price: 600,
    size: "320g",
    type: "Bubble Candle",
    category: "Special",
    fragrance: "Amber & Oud",
    waxType: "Paraffin-Soy Blend",
    burnTime: "60-65 hours",
    description:
      "Statement bubble candle with luxurious Amber & Oud fragrance. Unique textured surface creates beautiful light patterns. Makes a dramatic centerpiece.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 5,
    ratings: [],
    averageRating: 4.7,
  },
  {
    _id: "BB-SM-017",
    name: "Small Bubble Candle",
    price: 350,
    size: "165g",
    type: "Bubble Candle",
    category: "Special",
    fragrance: "Lemon Zest",
    waxType: "Soy Wax",
    burnTime: "35-40 hours",
    description:
      "Playful bubble candle with zesty Lemon Zest fragrance. Smaller version of our popular bubble design. Great for grouping or as accent pieces.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 10,
    ratings: [],
    averageRating: 4.3,
  },
  {
    _id: "CP-SY-018",
    name: "Soy Cup Candle (65g)",
    price: 250,
    size: "65g",
    type: "Cup Candle",
    category: "Cup",
    fragrance: "Fresh Linen",
    waxType: "100% Soy Wax",
    burnTime: "20-25 hours",
    description:
      "Classic soy candle in IKEA glass with clean Fresh Linen scent. Simple and versatile for any room. Cotton wick for clean burn.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 20,
    ratings: [],
    averageRating: 4.2,
  },
  {
    _id: "CP-PL-019",
    name: "Palm Cup Candle (165g)",
    price: 380,
    size: "165g",
    type: "Cup Candle",
    category: "Cup",
    fragrance: "Coconut Milk",
    waxType: "Sustainable Palm Wax",
    burnTime: "35-40 hours",
    description:
      "Tropical-inspired palm wax candle in IKEA jar with creamy Coconut Milk fragrance. Features natural crystalline surface pattern.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 15,
    ratings: [],
    averageRating: 4.4,
  },
  {
    _id: "CP-SY-020",
    name: "Soy Cup Candle (275g)",
    price: 550,
    size: "275g",
    type: "Cup Candle",
    category: "Cup",
    fragrance: "Vanilla Latte",
    waxType: "Soy Wax Blend",
    burnTime: "50-55 hours",
    description:
      "Large soy candle in IKEA container with comforting Vanilla Latte aroma. Perfect for coffee lovers and cozy winter evenings.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 8,
    ratings: [],
    averageRating: 4.6,
  },
  {
    _id: "CP-PL-021",
    name: "Palm Cup Candle (300g)",
    price: 600,
    size: "300g",
    type: "Cup Candle",
    category: "Cup",
    fragrance: "Suede & Musk",
    waxType: "Premium Palm Wax",
    burnTime: "60-65 hours",
    description:
      "Luxury palm wax candle in large IKEA vessel with sophisticated Suede & Musk fragrance. Elegant masculine scent for offices and studies.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 6,
    ratings: [],
    averageRating: 4.7,
  },
  {
    _id: "CP-GL-022",
    name: "Gel Cup Candle (320g)",
    price: 650,
    size: "320g",
    type: "Cup Candle",
    category: "Cup",
    fragrance: "Blue Agave",
    waxType: "Crystal Gel",
    burnTime: "60-65 hours",
    description:
      "Extra-large gel candle in IKEA glass with exotic Blue Agave scent. Can be customized with decorative embeds. Makes a stunning gift.",
    images: ["/placeholder.svg?height=400&width=400"],
    stock: 5,
    ratings: [],
    averageRating: 4.8,
  },
]

// Update a few products to include ratings data
mockProducts[0].ratings = [
  { userId: "user1", rating: 5, review: "Amazing product!", date: new Date() },
  { userId: "user2", rating: 4, review: "Great scent and burn time", date: new Date() },
  { userId: "user3", rating: 5, review: "Beautiful candle, will buy again", date: new Date() },
]
mockProducts[0].averageRating = 4.7

mockProducts[1].ratings = [
  { userId: "user4", rating: 5, review: "Love the fragrance", date: new Date() },
  { userId: "user5", rating: 4, review: "Burns evenly and smells wonderful", date: new Date() },
]
mockProducts[1].averageRating = 4.5

mockProducts[2].ratings = [{ userId: "user6", rating: 5, review: "Perfect gift!", date: new Date() }]
mockProducts[2].averageRating = 5.0

mockProducts[7].ratings = [
  { userId: "user7", rating: 5, review: "So cute and smells amazing", date: new Date() },
  { userId: "user8", rating: 5, review: "My daughter loves it", date: new Date() },
  { userId: "user9", rating: 4, review: "Great quality", date: new Date() },
  { userId: "user10", rating: 5, review: "Adorable and fragrant", date: new Date() },
]
mockProducts[7].averageRating = 4.8

// Product API
export const productAPI = {
  // Get all products with optional filters
  getProducts: async (params = {}) => {
    try {
      // For development, return mock data
      if (process.env.NODE_ENV === "development") {
        // Filter products based on params
        let filteredProducts = [...mockProducts]

        if (params.category) {
          filteredProducts = filteredProducts.filter((p) => p.category.toLowerCase() === params.category.toLowerCase())
        }

        if (params.type) {
          filteredProducts = filteredProducts.filter((p) => p.type.toLowerCase().includes(params.type.toLowerCase()))
        }

        if (params.minPrice) {
          filteredProducts = filteredProducts.filter((p) => p.price >= Number(params.minPrice))
        }

        if (params.maxPrice) {
          filteredProducts = filteredProducts.filter((p) => p.price <= Number(params.maxPrice))
        }

        if (params.size) {
          filteredProducts = filteredProducts.filter((p) => p.size === params.size)
        }

        if (params.search) {
          const searchTerm = params.search.toLowerCase()
          filteredProducts = filteredProducts.filter(
            (p) =>
              p.name.toLowerCase().includes(searchTerm) ||
              p.description.toLowerCase().includes(searchTerm) ||
              p.fragrance.toLowerCase().includes(searchTerm),
          )
        }

        return {
          success: true,
          count: filteredProducts.length,
          total: mockProducts.length,
          totalPages: 1,
          currentPage: 1,
          products: filteredProducts,
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

        // Get related products (same category but different ID)
        const relatedProducts = mockProducts.filter((p) => p.category === product.category && p._id !== id).slice(0, 4)

        return {
          success: true,
          product,
          relatedProducts,
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
        // Randomly select products to feature
        const shuffled = [...mockProducts].sort(() => 0.5 - Math.random())
        return {
          success: true,
          count: shuffled.length,
          products: shuffled.slice(0, limit),
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
