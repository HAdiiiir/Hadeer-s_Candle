"use client"

import Link from "next/link"
import { Package, ShoppingBag, ArrowRight, Filter, ArrowUpDown } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { OrdersList } from "@/components/orders-list"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Enhanced order type with more detailed status information
type OrderStatus = "Delivered" | "Shipped" | "Processing" | "Cancelled" | "Returned"

interface Order {
  id: string
  date: string
  status: OrderStatus
  total: number
  items: number
  deliveryDate?: string
  estimatedDelivery?: string
  trackingNumber?: string
  products: {
    name: string
    image: string
    quantity?: number
    price?: number
  }[]
}

export default function OrdersPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState<OrderStatus | "All">("All")
  const [sort, setSort] = useState<"newest" | "oldest">("newest")

  // Enhanced sample orders data with more details
  const orders: Order[] = [
    {
      id: "ORD-12345",
      date: "2023-04-01",
      status: "Delivered",
      total: 950,
      items: 3,
      deliveryDate: "2023-04-05",
      trackingNumber: "TRK-789456123",
      products: [
        { name: "Luxury Gel Wax Candle", image: "/candles/gel-vanilla-amber.jpg", quantity: 1, price: 450 },
        { name: "Rose Shaped Candle", image: "/candles/rose.jpg", quantity: 2, price: 250 },
        { name: "Soy Cup Candle (165g)", image: "/candles/cup-165g.jpg", quantity: 1, price: 250 }
      ]
    },
    {
      id: "ORD-12346",
      date: "2023-03-15",
      status: "Shipped",
      total: 630,
      items: 2,
      estimatedDelivery: "2023-03-22",
      trackingNumber: "TRK-321654987",
      products: [
        { name: "Palm Wax Candle", image: "/candles/palm-citrus.jpg", quantity: 1, price: 330 },
        { name: "Bride Doll Candle", image: "/candles/bride-doll.jpg", quantity: 1, price: 300 }
      ]
    },
    {
      id: "ORD-12347",
      date: "2023-05-10",
      status: "Processing",
      total: 1200,
      items: 4,
      estimatedDelivery: "2023-05-18",
      products: [
        { name: "Floral Jar Candle", image: "/candles/floral-jar.jpg", quantity: 2, price: 300 },
        { name: "Citrus Soy Candle", image: "/candles/citrus-soy.jpg", quantity: 1, price: 350 },
        { name: "Lavender Pillar", image: "/candles/lavender-pillar.jpg", quantity: 1, price: 250 }
      ]
    }
  ]

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => filter === "All" || order.status === filter)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sort === "newest" ? dateB - dateA : dateA - dateB
    })

  const isEmpty = filteredOrders.length === 0

  // Status colors mapping
  const statusColors: Record<OrderStatus, string> = {
    Delivered: "bg-green-100 text-green-800",
    Shipped: "bg-blue-100 text-blue-800",
    Processing: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
    Returned: "bg-purple-100 text-purple-800"
  }

  // Simulate loading more orders
  const loadMoreOrders = () => {
    setIsLoading(true)
    setTimeout(() => {
      // In a real app, you would fetch more orders here
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-6">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-purple-50">
              <ShoppingBag className="h-6 w-6 text-purple-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Orders</h1>
          </div>
          <Button 
            asChild 
            variant="outline" 
            className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 shadow-sm"
          >
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        <Separator className="bg-purple-100" />

        {/* Empty state */}
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center space-y-6 py-16 rounded-xl bg-purple-50/50 border border-purple-100">
            <div className="p-6 rounded-full bg-white shadow-sm">
              <Package className="h-12 w-12 text-purple-500" />
            </div>
            <div className="space-y-2 text-center max-w-md">
              <h2 className="text-2xl font-semibold text-gray-900">No orders found</h2>
              <p className="text-gray-600">
                {filter === "All" 
                  ? "You haven't placed any orders yet. Browse our collection to find your perfect candle."
                  : `No orders with status "${filter}". Try changing your filters.`}
              </p>
            </div>
            <Button 
              asChild 
              className="bg-purple-600 hover:bg-purple-700 rounded-lg px-6 py-3 shadow-md transition-colors"
            >
              <Link href="/products">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Filters and sorting */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                Order History 
                <Badge className="ml-2 bg-purple-100 text-purple-800">
                  {filteredOrders.length} {filter !== "All" && `(${filter})`}
                </Badge>
              </h2>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[120px]">
                    <DropdownMenuItem onClick={() => setFilter("All")}>
                      All Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter("Processing")}>
                      Processing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter("Shipped")}>
                      Shipped
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter("Delivered")}>
                      Delivered
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter("Cancelled")}>
                      Cancelled
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[120px]">
                    <DropdownMenuItem onClick={() => setSort("newest")}>
                      Newest First
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSort("oldest")}>
                      Oldest First
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Orders list with loading state */}
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-48 mb-4" />
                    <div className="flex space-x-4">
                      {[...Array(2)].map((_, j) => (
                        <Skeleton key={j} className="h-16 w-16 rounded" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <OrdersList orders={filteredOrders} statusColors={statusColors} />
            )}
            
            {/* Load more button (only shown if there are more orders to load) */}
            {orders.length > 2 && (
              <div className="flex justify-center pt-4">
                <Button 
                  variant="outline" 
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={loadMoreOrders}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load More"}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}