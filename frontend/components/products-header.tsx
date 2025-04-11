interface ProductsHeaderProps {
  category?: string | null
  type?: string | null
}

export function ProductsHeader({ category, type }: ProductsHeaderProps) {
  let title = "All Products"
  let description = "Browse our collection of handcrafted candles made with premium materials."

  if (category === "Cup") {
    title = "Cup Candles"
    description = "Discover our elegant cup candles in various wax types and fragrances, perfect for any room."
  } else if (category === "Molded") {
    title = "Shaped Candles"
    description = "Explore our unique shaped candles, handcrafted with care for special occasions and gifts."
  } else if (type) {
    title = `${type} Candles`
    description = `Browse our collection of ${type.toLowerCase()} candles, crafted with premium materials.`
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-500">{description}</p>
    </div>
  )
}
