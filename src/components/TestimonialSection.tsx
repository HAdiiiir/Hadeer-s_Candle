const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Interior Designer",
      content:
        "Hadeer's Candles have become an essential part of my design projects. The quality and attention to detail is unmatched.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Loyal Customer",
      content:
        "I've been buying these candles for years. The scents are amazing and they last so much longer than other brands I've tried.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Aisha Rahman",
      role: "Gift Shop Owner",
      content:
        "My customers absolutely love Hadeer's Candles. The shaped candles are particularly popular for special occasions.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]
  
  export default function TestimonialSection() {
    return (
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">{testimonial.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{testimonial.role}</p>
                <p className="italic">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  