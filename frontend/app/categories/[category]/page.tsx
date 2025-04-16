// app/categories/[category]/page.tsx
import { CandleProduct } from "@/types";
import { featuredProducts } from "@/data/products";
import ProductCard from "@/components/product-card";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const categoryMap: Record<string, string> = {
  "all-products": "All Products",
  "soy-wax": "Soy Wax",
  "palm-wax": "Palm Wax",
  "gel-wax": "Gel Wax",
  "shaped-candles": "Shaped Candles",
  "cup-candles": "Cup Candles",
  "bubble-candles": "Bubble Candles"
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = categoryMap[params.category];
  
  if (!categoryName) {
    return notFound();
  }

  const filteredProducts = params.category === "all-products" 
    ? featuredProducts 
    : featuredProducts.filter(product => {
        if (params.category === "soy-wax") return product.type === "Soy Wax";
        if (params.category === "palm-wax") return product.type === "Palm Wax";
        if (params.category === "gel-wax") return product.type === "Gel Wax";
        if (params.category === "shaped-candles") return product.type === "Shaped Candle";
        if (params.category === "cup-candles") return product.category === "Cup";
        if (params.category === "bubble-candles") return product.type === "Bubble Candle";
        return false;
      });

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">{categoryName} Collection</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}