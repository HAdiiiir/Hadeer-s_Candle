"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { products } from "../data"
import type { Product } from "../types"

export default function SearchPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)

      // Simulate search delay
      setTimeout(() => {
        const results = products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        setSearchResults(results)
        setIsSearching(false)
      }, 500)
    }
  }

  // Clear results when query is empty
  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults([])
    }
  }, [searchQuery])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Products</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex w-full max-w-2xl mx-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for candles..."
              className="w-full px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-r-md flex items-center"
            disabled={isSearching}
          >
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
              className="h-5 w-5 mr-2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            Search
          </button>
        </div>
      </form>

      {/* Search Results */}
      <div>
        {isSearching ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600 mx-auto mb-4"></div>
            <p>Searching...</p>
          </div>
        ) : searchQuery && searchResults.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold mb-4">
              {searchResults.length} {searchResults.length === 1 ? "result" : "results"} for "{searchQuery}"
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No results found for "{searchQuery}"</h2>
            <p className="text-gray-600 mb-4">Try a different search term or browse our products</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md"
            >
              Browse All Products
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Popular Searches</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {["Gel Wax", "Soy Candle", "Shaped Candles", "Wedding", "Gift"].map((term) => (
                <button
                  key={term}
                  className="border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50"
                  onClick={() => {
                    setSearchQuery(term)
                    handleSearch(new Event("submit") as any)
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

