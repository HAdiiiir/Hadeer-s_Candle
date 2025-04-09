import { ProductCard } from "@/components/product-card"

interface Product {
  _id: string
  name: string
  price: number
  type: string
  size?: string
  fragrance: string
  description: string
  waxType: 'Soy' | 'Palm' | 'Gel' | 'Paraffin'
  category: 'Cup' | 'Molded' | 'Bubble' | 'Special'
  images: string[]
}

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

export function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-lg border p-4 shadow-sm">
            <div className="aspect-square animate-pulse bg-gray-200" />
            <div className="mt-4 h-4 w-3/4 animate-pulse bg-gray-200" />
            <div className="mt-2 h-4 w-1/2 animate-pulse bg-gray-200" />
            <div className="mt-4 h-6 w-1/4 animate-pulse bg-gray-200" />
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-center text-gray-500">No products found.</p>
      </div>
    )
  }

  // Sample product data with all requested details
  const enhancedProducts = products.map(product => {
    // Add detailed descriptions based on product type
    let detailedDescription = product.description;
    
    if (!detailedDescription) {
      switch(product.category) {
        case 'Cup':
          detailedDescription = `Premium ${product.waxType} wax candle in a glass cup. ${product.size} size provides approximately ${getBurnTime(product.size)} hours of burn time. Perfect for ${getBestUseCase(product.fragrance)}.`;
          break;
        case 'Molded':
          detailedDescription = `Artisan ${product.waxType} wax candle in ${product.name.toLowerCase()} shape. Hand-poured with care, this decorative candle also provides wonderful fragrance. Ideal for ${getBestUseCase(product.fragrance)}.`;
          break;
        case 'Bubble':
          detailedDescription = `Unique bubble design ${product.waxType} wax candle. The distinctive texture creates beautiful light patterns when lit. ${product.size} size with ${getBurnTime(product.size)} hours burn time.`;
          break;
        case 'Special':
          detailedDescription = `Special edition ${product.name.toLowerCase()} candle made with ${product.waxType} wax. A show-stopping piece that combines art and aroma. Perfect for ${getBestUseCase(product.fragrance)}.`;
          break;
      }
    }

    return {
      ...product,
      description: detailedDescription,
      fullDetails: getFullDetails(product)
    }
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">Showing {products.length} products</p>
        <select className="rounded-md border border-indigo-300 px-3 py-1 text-sm focus:ring-indigo-500">
          <option>Sort by: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
          <option>Size</option>
          <option>Fragrance</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {enhancedProducts.map((product) => (
          <div key={product._id} className="group relative">
            <ProductCard product={product} />
            
            {/* Expanded details section */}
            <div className="mt-4 space-y-2">
              <div className="flex flex-wrap gap-2">
                {product.size && (
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                    Size: {product.size}
                  </span>
                )}
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
                  {product.waxType} Wax
                </span>
                <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-600">
                  {product.fragrance}
                </span>
              </div>
              
              <p className="mt-2 text-sm text-gray-700">
                {product.description}
              </p>
              
              {/* Additional details for cup candles */}
              {product.category === 'Cup' && (
                <div className="mt-3 text-sm">
                  <h4 className="font-medium text-indigo-600">Cup Candle Details:</h4>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>Burn time: {getBurnTime(product.size)} hours</li>
                    <li>Clean-burning {product.waxType.toLowerCase()} wax</li>
                    <li>Premium fragrance oils</li>
                    <li>Reusable glass container</li>
                  </ul>
                </div>
              )}
              
              {/* Additional details for molded candles */}
              {product.category === 'Molded' && (
                <div className="mt-3 text-sm">
                  <h4 className="font-medium text-indigo-600">Molded Candle Details:</h4>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>Hand-poured artisan design</li>
                    <li>Decorative when unlit</li>
                    <li>Medium burn time (approx. 25-30 hours)</li>
                    <li>Best displayed on a heat-resistant surface</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper functions
function getBurnTime(size: string | undefined): string {
  if (!size) return "25-30";
  const sizeNum = parseInt(size);
  if (sizeNum <= 65) return "20-25";
  if (sizeNum <= 165) return "35-40";
  if (sizeNum <= 275) return "50-55";
  return "60-65";
}

function getBestUseCase(fragrance: string): string {
  const floral = ["Lavender", "Rose", "Jasmine"];
  const fresh = ["Citrus", "Ocean", "Cotton"];
  const warm = ["Vanilla", "Amber", "Cinnamon"];
  
  if (floral.some(f => fragrance.includes(f))) return "bedrooms and relaxation spaces";
  if (fresh.some(f => fragrance.includes(f))) return "bathrooms and living areas";
  if (warm.some(f => fragrance.includes(f))) return "living rooms and cozy spaces";
  return "any room in your home";
}

function getFullDetails(product: Product): string {
  return `
    Name: ${product.name}
    Type: ${product.type}
    Category: ${product.category}
    Wax: ${product.waxType}
    Size: ${product.size || 'N/A'}
    Fragrance: ${product.fragrance}
    Description: ${product.description}
    Price: EGP ${product.price}
  `;
}
