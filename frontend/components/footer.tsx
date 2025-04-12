import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-purple-50/80 backdrop-blur-sm border-t border-purple-100">
      <div className="container px-4 py-16 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <h3 className="text-xl font-bold text-purple-600">Hadeer's Candle</h3>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed">
              Premium handcrafted candles made with the finest natural materials for a luxurious and eco-friendly experience.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full border-purple-300 bg-white text-purple-600 hover:bg-purple-600 hover:text-white transition-all hover:scale-105"
              >
                <Link href="https://facebook.com/hadeers-candle" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full border-purple-300 bg-white text-purple-600 hover:bg-purple-600 hover:text-white transition-all hover:scale-105"
              >
                <Link href="https://instagram.com/hadeers-candle" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full border-purple-300 bg-white text-purple-600 hover:bg-purple-600 hover:text-white transition-all hover:scale-105"
              >
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-purple-600 flex items-center">
              <span className="w-3 h-3 bg-purple-200 rounded-full mr-2"></span>
              Shop Collections
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/products" 
                  className="text-sm text-gray-800 hover:text-purple-600 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-200 rounded-full mr-2 group-hover:bg-purple-600 transition-colors"></span>
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?category=Cup" 
                  className="text-sm text-gray-800 hover:text-purple-600 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-200 rounded-full mr-2 group-hover:bg-purple-600 transition-colors"></span>
                  Cup Candles
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?category=Molded" 
                  className="text-sm text-gray-800 hover:text-purple-600 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-200 rounded-full mr-2 group-hover:bg-purple-600 transition-colors"></span>
                  Shaped Candles
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?category=Special" 
                  className="text-sm text-gray-800 hover:text-purple-600 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-200 rounded-full mr-2 group-hover:bg-purple-600 transition-colors"></span>
                  Special Edition
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?category=Gifts" 
                  className="text-sm text-gray-800 hover:text-purple-600 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-200 rounded-full mr-2 group-hover:bg-purple-600 transition-colors"></span>
                  Gift Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-purple-600 flex items-center">
              <span className="w-3 h-3 bg-purple-200 rounded-full mr-2"></span>
              Our Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/about" 
                  className="text-sm text-gray-800 hover:text-purple-600 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-200 rounded-full mr-2 group-hover:bg-purple-600 transition-colors"></span>
                  Our Story
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-sm text-gray-800 hover:text-purple-600 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-200 rounded-full mr-2 group-hover:bg-purple-600 transition-colors"></span>
                  Candle Care Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-sm text-gray-800 hover:text-purple-600 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-200 rounded-full mr-2 group-hover:bg-purple-600 transition-colors"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="text-sm text-gray-800 hover:text-purple-600 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-200 rounded-full mr-2 group-hover:bg-purple-600 transition-colors"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  href="/sustainability" 
                  className="text-sm text-gray-800 hover:text-purple-600 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-200 rounded-full mr-2 group-hover:bg-purple-600 transition-colors"></span>
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-purple-600 flex items-center">
              <span className="w-3 h-3 bg-purple-200 rounded-full mr-2"></span>
              Join Our Community
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed">
              Subscribe to receive exclusive offers, candle care tips, and early access to new collections.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-300" />
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="pl-10 border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-white"
                />
              </div>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 transition-all hover:shadow-lg hover:shadow-purple-100"
              >
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-gray-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-purple-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Hadeer's Candle. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}