import { motion } from 'framer-motion'

const services = [
  {
    id: 1,
    title: 'Cleaning',
    desc: 'Home & office deep cleaning, sanitization and maintenance.',
    color: 'from-green-400 to-green-600',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7c0 3.866 3.134 7 7 7s7-3.134 7-7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7v4m0 0l-3-3m3 3l-3 3" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Plumber',
    desc: 'Fix leaks, installs, drainage and pipe replacement.',
    color: 'from-blue-400 to-blue-600',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v7m0 0l3-3m-3 3l-3-3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 13v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-6" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Electrician',
    desc: 'Wiring, fixtures, power issues and emergency repairs.',
    color: 'from-yellow-400 to-yellow-600',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Painter',
    desc: 'Interior & exterior painting, color consultation.',
    color: 'from-pink-400 to-pink-600',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4a4 4 0 014-4h10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 3l-6 6" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Carpentry',
    desc: 'Custom furniture, repairs and fittings.',
    color: 'from-indigo-400 to-indigo-600',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M6 7v10a2 2 0 002 2h8a2 2 0 002-2V7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v4" />
      </svg>
    ),
  },
   {
    id: 6,
    title: 'Cleaning',
    desc: 'Home & office deep cleaning, sanitization and maintenance.',
    color: 'from-green-400 to-green-600',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7c0 3.866 3.134 7 7 7s7-3.134 7-7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7v4m0 0l-3-3m3 3l-3 3" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Plumber',
    desc: 'Fix leaks, installs, drainage and pipe replacement.',
    color: 'from-blue-400 to-blue-600',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v7m0 0l3-3m-3 3l-3-3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 13v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-6" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Electrician',
    desc: 'Wiring, fixtures, power issues and emergency repairs.',
    color: 'from-yellow-400 to-yellow-600',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Painter',
    desc: 'Interior & exterior painting, color consultation.',
    color: 'from-pink-400 to-pink-600',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4a4 4 0 014-4h10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 3l-6 6" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Carpentry',
    desc: 'Custom furniture, repairs and fittings.',
    color: 'from-indigo-400 to-indigo-600',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M6 7v10a2 2 0 002 2h8a2 2 0 002-2V7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v4" />
      </svg>
    ),
  },
]

export default function ServicesWeOffer() {
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

        {/* Service Cards Grid */}
        <motion.div
          className="grid grid-cols-3 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((s) => (
            <motion.article
              key={s.id}
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
                  className={`flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br ${s.color} group-hover:scale-110 transform transition duration-500 mb-4`}
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
                    {s.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-gray-600 mt-3 leading-relaxed"
                  >
                    {s.desc}
                  </motion.p>
                </div>

                {/* Footer section */}
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-200 group-hover:border-gray-300 transition">
                  <div>
                    <p className="text-sm text-gray-500">Starting at</p>
                    <motion.p
                      whileHover={{ scale: 1.1 }}
                      className="text-xl font-bold text-gray-900"
                    >
                      $20
                    </motion.p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition duration-300"
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>

              {/* Bottom accent bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.6, origin: 'left' }}
                className={`h-1 bg-linear-to-r ${s.color} transform scale-x-0 group-hover:scale-x-100 transition duration-500 origin-left`}
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
