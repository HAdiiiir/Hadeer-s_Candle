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
import { AnimatedLogo } from "@/components/animated-logo"

export function Header() {
  const isMobile = useMobile()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, logout } = useAuth()
  const { items } = useCart()

  const cartItemCount = items.length

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container flex h-20 items-center px-4 md:px-6">
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 text-primary">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-background">
              <div className="flex flex-col items-center mb-8 mt-4">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="brand-logo text-2xl font-bold text-primary">Hadeer&apos;s Candle</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-lg font-medium transition-colors hover:text-primary">
                  Home
                </Link>
                <Link href="/products" className="text-lg font-medium transition-colors hover:text-primary">
                  All Products
                </Link>
                <Link
                  href="/products?category=Cup"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Cup Candles
                </Link>
                <Link
                  href="/products?category=Molded"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Shaped Candles
                </Link>
                {user && (
                  <Link href="/orders" className="text-lg font-medium transition-colors hover:text-primary">
                    My Orders
                  </Link>
                )}
                {!user ? (
                  <Link href="/login" className="text-lg font-medium transition-colors hover:text-primary">
                    Login
                  </Link>
                ) : (
                  <Button variant="ghost" onClick={logout} className="justify-start px-0">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        ) : null}

        {/* Animated Logo on the right for desktop */}
        {!isMobile && (
          <div className="mr-auto order-2 ml-4">
            <AnimatedLogo />
          </div>
        )}

        <Link href="/" className="mr-6 flex items-center space-x-2 order-1">
          <span className="brand-logo text-2xl font-bold text-primary">Hadeer&apos;s Candle</span>
        </Link>

        {!isMobile && (
          <nav className="flex flex-1 items-center gap-8 text-sm order-0">
            <Link href="/" className="font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/products" className="font-medium transition-colors hover:text-primary">
              All Products
            </Link>
            <Link href="/products?category=Cup" className="font-medium transition-colors hover:text-primary">
              Cup Candles
            </Link>
            <Link href="/products?category=Molded" className="font-medium transition-colors hover:text-primary">
              Shaped Candles
            </Link>
          </nav>
        )}

        <div className="flex items-center justify-end gap-3 order-3">
          {isSearchOpen ? (
            <div className="flex items-center">
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] md:w-[300px] border-primary focus:ring-primary"
              />
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)} className="text-primary">
                <X className="h-5 w-5" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="text-primary">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          {!isMobile && (
            <Button variant="ghost" size="icon" asChild className="text-primary">
              <Link href="/favorites">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favorites</span>
              </Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" asChild className="relative text-primary">
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          {!user ? (
            <Button variant="ghost" size="icon" asChild className="text-primary">
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background">
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
