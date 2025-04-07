import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CartSummary } from "@/components/cart-summary"

export default function CartPage() {
  // Sample cart data
  const cartItems = [
    {
      id: "1",
      name: "Luxury Gel Wax Candle",
      price: 310,
      quantity: 2,
      size: "65g",
      type: "Gel Wax",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "2",
      name: "Natural Soy Wax Candle",
      price: 330,
      quantity: 1,
      size: "65g",
      type: "Soy Wax",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const isEmpty = cartItems.length === 0

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Separator />
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-semibold">Your cart is empty</h2>
              <p className="text-gray-500">Add some items to your cart to continue shopping.</p>
            </div>
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 rounded-lg border p-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{item.name}</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.size} - {item.type}
                          </p>
                        </div>
                        <p className="text-lg font-medium">EGP {item.price}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="icon">
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button variant="outline" size="icon">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

