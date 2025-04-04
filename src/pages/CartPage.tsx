import { Link } from "react-router-dom"
import FeaturedProducts from "../components/FeaturedProducts"
import TestimonialSection from "../components/TestimonialSection"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Candles background"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Hadeer's Candle</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Handcrafted candles that bring warmth and elegance to your space
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-md font-medium text-lg inline-flex items-center"
            >
              Shop Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-5 w-5"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </Link>
            <Link
              to="/about"
              className="border border-white text-white px-6 py-3 rounded-md font-medium text-lg inline-flex items-center hover:bg-white/10"
            >
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-5 w-5"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-80 rounded-lg overflow-hidden group">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Cup Candles"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Cup Candles</h3>
                <p className="text-center mb-4">Elegant candles in various sizes and wax types</p>
                <Link
                  to="/products?category=cup"
                  className="border border-white text-white px-4 py-2 rounded-md hover:bg-white/10"
                >
                  View Collection
                </Link>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden group">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Shaped Candles"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Shaped Candles</h3>
                <p className="text-center mb-4">Unique designs to match any occasion</p>
                <Link
                  to="/products?category=shaped"
                  className="border border-white text-white px-4 py-2 rounded-md hover:bg-white/10"
                >
                  View Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Newsletter */}
      <section className="py-16 bg-rose-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
            <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

