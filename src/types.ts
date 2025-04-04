export interface Product {
    id: string
    name: string
    description: string
    category: "cup" | "shaped"
    type?: string
    waxType?: "gel" | "palm" | "soy"
    weight?: number
    shape?: string
    price: number
    image: string
    featured?: boolean
  }
  
  export interface CartItem {
    product: Product
    quantity: number
  }
  
  export interface Order {
    id: string
    items: CartItem[]
    totalAmount: number
    status: "pending" | "processing" | "shipped" | "delivered"
    date: string
    shippingAddress: Address
  }
  
  export interface Address {
    fullName: string
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  
  