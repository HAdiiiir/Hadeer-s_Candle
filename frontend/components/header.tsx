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
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4 md:px-6">
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-lg font-medium transition-colors hover:text-primary">
                  Home
                </Link>
                <Link href="/products" className="text-lg font-medium transition-colors hover:text-primary">
                  Products
                </Link>
                <Link
                  href="/products?category=cups"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Cup Candles
                </Link>
                <Link
                  href="/products?category=shaped"
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
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">Hadeer&apos;s Candle</span>
        </Link>
        {!isMobile && (
          <nav className="flex flex-1 items-center gap-6 text-sm">
            <Link href="/" className="font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/products" className="font-medium transition-colors hover:text-primary">
              Products
            </Link>
            <Link href="/products?category=cups" className="font-medium transition-colors hover:text-primary">
              Cup Candles
            </Link>
            <Link href="/products?category=shaped" className="font-medium transition-colors hover:text-primary">
              Shaped Candles
            </Link>
          </nav>
        )}
        <div className="flex flex-1 items-center justify-end gap-2">
          {isSearchOpen ? (
            <div className="flex items-center">
              <Input type="search" placeholder="Search..." className="w-[200px] md:w-[300px]" />
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          {!isMobile && (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/favorites">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favorites</span>
              </Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          {!user ? (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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

