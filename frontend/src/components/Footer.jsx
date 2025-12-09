import { motion } from 'framer-motion'

export default function Footer() {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 }
    })
  }

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏' },
    { name: 'Facebook', icon: 'f' },
    { name: 'Instagram', icon: '📷' },
  ]

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-gradient-to-b from-gray-900 to-black text-gray-200 mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <motion.div
            custom={0}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
            >
              CityServices
            </motion.h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Fast, reliable local professionals for cleaning, plumbing, electrical, painting and more. Your trusted partner for all home services.
            </p>
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} CityServices. All rights reserved.</p>
          </motion.div>

          {/* Services Links */}
          <motion.div
            custom={1}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-white mb-6 text-lg flex items-center">
              <motion.div className="w-1 h-1 bg-blue-400 rounded-full mr-3" />
              Our Services
            </h4>
            <ul className="space-y-3">
              {['Cleaning', 'Plumbing', 'Electrical', 'Painting', 'Carpentry'].map((service, i) => (
                <motion.li
                  key={service}
                  whileHover={{ x: 5, color: '#3b82f6' }}
                  className="text-gray-400 hover:text-blue-400 transition cursor-pointer"
                >
                  → {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            custom={2}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-white mb-6 text-lg flex items-center">
              <motion.div className="w-1 h-1 bg-purple-400 rounded-full mr-3" />
              Get in Touch
            </h4>
            <motion.a
              href="mailto:support@cityservices.example"
              whileHover={{ x: 5, color: '#60a5fa' }}
              className="block text-gray-400 hover:text-blue-400 transition text-sm mb-3"
            >
              📧 support@cityservices.example
            </motion.a>
            <motion.a
              href="tel:+15551234567"
              whileHover={{ x: 5, color: '#60a5fa' }}
              className="block text-gray-400 hover:text-blue-400 transition text-sm mb-6"
            >
              📞 +1 (555) 123-4567
            </motion.a>

            <div className="flex space-x-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold hover:shadow-lg transition-shadow"
                  title={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent my-8 origin-left"
        />

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-xs text-gray-500"
        >
          <p>Built with ❤️ for your convenience</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
