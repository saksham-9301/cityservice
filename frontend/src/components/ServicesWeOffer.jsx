import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getCategories } from '../services/apiService'
import { useNavigate } from 'react-router-dom'

// Icon mapping for services
const iconMap = {
  '🧹': 'Cleaning',
  '🔧': 'Plumbing',
  '⚡': 'Electrical',
  '🎨': 'Painting',
  '🪚': 'Carpentry',
  '❄️': 'HVAC',
  '🌿': 'Landscaping',
  '🐜': 'Pest Control'
}

// Color mapping for different service types
const colorMap = {
  'Cleaning': 'from-green-400 to-green-600',
  'Plumbing': 'from-blue-400 to-blue-600',
  'Electrical': 'from-yellow-400 to-yellow-600',
  'Painting': 'from-pink-400 to-pink-600',
  'Carpentry': 'from-indigo-400 to-indigo-600',
  'HVAC': 'from-cyan-400 to-cyan-600',
  'Landscaping': 'from-lime-400 to-lime-600',
  'Pest Control': 'from-red-400 to-red-600'
}

export default function ServicesWeOffer() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const data = await getCategories()
      setServices(data)
    } catch (err) {
      setError('Failed to load services')
      console.error('Error fetching categories:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSeeProviders = (categoryId, categoryName) => {
    navigate(`/providers?category=${categoryId}&name=${categoryName}`)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section className="py-20 bg-linear-to-b from-gray-50 to-white">
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
            Services We <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Offer</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Reliable, certified professionals at your doorstep. Book trusted services in minutes.</p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        {/* Service Cards Grid */}
        {!loading && services.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((s) => (
              <motion.article
                key={s._id}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform transition duration-500 cursor-pointer"
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-5 transition duration-500 pointer-events-none" />

                {/* Card content */}
                <div className="p-8 h-full flex flex-col">
                  {/* Icon section with pulse animation */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br ${colorMap[s.name] || 'from-blue-400 to-blue-600'} group-hover:scale-110 transform transition duration-500 mb-4 text-3xl`}
                  >
                    {s.icon}
                  </motion.div>

                  {/* Content section */}
                  <div className="flex-1">
                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="text-2xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition duration-300"
                    >
                      {s.name}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="text-gray-600 mt-3 leading-relaxed"
                    >
                      {s.description}
                    </motion.p>
                  </div>

                  {/* Footer section - See Providers Button */}
                  <div className="mt-6 pt-4 border-t border-gray-200 group-hover:border-gray-300 transition">
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSeeProviders(s._id, s.name)}
                      className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition duration-300"
                    >
                      See Providers
                    </motion.button>
                  </div>
                </div>

                {/* Bottom accent bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6, origin: 'left' }}
                  className={`h-1 bg-linear-to-r ${colorMap[s.name] || 'from-blue-400 to-blue-600'} transform scale-x-0 group-hover:scale-x-100 transition duration-500 origin-left`}
                />
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && services.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">No services available</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
