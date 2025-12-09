import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function HeroBanner() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  return (
    <section className="relative h-96 md:h-screen overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=800&fit=crop')`,
        }}
      >
        {/* Dark overlay */}
        <motion.div
          animate={{ opacity: [0.4, 0.45, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-black"
        />
      </div>

      {/* Animated gradient overlay */}
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 bg-linear-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20"
      />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate={animate ? "visible" : "hidden"}
        >
          {/* Animated heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Welcome to{' '}
            <motion.span
              animate={{ backgroundPosition: ['0% center', '100% center'] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%_200%]"
            >
              City Service
            </motion.span>
          </motion.h1>

          {/* Animated subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-gray-100 mb-8 font-light"
          >
            Fast, reliable local professionals at your doorstep
          </motion.p>

          {/* Animated button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.08, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg shadow-xl hover:shadow-2xl transition duration-500 text-lg"
          >
            Explore Services
          </motion.button>

          {/* Animated scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
