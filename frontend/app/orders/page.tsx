import Link from "next/link"
import { Package, ShoppingBag, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { OrdersList } from "@/components/orders-list"
import { Badge } from "@/components/ui/badge"

export default function OrdersPage() {
  // Enhanced sample orders data
  const orders = [
    {
      id: "ORD-12345",
      date: "2023-04-01",
      status: "Delivered",
      total: 950,
      items: 3,
      deliveryDate: "2023-04-05",
      products: [
        { name: "Luxury Gel Wax Candle", image: "/candles/gel-vanilla-amber.jpg" },
        { name: "Rose Shaped Candle", image: "/candles/rose.jpg" },
        { name: "Soy Cup Candle (165g)", image: "/candles/cup-165g.jpg" }
      ]
    },
    {
      id: "ORD-12346",
      date: "2023-03-15",
      status: "Processing",
      total: 630,
      items: 2,
      estimatedDelivery: "2023-03-22",
      products: [
        { name: "Palm Wax Candle", image: "/candles/palm-citrus.jpg" },
        { name: "Bride Doll Candle", image: "/candles/bride-doll.jpg" }
      ]
    },
  ]

  const isEmpty = orders.length === 0

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ShoppingBag className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          </div>
          <Button 
            asChild 
            variant="outline" 
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        <Separator className="bg-purple-100" />

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center space-y-6 py-16 rounded-xl bg-purple-50 border border-purple-100">
            <div className="bg-white p-6 rounded-full shadow-sm">
              <Package className="h-12 w-12 text-purple-500" />
            </div>
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-semibold text-gray-900">No orders yet</h2>
              <p className="text-gray-600 max-w-md">
                You haven't placed any orders yet. Browse our collection to find your perfect candle.
              </p>
            </div>
            <Button 
              asChild 
              className="bg-purple-600 hover:bg-purple-700 rounded-full px-8 py-4 shadow-md"
            >
              <Link href="/products">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Order History <Badge className="ml-2 bg-purple-100 text-purple-800">{orders.length}</Badge>
              </h2>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
                  Filter
                </Button>
                <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
                  Sort
                </Button>
              </div>
            </div>

            <OrdersList orders={orders} />
            
            <div className="flex justify-center pt-4">
              <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                Load More
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}