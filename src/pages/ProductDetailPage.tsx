"use client"

import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { products } from "../data"

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const product = products.find((p) => p.id === id)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    // Product not found, redirect to products page
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-4">The product you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md"
        >
          Browse Products
        </button>
      </div>
    )
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const addToCart = () => {
    // In a real app, this would add the product to the cart
    alert(`Added ${quantity} ${product.name} to cart`)
  }

  // Find related products (same category but different product)
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm">
        <Link to="/" className="text-gray-500 hover:text-rose-600">
          Home
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 mx-2 text-gray-400"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <Link to="/products" className="text-gray-500 hover:text-rose-600">
          Products
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 mx-2 text-gray-400"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="relative aspect-square">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-rose-600 mb-4">EGP {product.price}</p>
          <div className="border-t border-b py-4 my-6">
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Category:</span>{" "}
                {product.category === "cup" ? "Cup Candle" : "Shaped Candle"}
              </p>
              {product.waxType && (
                <p>
                  <span className="font-medium">Wax Type:</span>{" "}
                  {product.waxType === "gel" ? "Gel Wax" : product.waxType === "palm" ? "Palm Wax" : "Soy Wax"}
                </p>
              )}
              {product.weight && (
                <p>
                  <span className="font-medium">Weight:</span> {product.weight}g
                </p>
              )}
              {product.shape && (
                <p>
                  <span className="font-medium">Shape:</span> {product.shape}
                </p>
              )}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="mr-4 font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button
                onClick={decrementQuantity}
                className="px-3 py-2 border-r hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M5 12h14"></path>
                </svg>
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button onClick={incrementQuantity} className="px-3 py-2 border-l hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M12 5v14"></path>
                  <path d="M5 12h14"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-md text-lg flex items-center justify-center"
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
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <path d="M3 6h18"></path>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>{" "}
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} to={`/products/${relatedProduct.id}`}>
                <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-rose-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="font-bold">EGP {relatedProduct.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

