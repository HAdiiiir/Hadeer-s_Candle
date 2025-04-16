import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-purple-50/80 via-purple-50/50 to-purple-50/30" />
      
      {/* Background Image - Now using local image */}
      <div className="relative h-[600px] w-full">
        <Image 
          src="/images/hero-banner.jpg" 
          alt="Hadeer's Candle Collection" 
          fill 
          className="object-cover object-center"
          priority
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
      </div>

      {/* Rest of your component remains exactly the same */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/normal text-purple-800 drop-shadow-lg">
              Illuminate Your Space with <span className="text-purple-600">Handcrafted Candles</span>
            </h1>
            <p className="text-lg text-gray-700 md:text-xl/relaxed max-w-lg backdrop-blur-sm bg-white/30 rounded-lg p-2">
              Discover our premium collection of handcrafted candles made with the finest natural materials and enchanting fragrance blends.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button 
                asChild 
                size="lg" 
                className="rounded-full bg-purple-600 hover:bg-purple-700 transition-all hover:shadow-lg hover:shadow-purple-200 group"
              >
                <Link href="/products" className="flex items-center gap-1">
                  Shop Now 
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="rounded-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all hover:shadow-md"
              >
                <Link href="/about" className="flex items-center gap-1">
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 pt-4 text-sm text-purple-900">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                <span>100% Natural Ingredients</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                <span>Handcrafted in Egypt</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                <span>Premium Fragrances</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <div className="animate-bounce">
          <div className="h-8 w-5 rounded-full border-2 border-purple-400 flex items-start justify-center">
            <div className="h-2 w-1 bg-purple-400 rounded-full mt-1 animate-scroll"></div>
          </div>
        </div>
      </div>
    </section>
  )
}