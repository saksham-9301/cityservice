import { motion } from 'framer-motion'
import { useState } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Homeowner',
    text: 'The cleaning team was professional and thorough. They transformed my home in just 3 hours!',
    rating: 5,
    image: '👩‍💼'
  },
  {
    id: 2,
    name: 'Mike Chen',
    role: 'Business Owner',
    text: 'Exceptional plumbing service. Fixed the leak and provided preventative advice. Highly recommend!',
    rating: 5,
    image: '👨‍💼'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Apartment Dweller',
    text: 'The electrician was quick, efficient, and explained everything clearly. Best service ever!',
    rating: 5,
    image: '👩‍🦰'
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Homeowner',
    text: 'Painters did an amazing job redecorating my living room. Quality work at great prices.',
    rating: 5,
    image: '👨‍🦱'
  },
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Homeowner',
    text: 'The cleaning team was professional and thorough. They transformed my home in just 3 hours!',
    rating: 5,
    image: '👩‍💼'
  },
  {
    id: 2,
    name: 'Mike Chen',
    role: 'Business Owner',
    text: 'Exceptional plumbing service. Fixed the leak and provided preventative advice. Highly recommend!',
    rating: 5,
    image: '👨‍💼'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Apartment Dweller',
    text: 'The electrician was quick, efficient, and explained everything clearly. Best service ever!',
    rating: 5,
    image: '👩‍🦰'
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Homeowner',
    text: 'Painters did an amazing job redecorating my living room. Quality work at great prices.',
    rating: 5,
    image: '👨‍🦱'
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section className="py-20 bg-linear-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            What Our Customers <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Say</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Join thousands of satisfied customers who trust CityServices</p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)' }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-4xl mr-3"
                >
                  {testimonial.image}
                </motion.div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="text-yellow-400 text-lg"
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">{testimonial.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
