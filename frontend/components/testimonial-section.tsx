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
]

export function TestimonialSection() {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers Say</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <div className="flex">
                    {Array(testimonial.rating)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    {Array(5 - testimonial.rating)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-gray-300" />
                      ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-500">{testimonial.testimonial}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

