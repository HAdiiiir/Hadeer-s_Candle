// components/category-nav.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CategoryNav() {
  const categories = [
    { slug: "all-products", name: "All Products" },
    { slug: "soy-wax", name: "Soy Wax" },
    { slug: "palm-wax", name: "Palm Wax" },
    { slug: "gel-wax", name: "Gel Wax" },
    { slug: "shaped-candles", name: "Shaped Candles" },
    { slug: "cup-candles", name: "Cup Candles" },
    { slug: "bubble-candles", name: "Bubble Candles" }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button key={category.slug} asChild variant="outline">
          <Link href={`/categories/${category.slug}`}>
            {category.name}
          </Link>
        </Button>
      ))}
    </div>
  );
}