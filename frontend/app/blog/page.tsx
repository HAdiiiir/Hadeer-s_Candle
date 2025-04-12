// app/blog/page.tsx - Candle Care Blog
import { BookOpen } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "The Art of Candle Burning: Maximizing Your Candle's Lifespan",
      excerpt: "Learn proper techniques to extend your candle's burn time and enjoy its fragrance longer.",
      date: "May 15, 2023",
      category: "Care Tips"
    },
    {
      id: 2,
      title: "Soy vs. Beeswax: Choosing the Right Wax for Your Needs",
      excerpt: "Compare the benefits of different candle wax types to find your perfect match.",
      date: "April 2, 2023",
      category: "Materials"
    },
    {
      id: 3,
      title: "Creating the Perfect Ambiance with Scented Candles",
      excerpt: "Discover how to use fragrance to enhance different rooms and occasions.",
      date: "March 10, 2023",
      category: "Lifestyle"
    }
  ]

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-purple-800 mb-2">Candle Care Blog</h1>
      <p className="text-gray-600 mb-8">Expert tips and insights for candle lovers</p>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="border border-purple-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-purple-50 flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-purple-300" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">{post.date}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Button variant="link" className="text-purple-600 p-0 h-auto">
                Read More
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}