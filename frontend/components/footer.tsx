import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-purple-50">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="brand-logo text-xl font-bold text-purple-600">Hadeer&apos;s Candle</h3>
            <p className="text-sm text-gray-600">
              Premium handcrafted candles made with the finest materials for a luxurious experience.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
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
                className="rounded-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
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
                className="rounded-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
              >
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-purple-600">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/products" className="hover:text-purple-600 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=Cup" className="hover:text-purple-600 transition-colors">
                  Cup Candles
                </Link>
              </li>
              <li>
                <Link href="/products?category=Molded" className="hover:text-purple-600 transition-colors">
                  Shaped Candles
                </Link>
              </li>
              <li>
                <Link href="/products?category=Special" className="hover:text-purple-600 transition-colors">
                  Special Edition
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-purple-600">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-purple-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-purple-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-purple-600 transition-colors">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-purple-600">Newsletter</h3>
            <p className="text-sm text-gray-600">
              Subscribe to our newsletter for updates on new products and special offers.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="border-purple-200 focus:ring-purple-500" />
              <Button className="bg-purple-600 hover:bg-purple-700">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-purple-100 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Hadeer&apos;s Candle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
