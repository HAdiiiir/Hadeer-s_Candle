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
      _id: "1",
      name: "Luxury Gel Wax Candle",
      price: 310,
      size: "65g",
      type: "Gel Wax",
      fragrance: "Vanilla & Amber",
      images: ["/candles/gel-vanilla-amber.jpg"],
    },
    {
      _id: "2",
      name: "Clear Gel Wax Candle",
      price: 350,
      size: "165g",
      type: "Gel Wax",
      fragrance: "Ocean Breeze",
      images: ["/candles/gel-ocean.jpg"],
    },
    {
      _id: "3",
      name: "Natural Soy Wax Candle",
      price: 330,
      size: "65g",
      type: "Soy Wax",
      fragrance: "Lavender & Chamomile",
      images: ["/candles/soy-lavender.jpg"],
    },
    {
      _id: "4",
      name: "Premium Soy Wax Candle",
      price: 450,
      size: "165g",
      type: "Soy Wax",
      fragrance: "Sandalwood",
      images: ["/candles/soy-sandalwood.jpg"],
    },
    {
      _id: "5",
      name: "Large Soy Wax Candle",
      price: 650,
      size: "275g",
      type: "Soy Wax",
      fragrance: "Vanilla Bean",
      images: ["/candles/soy-vanilla.jpg"],
    },
    {
      _id: "6",
      name: "Palm Wax Candle",
      price: 269,
      size: "65g",
      type: "Palm Wax",
      fragrance: "Citrus & Bergamot",
      images: ["/candles/palm-citrus.jpg"],
    },
    {
      _id: "7",
      name: "Palm Wax Candle Large",
      price: 500,
      size: "300g",
      type: "Palm Wax",
      fragrance: "Rose & Musk",
      images: ["/candles/palm-rose.jpg"],
    },
    {
      _id: "8",
      name: "Teddy Bear Shaped Candle",
      price: 450,
      type: "Shaped Candle",
      fragrance: "Cinnamon & Spice",
      images: ["/candles/teddy-bear.jpg"],
    },
    {
      _id: "9",
      name: "Bride Doll Candle",
      price: 550,
      type: "Shaped Candle",
      fragrance: "Jasmine & Lily",
      images: ["/candles/bride-doll.jpg"],
    },
    {
      _id: "10",
      name: "Panda Shaped Candle",
      price: 480,
      type: "Shaped Candle",
      fragrance: "Green Tea",
      images: ["/candles/panda.jpg"],
    },
    {
      _id: "11",
      name: "Skull Shaped Candle",
      price: 420,
      type: "Shaped Candle",
      fragrance: "Black Orchid",
      images: ["/candles/skull.jpg"],
    },
    {
      _id: "12",
      name: "Ball Shaped Candle",
      price: 380,
      type: "Shaped Candle",
      fragrance: "Fresh Cotton",
      images: ["/candles/ball.jpg"],
    },
    {
      _id: "13",
      name: "Shell Shaped Candle",
      price: 400,
      type: "Shaped Candle",
      fragrance: "Sea Salt",
      images: ["/candles/shell.jpg"],
    },
    {
      _id: "14",
      name: "Rose Shaped Candle",
      price: 520,
      type: "Shaped Candle",
      fragrance: "Damask Rose",
      images: ["/candles/rose.jpg"],
    },
    {
      _id: "15",
      name: "Sunflower Shaped Candle",
      price: 500,
      type: "Shaped Candle",
      fragrance: "Honey & Nectar",
      images: ["/candles/sunflower.jpg"],
    },
    {
      _id: "16",
      name: "Large Bubble Candle",
      price: 600,
      size: "320g",
      type: "Bubble Candle",
      fragrance: "Amber & Oud",
      images: ["/candles/bubble-large.jpg"],
    },
    {
      _id: "17",
      name: "Small Bubble Candle",
      price: 350,
      size: "165g",
      type: "Bubble Candle",
      fragrance: "Lemon Zest",
      images: ["/candles/bubble-small.jpg"],
    },
    {
      _id: "18",
      name: "Soy Cup Candle (65g)",
      price: 250,
      size: "65g",
      type: "Cup Candle",
      fragrance: "Fresh Linen",
      images: ["/candles/cup-65g.jpg"],
    },
    {
      _id: "19",
      name: "Palm Cup Candle (165g)",
      price: 380,
      size: "165g",
      type: "Cup Candle",
      fragrance: "Coconut Milk",
      images: ["/candles/cup-165g.jpg"],
    },
    {
      _id: "20",
      name: "Soy Cup Candle (275g)",
      price: 550,
      size: "275g",
      type: "Cup Candle",
      fragrance: "Vanilla Latte",
      images: ["/candles/cup-275g.jpg"],
    },
    {
      _id: "21",
      name: "Palm Cup Candle (300g)",
      price: 600,
      size: "300g",
      type: "Cup Candle",
      fragrance: "Suede & Musk",
      images: ["/candles/cup-300g.jpg"],
    },
    {
      _id: "22",
      name: "Gel Cup Candle (320g)",
      price: 650,
      size: "320g",
      type: "Cup Candle",
      fragrance: "Blue Agave",
      images: ["/candles/cup-320g.jpg"],
    }
  ]
  
  const isEmpty = cartItems.length === 0

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold text-purple-800">Shopping Cart</h1>
        <Separator />
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <ShoppingBag className="h-12 w-12 text-purple-400" />
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-semibold text-purple-600">Your cart is empty</h2>
              <p className="text-gray-500">Add some items to your cart to continue shopping.</p>
            </div>
            <Button asChild>
              <Link href="/products" className="text-purple-600 hover:text-purple-500">
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-start space-x-4 rounded-lg border p-4 hover:bg-gray-50 transition-all">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.images[0] || "/placeholder.svg"}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-purple-800">{item.name}</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.size} - {item.type} - {item.fragrance}
                          </p>
                        </div>
                        <p className="text-lg font-medium text-purple-800">EGP {item.price}</p>
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
                          <Trash2 className="h-4 w-4 text-red-500" />
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
