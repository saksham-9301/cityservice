import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden bg-black">
      {/* Animated background elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-10 right-10 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-10 left-10 w-60 h-60 bg-purple-500 rounded-full opacity-10 blur-3xl"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Ready to Get Started?
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="block bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Book Your Service Today
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto"
          >
            Join thousands of happy customers. Trusted professionals at your doorstep within 24 hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
            >
              Explore Services
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08, backgroundColor: 'rgba(100, 116, 139, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border-2 border-slate-500 text-white font-bold rounded-xl hover:border-blue-400 transition-all duration-300 text-lg"
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-3 gap-6"
          >
            {[
              { icon: '✓', text: '1000+ Happy Customers' },
              { icon: '⭐', text: '4.9/5 Average Rating' },
              { icon: '🚀', text: '24-Hour Service' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <motion.div className="text-3xl mb-2">{item.icon}</motion.div>
                <p className="text-gray-300 font-medium">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
