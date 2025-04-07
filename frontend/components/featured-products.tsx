import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

// Sample product data
const featuredProducts = [
  {
    id: "1",
    name: "Luxury Gel Wax Candle",
    price: 310,
    size: "65g",
    type: "Gel Wax",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "2",
    name: "Natural Soy Wax Candle",
    price: 330,
    size: "65g",
    type: "Soy Wax",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "3",
    name: "Palm Wax Candle",
    price: 269,
    size: "65g",
    type: "Palm Wax",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "4",
    name: "Teddy Bear Shaped Candle",
    price: 450,
    type: "Shaped Candle",
    image: "/placeholder.svg?height=400&width=400",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Products</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our most popular candles loved by our customers
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group relative overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  {product.size && `${product.size} - `}
                  {product.type}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="font-bold">EGP {product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button asChild>
            <Link href="/products" className="flex items-center">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

