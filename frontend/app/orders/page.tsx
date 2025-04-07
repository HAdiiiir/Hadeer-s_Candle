import Link from "next/link"
import { Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { OrdersList } from "@/components/orders-list"

export default function OrdersPage() {
  // Sample orders data
  const orders = [
    {
      id: "ORD-12345",
      date: "2023-04-01",
      status: "Delivered",
      total: 950,
      items: 3,
    },
    {
      id: "ORD-12346",
      date: "2023-03-15",
      status: "Processing",
      total: 630,
      items: 2,
    },
  ]

  const isEmpty = orders.length === 0

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <Separator />
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <Package className="h-12 w-12 text-gray-400" />
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-semibold">No orders yet</h2>
              <p className="text-gray-500">You haven't placed any orders yet.</p>
            </div>
            <Button asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <OrdersList orders={orders} />
        )}
      </div>
    </div>
  )
}

