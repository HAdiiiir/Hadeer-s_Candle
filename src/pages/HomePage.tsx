import { Link } from "react-router-dom"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { products, testimonials } from "../data/products"
import ProductCard from "../components/ProductCard"

export default function HomePage() {
  // Get 4 featured products
  const featuredProducts = products.filter((product) => product.featured).slice(0, 4)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://via.placeholder.com/1920x1080"
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
              className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-md flex items-center justify-center"
            >
              Shop Now <ShoppingBag className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="border border-white text-white px-6 py-3 rounded-md flex items-center justify-center hover:bg-white/10"
            >
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
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
                src="https://via.placeholder.com/800x600"
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
                src="https://via.placeholder.com/800x600"
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-rose-600 hover:text-rose-700 flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 mb-4 rounded-full overflow-hidden">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">{testimonial.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{testimonial.role}</p>
                <p className="italic">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

