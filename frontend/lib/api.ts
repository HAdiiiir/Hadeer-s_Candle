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
    description: "Elegant transparent gel candle in glass, infused with our signature Vanilla & Amber fragrance blend.",
    images: ["https://i.pinimg.com/474x/66/4f/f7/664ff7120a4fe85e6a29cb2bb5d547b6.jpg"],
    stock: 30,
    ratings: [],
    averageRating: 4.8,
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
    description: "Crystal clear gel candle with refreshing Ocean Breeze scent and decorative seashell embeds.",
    images: ["https://i.pinimg.com/474x/73/02/fb/7302fbc2de81e6d75d305f745f9d560f.jpg"],
    stock: 30,
    ratings: [],
    averageRating: 4.8,
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
    description: "Natural soy wax candle blended with calming Lavender and Chamomile essential oils.",
    images: ["https://i.pinimg.com/474x/c2/2a/11/c22a1180ac440ed1f7b13129b63ebc27.jpg"],
    stock: 15,
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
    description: "Premium soy candle with exotic Sandalwood fragrance and wooden wick for crackling effect.",
    images: ["https://i.pinimg.com/474x/e1/fc/3d/e1fc3da4b8695718be3baa5553a19139.jpg"],
    stock: 15,
    ratings: [],
    averageRating: 4.8,
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
    description: "Extra-large soy candle with rich Vanilla Bean aroma for large rooms.",
    images: ["https://i.pinimg.com/474x/a5/e3/51/a5e3512de14b6007eadb0fffb652f745.jpg"],
    stock: 15,
    ratings: [],
    averageRating: 4.8,
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
    description: "Eco-friendly palm wax candle with energizing Citrus & Bergamot blend.",
    images: ["https://i.pinimg.com/474x/cd/08/c8/cd08c8e4ad1baf40f75006cf5907a2d0.jpg"],
    stock: 25,
    ratings: [],
    averageRating: 4.8,
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
    description: "Luxury palm wax candle with romantic Rose & Musk perfume.",
    images: ["https://i.pinimg.com/474x/e9/2c/64/e92c64a9419b290bdaafa0b0aff852f2.jpg"],
    stock: 25,
    ratings: [],
    averageRating: 4.8,
  },
  {
    _id: "SH-TD-008",
    name: "Teddy Bear Shaped Candle",
    price: 350,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Cinnamon & Spice",
    waxType: "Soy-Palm Blend",
    burnTime: "4-6 hours",
    description: "Adorable teddy bear shaped candle with warm Cinnamon & Spice fragrance.",
    images: ["https://i.pinimg.com/474x/e6/5b/d5/e65bd5da00ba6d82719cb7410399ca82.jpg"],
    stock: 50,
    ratings: [],
    averageRating: 4.8,
  },
  {
    _id: "SH-BR-009",
    name: "Bride Doll Candle",
    price: 240,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Jasmine & Lily",
    waxType: "Premium Paraffin",
    burnTime: "5-7 hours",
    description: "Elegant bride doll candle for weddings and anniversaries.",
    images: ["https://i.pinimg.com/474x/21/a8/5d/21a85d0df504e6096ca4be5627b12f3a.jpg"],
    stock: 50,
    ratings: [],
    averageRating: 4.8,
  },
  {
    _id: "SH-PD-010",
    name: "Panda Shaped Candle",
    price: 190,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Green Tea",
    waxType: "Soy Wax",
    burnTime: "4-5 hours",
    description: "Playful panda shaped candle with refreshing Green Tea fragrance.",
    images: ["https://i.pinimg.com/474x/3b/55/2b/3b552b7edb38558fb473d7f170413ae5.jpg"],
    stock: 20,
    ratings: [],
    averageRating: 4.8,
  },
  {
    _id: "SH-SK-011",
    name: "Skull Shaped Candle",
    price: 210,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Black Orchid",
    waxType: "Palm-Paraffin Blend",
    burnTime: "6-8 hours",
    description: "Edgy skull shaped candle with mysterious Black Orchid scent.",
    images: ["https://i.pinimg.com/474x/38/1a/85/381a85cc95680915a1ecba9e349b67fd.jpg"],
    stock: 100,
    ratings: [],
    averageRating: 4.8,
  },
  {
    _id: "SH-BL-012",
    name: "Ball Shaped Candle",
    price: 310,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Fresh Cotton",
    waxType: "Soy Wax",
    burnTime: "9-11 hours",
    description: "Sleek spherical candle with clean Fresh Cotton fragrance.",
    images: ["https://i.pinimg.com/474x/b8/ce/a3/b8cea390b5d394bbbb59ab8d37ffd985.jpg"],
    stock: 50,
    ratings: [],
    averageRating: 4.8,
  },
  {
    _id: "SH-SH-013",
    name: "Shell Shaped Candle",
    price: 50,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Sea Salt",
    waxType: "Palm Wax",
    burnTime: "1-2 hours",
    description: "Realistic seashell shaped candle with oceanic Sea Salt aroma.",
    images: ["https://i.pinimg.com/736x/29/e3/84/29e38499eef6d5054d60091a46bc7b99.jpg"],
    stock: 100,
    ratings: [],
    averageRating: 4.8,
  },
  {
    _id: "SH-RS-014",
    name: "Rose Shaped Candle",
    price: 170,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Damask Rose",
    waxType: "Beeswax-Soy Blend",
    burnTime: "2-3 hours",
    description: "Exquisite rose-shaped candle with authentic Damask Rose perfume.",
    images: ["https://i.pinimg.com/474x/98/01/44/98014458c7336f44ec850b5bba22beea.jpg"],
    stock: 70,
    ratings: [],
    averageRating: 4.8,
  },
  {
    _id: "SH-SF-015",
    name: "Sunflower Shaped Candle",
    price: 60,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Honey & Nectar",
    waxType: "Soy Wax",
    burnTime: "1-2 hours",
    description: "Cheerful sunflower shaped candle with sweet Honey & Nectar scent.",
    images: ["https://i.pinimg.com/474x/f6/4b/52/f64b52fab8fce0b0d080dd1c487f8bcf.jpg"],
    stock: 60,
    ratings: [],
    averageRating: 4.8,
  },
  {
    _id: "BB-LG-016",
    name: "Large Bubble Candle",
    price: 140,
    size: "320g",
    type: "Bubble Candle",
    category: "Special",
    fragrance: "Amber & Oud",
    waxType: "Paraffin-Soy Blend",
    burnTime: "3-4 hours",
    description: "Statement bubble candle with luxurious Amber & Oud fragrance.",
    images: ["https://i.pinimg.com/474x/07/76/a8/0776a8956a9d7f348e9b9b4bd7b46610.jpg"],
    stock: 50,
    ratings: [],
    averageRating: 4.8,
  },
  {
    _id: "BB-SM-017",
    name: "Small Bubble Candle",
    price: 120,
    size: "165g",
    type: "Bubble Candle",
    category: "Special",
    fragrance: "Lemon Zest",
    waxType: "Soy Wax",
    burnTime: "1-2 hours",
    description: "Playful bubble candle with zesty Lemon Zest fragrance.",
    images: ["https://i.pinimg.com/474x/59/ab/8a/59ab8a84daba472521a3effc9ba69802.jpg"],
    stock: 50,
    ratings: [],
    averageRating: 4.8,
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
    burnTime: "15-20 hours",
    description: "Classic soy candle with clean Fresh Linen scent.",
    images: ["https://i.pinimg.com/736x/f7/7f/b8/f77fb81380abb8226a5957263ad7b480.jpg"],
    stock: 15,
    ratings: [],
    averageRating: 4.8,
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
    burnTime: "20-25 hours",
    description: "Tropical-inspired palm wax candle with creamy Coconut Milk fragrance.",
    images: ["https://i.pinimg.com/474x/4a/c8/19/4ac819ef0f52d06d0b2b91cfd3c5e137.jpg"],
    stock: 25,
    ratings: [],
    averageRating: 4.8,
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
    burnTime: "30-35 hours",
    description: "Large soy candle with comforting Vanilla Latte aroma.",
    images: ["https://i.pinimg.com/474x/6c/b1/29/6cb129f0e6e4ebd50aec2fba6bedb0df.jpg"],
    stock: 15,
    ratings: [],
    averageRating: 4.8,
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
    burnTime: "40-45 hours",
    description: "Luxury palm wax candle with sophisticated Suede & Musk fragrance.",
    images: ["https://i.pinimg.com/474x/48/0d/6a/480d6a28128b5e1ea0a0f6b2e80e3e78.jpg"],
    stock: 25,
    ratings: [],
    averageRating: 4.8,
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
    burnTime: "10-15 hours",
    description: "Extra-large gel candle with exotic Blue Agave scent.",
    images: ["https://i.pinimg.com/474x/4e/e6/e7/4ee6e7aa7173a88b77559c5012267012.jpg"],
    stock: 20,
    ratings: [],
    averageRating: 4.8,
  },
  {
    _id: "CP-GL-023",
    name: "Clear Gel Wax Candle",
    price: 350,
    size: "300g",
    type: "Gel Wax",
    category: "Cup",
    fragrance: "Ocean Breeze",
    waxType: "Crystal Clear Gel",
    burnTime: "35-40 hours",
    description: "Crystal clear gel candle with refreshing Ocean Breeze scent and decorative seashell embeds.",
    images: ["https://i.pinimg.com/474x/3a/78/c9/3a78c9197fd3048ad9000dbc65e80a43.jpg"],
    stock: 20,
    ratings: [],
    averageRating: 4.8,
  },
  {
    _id: "CP-GL-024",
    name: "Clear Gel Wax Candle",
    price: 350,
    size: "300g",
    type: "Gel Wax",
    category: "Cup",
    fragrance: "Ocean Breeze",
    waxType: "Crystal Clear Gel",
    burnTime: "35-40 hours",
    description: "Crystal clear gel candle with refreshing Ocean Breeze scent and decorative seashell embeds.",
    images: ["https://i.pinimg.com/474x/d6/2f/50/d62f50a93f9229616e66ca024850814d.jpg"],
    stock: 20,
    ratings: [],
    averageRating: 4.8,
  },
  {
    _id: "CP-GL-025",
    name: "Clear Gel Wax Candle",
    price: 350,
    size: "300g",
    type: "Gel Wax",
    category: "Cup",
    fragrance: "Ocean Breeze",
    waxType: "Crystal Clear Gel",
    burnTime: "35-40 hours",
    description: "Crystal clear gel candle with refreshing Ocean Breeze scent and decorative seashell embeds.",
    images: ["https://i.pinimg.com/474x/0a/4d/83/0a4d834a962a31b3450a4e91a664632e.jpg"],
    stock: 20,
    ratings: [],
    averageRating: 4.8,
  },
  {
    _id: "BB-SM-026",
    name: "Square-shaped Candle",
    price: 190,
    size: "165g",
    type: "Square-shaped Gel wax Candle",
    category: "Special",
    fragrance: "Lemon Zest",
    waxType: "Soy Wax",
    burnTime: "3-4 hours",
    description: "Playful bubble candle with zesty Lemon Zest fragrance.",
    images: ["https://i.pinimg.com/474x/5e/6c/43/5e6c4368f5c491193482e2920fe0a0f1.jpg"],
    stock: 50,
    ratings: [],
    averageRating: 4.9,
  },
  {
    _id: "CP-PL-027",
    name: "Palm Cup Candle (300g)",
    price: 600,
    size: "300g",
    type: "Cup Candle",
    category: "Cup",
    fragrance: "Suede & Musk",
    waxType: "Premium Palm Wax",
    burnTime: "40-45 hours",
    description: "Luxury palm wax candle with sophisticated Suede & Musk fragrance.",
    images: ["https://i.pinimg.com/736x/d9/9e/fd/d99efd0aa56362d580c04d829fdacaed.jpg"],
    stock: 5,
    ratings: [],
    averageRating: 4.6,
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
