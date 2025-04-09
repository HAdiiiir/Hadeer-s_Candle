import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative">
      {/* خلفية شفافة فوق الصورة */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f8f4fc] via-[#f0e5f9] to-[#e8d9f5] opacity-80 z-10" />
      
      {/* صورة الخلفية */}
      <div className="relative h-[600px] w-full">
        <Image
          src="/images/hero-banner.png"
          alt="Hadeer's Candle"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* النص والأزرار */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container px-4 md:px-6">
          <div className="max-w-lg space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-[#6C3483]">
              Illuminate Your Space with Handcrafted Candles
            </h1>
            <p className="text-lg text-gray-700 md:text-xl">
              Discover our premium collection of handcrafted candles made with the finest materials and enchanting
              fragrances.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-[#A569BD] hover:bg-[#8E44AD] text-white transition"
              >
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="rounded-full border-[#A569BD] text-[#A569BD] hover:bg-[#A569BD] hover:text-white transition"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
