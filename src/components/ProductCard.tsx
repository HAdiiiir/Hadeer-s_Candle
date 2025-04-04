import { Link } from "react-router-dom"
import type { Product } from "../types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product.id}`} className="block relative h-64 overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-rose-600 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2">{product.category}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">EGP {product.price}</span>
          <button className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded-md text-sm flex items-center">
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
              className="h-4 w-4 mr-1"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <path d="M3 6h18"></path>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>{" "}
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

