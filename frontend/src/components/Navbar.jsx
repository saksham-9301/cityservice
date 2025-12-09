import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function onSearch(e) {
    e.preventDefault()
    console.log('Search for:', query)
  }

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  }

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.nav 
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <motion.div
            custom={0}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
          >
            <a href="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-110 transition-transform">
              CityService
            </a>
          </motion.div>

          {/* Search Bar */}
          <form onSubmit={onSearch} className="hidden md:flex items-center flex-1 max-w-sm mx-6">
            <motion.div className="relative w-full">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                aria-label="Search"
                placeholder="Search services..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#1e40af' }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 font-medium flex items-center gap-2 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </motion.button>
          </form>

          {/* Desktop Navigation Links */}
          <motion.div className="hidden md:flex items-center space-x-4">
            <motion.a
              custom={1}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              href="/help"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
              whileHover={{ x: 2 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Help
            </motion.a>
            
            <motion.a
              custom={2}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              href="/support"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
              whileHover={{ x: 2 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Support
            </motion.a>
            
            <motion.a
              custom={3}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              href="/auth"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1m0-4V7a3 3 0 013-3h6a3 3 0 013 3v4m-6-4h.01" />
              </svg>
              Login / SignUp
            </motion.a>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden pb-4 space-y-3 border-t border-gray-200"
          >
            <form onSubmit={onSearch} className="flex items-center gap-2 mt-3">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search services..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>
            </form>

            <motion.a
              href="/help"
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Help
            </motion.a>

            <motion.a
              href="/support"
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Support
            </motion.a>

            <motion.a
              href="/auth"
              className="flex items-center gap-3 bg-blue-600 text-white px-3 py-2 rounded-lg font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1m0-4V7a3 3 0 013-3h6a3 3 0 013 3v4m-6-4h.01" />
              </svg>
              Login / SignUp
            </motion.a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
