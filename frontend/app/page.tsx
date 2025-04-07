import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { FeaturedProducts } from "@/components/featured-products"
import { HeroSection } from "@/components/hero-section"
import { TestimonialSection } from "@/components/testimonial-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Collection</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our handcrafted candles made with premium materials for a luxurious experience
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
              <Link href="/products?category=cups">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Cup Candles"
                    width={600}
                    height={600}
                    className="object-cover transition-all group-hover:scale-105"
                  />
                </div>
                <div className="bg-white p-6">
                  <h3 className="text-xl font-bold">Cup Candles</h3>
                  <p className="mt-2 text-gray-500">Elegant candles in various sizes and wax types</p>
                  <div className="mt-4 flex items-center text-primary">
                    Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            </div>
            <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
              <Link href="/products?category=shaped">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Shaped Candles"
                    width={600}
                    height={600}
                    className="object-cover transition-all group-hover:scale-105"
                  />
                </div>
                <div className="bg-white p-6">
                  <h3 className="text-xl font-bold">Shaped Candles</h3>
                  <p className="mt-2 text-gray-500">Unique designs including bride, teddy bear, and more</p>
                  <div className="mt-4 flex items-center text-primary">
                    Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            </div>
            <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
              <Link href="/products?category=special">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Special Edition"
                    width={600}
                    height={600}
                    className="object-cover transition-all group-hover:scale-105"
                  />
                </div>
                <div className="bg-white p-6">
                  <h3 className="text-xl font-bold">Special Edition</h3>
                  <p className="mt-2 text-gray-500">Limited edition candles for special occasions</p>
                  <div className="mt-4 flex items-center text-primary">
                    Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts />

      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Our Candles</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Quality materials, handcrafted with care, and designed to enhance your space
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Premium Materials</h3>
              <p className="mt-2 text-gray-500">
                We use only the highest quality waxes including gel, palm, and 100% natural soy
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Handcrafted</h3>
              <p className="mt-2 text-gray-500">
                Each candle is carefully handcrafted to ensure quality and attention to detail
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Variety of Options</h3>
              <p className="mt-2 text-gray-500">
                Choose from different sizes, wax types, and unique shapes to match your style
              </p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialSection />
    </div>
  )
}

