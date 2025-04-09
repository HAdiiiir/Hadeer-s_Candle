import Image from "next/image"
import { Star } from "lucide-react"

// Sample testimonial data
const testimonials = [
  {
    id: "1",
    name: "Sarah Ahmed",
    avatar: "/placeholder.svg?height=100&width=100",
    testimonial:
      "The candles are absolutely beautiful and smell amazing. The gel wax candles create such a lovely ambiance in my living room.",
    rating: 5,
  },
  {
    id: "2",
    name: "Mohamed Hassan",
    avatar: "/placeholder.svg?height=100&width=100",
    testimonial:
      "I bought the shaped candles as gifts and everyone loved them! The quality is excellent and they burn evenly.",
    rating: 5,
  },
  {
    id: "3",
    name: "Nour Ibrahim",
    avatar: "/placeholder.svg?height=100&width=100",
    testimonial:
      "The soy wax candles are my favorite. They're eco-friendly and the scent lasts for a long time. Will definitely buy again!",
    rating: 4,
  },
  {
    id: "4",
    name: "Layla Mostafa",
    avatar: "/placeholder.svg?height=100&width=100",
    testimonial:
      "I’m obsessed with the decorative candles! They’re not only beautifully crafted but also add a touch of elegance to every room.",
    rating: 5,
  },
  {
    id: "5",
    name: "Khaled Nabil",
    avatar: "/placeholder.svg?height=100&width=100",
    testimonial:
      "The fragrance is so strong and refreshing! I light one of the soy candles and the whole room smells amazing for hours.",
    rating: 5,
  },
  {
    id: "6",
    name: "Rania Adel",
    avatar: "/placeholder.svg?height=100&width=100",
    testimonial:
      "I got the crystal gel candles and they are next-level gorgeous. The crystals inside give such a unique and magical vibe — I’ve never seen anything like it!",
    rating: 5,
  },
  {
    id: "7",
    name: "Ahmed Samir",
    avatar: "/placeholder.svg?height=100&width=100",
    testimonial:
      "The palm wax candles are truly special. They have a rustic, textured look and a soft scent that feels so natural and calming.",
    rating: 4,
  },
  {
    id: "8",
    name: "Yasmin Tarek",
    avatar: "/placeholder.svg?height=100&width=100",
    testimonial:
      "I couldn’t believe how beautiful the crystal details looked inside the candles! It’s like having a piece of art glowing in your space.",
    rating: 5,
  },
]

export function TestimonialSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-purple-600">What Our Customers Say</h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-purple-800">{testimonial.name}</h3>
                  <div className="flex">
                    {Array(testimonial.rating)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-purple-600 text-purple-600" />
                      ))}
                    {Array(5 - testimonial.rating)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-gray-300" />
                      ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-600 italic">{testimonial.testimonial}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
