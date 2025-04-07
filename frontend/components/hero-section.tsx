import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 to-transparent z-10" />
      <div className="relative h-[500px] w-full">
        <Image
          src="/placeholder.svg?height=1000&width=2000"
          alt="Hadeer's Candle"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container px-4 md:px-6">
          <div className="max-w-lg space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Illuminate Your Space with Handcrafted Candles
            </h1>
            <p className="text-lg text-gray-700 md:text-xl">
              Discover our premium collection of handcrafted candles made with the finest materials.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

