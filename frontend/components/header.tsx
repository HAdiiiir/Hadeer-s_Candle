"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Menu, Search, ShoppingBag, User, X, LogOut, ChevronDown } from "lucide-react"
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
import { useFavorites } from "@/lib/favorites-context"
import { cn } from "@/lib/utils"

// New Animated Candle Logo Component
function AnimatedCandleLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-8 w-8", className)}>
      {/* Candle Flame */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <div className="relative h-4 w-3">
          {/* Flame core */}
          <div className="absolute inset-0 bg-yellow-300 rounded-full blur-[1px] animate-pulse" />
          {/* Flame outer */}
          <div className="absolute inset-0 bg-yellow-200 rounded-full opacity-70 animate-ping" style={{ animationDuration: '2s' }} />
        </div>
      </div>
      
      {/* Candle Wax */}
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-6 h-5 bg-gradient-to-b from-purple-500 to-purple-700 rounded-sm">
        {/* Wax drips */}
        <div className="absolute -left-0.5 top-1 w-1 h-1 bg-purple-400 rounded-full" />
        <div className="absolute -right-0.5 top-2 w-1 h-1 bg-purple-400 rounded-full" />
        <div className="absolute left-0.5 top-3 w-1 h-1 bg-purple-300 rounded-full" />
      </div>
      
      {/* Candle Base */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-7 h-2 bg-purple-800 rounded-b-full" />
    </div>
  )
}

export function Header() {
  const isMobile = useMobile()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, logout } = useAuth()
  const { items } = useCart()
  const { favorites } = useFavorites()

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)
  const favoriteItemCount = favorites.length

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-purple-50/90 backdrop-blur-md shadow-sm">
      <div className="container flex h-20 items-center px-4 md:px-6">
        {/* Mobile Menu */}
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 text-purple-600 hover:bg-purple-100">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-purple-50/95">
              <div className="flex flex-col items-center mb-8 mt-4">
                <Link href="/" className="flex items-center space-x-2 group">
                  <AnimatedCandleLogo className="h-8 w-8" />
                  <span className="brand-logo text-2xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors">
                    Hadeer's Candle
                  </span>
                </Link>
              </div>
              <nav className="flex flex-col gap-4 px-4">
                <Link 
                  href="/" 
                  className="text-lg font-medium text-gray-800 hover:text-purple-600 transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-purple-200 rounded-full mr-3"></span>
                  Home
                </Link>
                <Link 
                  href="/products" 
                  className="text-lg font-medium text-gray-800 hover:text-purple-600 transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-purple-200 rounded-full mr-3"></span>
                  All Products
                </Link>
                <Link
                  href="/products?category=Cup"
                  className="text-lg font-medium text-gray-800 hover:text-purple-600 transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-purple-200 rounded-full mr-3"></span>
                  Cup Candles
                </Link>
                <Link
                  href="/products?category=Molded"
                  className="text-lg font-medium text-gray-800 hover:text-purple-600 transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-purple-200 rounded-full mr-3"></span>
                  Shaped Candles
                </Link>
                {user && (
                  <>
                    <Link 
                      href="/orders" 
                      className="text-lg font-medium text-gray-800 hover:text-purple-600 transition-colors flex items-center"
                    >
                      <span className="w-2 h-2 bg-purple-200 rounded-full mr-3"></span>
                      My Orders
                    </Link>
                    <Link 
                      href="/favorites" 
                      className="text-lg font-medium text-gray-800 hover:text-purple-600 transition-colors flex items-center"
                    >
                      <span className="w-2 h-2 bg-purple-200 rounded-full mr-3"></span>
                      My Favorites
                      {favoriteItemCount > 0 && (
                        <span className="ml-2 text-xs bg-purple-600 text-white rounded-full h-5 w-5 flex items-center justify-center">
                          {favoriteItemCount}
                        </span>
                      )}
                    </Link>
                  </>
                )}
                {!user ? (
                  <Link 
                    href="/login" 
                    className="text-lg font-medium text-gray-800 hover:text-purple-600 transition-colors flex items-center"
                    >
                    <span className="w-2 h-2 bg-purple-200 rounded-full mr-3"></span>
                    Login
                  </Link>
                ) : (
                  <Button 
                    variant="ghost" 
                    onClick={logout} 
                    className="justify-start px-0 text-lg font-medium text-gray-800 hover:text-purple-600"
                  >
                    <span className="w-2 h-2 bg-purple-200 rounded-full mr-3"></span>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        ) : null}

        {/* Brand Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2 group">
          <AnimatedCandleLogo className="h-8 w-8" />
          <span className="brand-logo text-2xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors hidden sm:block">
            Hadeer's Candle
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-800 hover:text-purple-600 hover:bg-purple-100/50 gap-1">
                  Shop <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-white border border-purple-100 shadow-lg rounded-lg p-2">
                <DropdownMenuItem asChild>
                  <Link href="/products" className="text-gray-800 hover:text-purple-600 hover:bg-purple-50">
                    All Products
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products?category=Cup" className="text-gray-800 hover:text-purple-600 hover:bg-purple-50">
                    Cup Candles
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products?category=Molded" className="text-gray-800 hover:text-purple-600 hover:bg-purple-50">
                    Shaped Candles
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products?category=Special" className="text-gray-800 hover:text-purple-600 hover:bg-purple-50">
                    Special Editions
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              href="/about" 
              className="text-sm font-medium text-gray-800 hover:text-purple-600 transition-colors"
            >
              Our Story
            </Link>
            <Link 
              href="/blog" 
              className="text-sm font-medium text-gray-800 hover:text-purple-600 transition-colors"
            >
              Candle Care
            </Link>
            <Link 
              href="/contact" 
              className="text-sm font-medium text-gray-800 hover:text-purple-600 transition-colors"
            >
              Contact
            </Link>
          </nav>
        )}

        {/* Right Side Actions */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {/* Search Bar */}
          {isSearchOpen ? (
            <div className="flex items-center animate-in fade-in slide-in-from-right-8">
              <Input
                type="search"
                placeholder="Search candles..."
                className="w-[180px] md:w-[240px] border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-white"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(false)} 
                className="text-purple-600 hover:bg-purple-100"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSearchOpen(true)} 
              className="text-purple-600 hover:bg-purple-100"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          {/* Favorites */}
          <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="text-purple-600 hover:bg-purple-100 relative"
          >
            <Link href="/favorites">
              <Heart className="h-5 w-5" />
              {favoriteItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs text-white font-medium">
                  {favoriteItemCount > 9 ? "9+" : favoriteItemCount}
                </span>
              )}
              <span className="sr-only">Favorites</span>
            </Link>
          </Button>

          {/* Cart */}
          <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="text-purple-600 hover:bg-purple-100 relative"
          >
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs text-white font-medium">
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          {/* User Account */}
          {!user ? (
            <Button 
              variant="ghost" 
              size="icon" 
              asChild 
              className="text-purple-600 hover:bg-purple-100"
            >
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-purple-600 hover:bg-purple-100"
                >
                  <div className="relative">
                    <User className="h-5 w-5" />
                    <span className="absolute -bottom-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
                    </span>
                  </div>
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="bg-white border border-purple-100 shadow-lg rounded-lg p-2 min-w-[200px]"
              >
                <div className="px-2 py-1.5 text-sm font-medium text-gray-800">
                  {user.email}
                </div>
                <DropdownMenuSeparator className="bg-purple-100" />
                <DropdownMenuItem asChild className="focus:bg-purple-50 focus:text-purple-600">
                  <Link href="/account" className="text-gray-800">
                    My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-purple-50 focus:text-purple-600">
                  <Link href="/orders" className="text-gray-800">
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-purple-50 focus:text-purple-600">
                  <Link href="/favorites" className="text-gray-800">
                    My Favorites
                    {favoriteItemCount > 0 && (
                      <span className="ml-2 text-xs bg-purple-600 text-white rounded-full h-4 w-4 flex items-center justify-center">
                        {favoriteItemCount}
                      </span>
                    )}
                  </Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem asChild className="focus:bg-purple-50 focus:text-purple-600">
                    <Link href="/admin" className="text-gray-800">
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator className="bg-purple-100" />
                <DropdownMenuItem 
                  onClick={logout} 
                  className="text-gray-800 focus:bg-purple-50 focus:text-purple-600"
                >
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