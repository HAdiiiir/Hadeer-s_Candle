import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Hadeer&apos;s Candle</h3>
            <p className="text-sm text-gray-500">
              Premium handcrafted candles made with the finest materials for a luxurious experience.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/products" className="hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=cups" className="hover:text-primary">
                  Cup Candles
                </Link>
              </li>
              <li>
                <Link href="/products?category=shaped" className="hover:text-primary">
                  Shaped Candles
                </Link>
              </li>
              <li>
                <Link href="/products?category=special" className="hover:text-primary">
                  Special Edition
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Company</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Newsletter</h3>
            <p className="text-sm text-gray-500">
              Subscribe to our newsletter for updates on new products and special offers.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Hadeer&apos;s Candle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

