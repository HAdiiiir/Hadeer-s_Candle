"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Menu, Search, ShoppingBag, User, X, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"

export function Header() {
  const isMobile = useMobile()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, logout } = useAuth()
  const { items } = useCart()

  const cartItemCount = items.length

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-md">
      <div className="container flex h-20 items-center px-4 md:px-6">
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 text-[#6B46C1]">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white">
              <div className="flex flex-col items-center mb-8 mt-4">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="brand-logo text-2xl font-bold text-[#6B46C1]">Hadeer&apos;s Candle</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-lg font-medium transition-colors hover:text-[#6B46C1]">
                  Home
                </Link>
                <Link href="/products" className="text-lg font-medium transition-colors hover:text-[#6B46C1]">
                  Products
                </Link>
                <Link href="/products?category=cups" className="text-lg font-medium transition-colors hover:text-[#6B46C1]">
                  Cup Candles
                </Link>
                <Link href="/products?category=shaped" className="text-lg font-medium transition-colors hover:text-[#6B46C1]">
                  Shaped Candles
                </Link>
                {user && (
                  <Link href="/orders" className="text-lg font-medium transition-colors hover:text-[#6B46C1]">
                    My Orders
                  </Link>
                )}
                {!user ? (
                  <Link href="/login" className="text-lg font-medium transition-colors hover:text-[#6B46C1]">
                    Login
                  </Link>
                ) : (
                  <Button variant="ghost" onClick={logout} className="justify-start px-0 text-[#6B46C1]">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        ) : null}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="brand-logo text-2xl font-bold text-[#6B46C1]">Hadeer&apos;s Candle</span>
        </Link>
        {!isMobile && (
          <nav className="flex flex-1 items-center gap-8 text-sm">
            <Link href="/" className="font-medium transition-colors hover:text-[#6B46C1]">
              Home
            </Link>
            <Link href="/products" className="font-medium transition-colors hover:text-[#6B46C1]">
              Products
            </Link>
            <Link href="/products?category=cups" className="font-medium transition-colors hover:text-[#6B46C1]">
              Cup Candles
            </Link>
            <Link href="/products?category=shaped" className="font-medium transition-colors hover:text-[#6B46C1]">
              Shaped Candles
            </Link>
          </nav>
        )}
        <div className="flex flex-1 items-center justify-end gap-3">
          {isSearchOpen ? (
            <div className="flex items-center">
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] md:w-[300px] border-[#6B46C1] focus:ring-[#6B46C1]"
              />
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)} className="text-[#6B46C1]">
                <X className="h-5 w-5" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="text-[#6B46C1]">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          {!isMobile && (
            <Button variant="ghost" size="icon" asChild className="text-[#6B46C1]">
              <Link href="/favorites">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favorites</span>
              </Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" asChild className="relative text-[#6B46C1]">
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#6B46C1] text-[10px] text-white">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          {!user ? (
            <Button variant="ghost" size="icon" asChild className="text-[#6B46C1]">
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#6B46C1]">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border border-[#6B46C1]/20 shadow-lg">
                <DropdownMenuItem asChild>
                  <Link href="/account">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
