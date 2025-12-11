import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { isLoggedIn, getCurrentUser } from '../services/apiService'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userLoggedIn, setUserLoggedIn] = useState(isLoggedIn())
  const [user, setUser] = useState(getCurrentUser())

  // Update navbar when localStorage changes (after login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      setUserLoggedIn(isLoggedIn())
      setUser(getCurrentUser())
    }

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange)
    
    // Also check on component mount
    handleStorageChange()

    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

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
            <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-110 transition-transform no-underline">
              CityService
            </Link>
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
          <motion.div className="hidden md:flex items-center space-x-2">
            <Link
              to="/categories"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50 no-underline"
            >
              Categories
            </Link>
            
            <Link
              to="/providers"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50 no-underline"
            >
              Providers
            </Link>

            {userLoggedIn && user && (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50 no-underline"
                >
                  Dashboard
                </Link>
                
                <Link
                  to="/become-provider"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50 no-underline"
                >
                  Become Provider
                </Link>
              </>
            )}
            
            <motion.div
              custom={3}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
            >
              {userLoggedIn ? (
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Hi, {user?.name?.split(' ')[0]}</span>
                  <button
                    onClick={() => {
                      localStorage.removeItem('authToken')
                      localStorage.removeItem('user')
                      setUserLoggedIn(false)
                      setUser(null)
                      window.dispatchEvent(new Event('storage'))
                    }}
                    className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold p-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                    title="Logout"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1m0-4V7a3 3 0 013-3h4a3 3 0 013 3v4" />
                    </svg>
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all no-underline"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1m0-4V7a3 3 0 013-3h6a3 3 0 013 3v4m-6-4h.01" />
                  </svg>
                  Login / SignUp
                </Link>
              )}
            </motion.div>
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

            <Link
              to="/categories"
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 no-underline"
            >
              Categories
            </Link>

            <Link
              to="/providers"
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 no-underline"
            >
              Providers
            </Link>

            {userLoggedIn && user && (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 no-underline"
                >
                  Dashboard
                </Link>

                <Link
                  to="/become-provider"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 no-underline"
                >
                  Become Provider
                </Link>
              </>
            )}

            {userLoggedIn ? (
              <button
                onClick={() => {
                  localStorage.removeItem('authToken')
                  localStorage.removeItem('user')
                  setUserLoggedIn(false)
                  setUser(null)
                  window.dispatchEvent(new Event('storage'))
                }}
                className="w-full flex items-center justify-center bg-red-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-red-700"
                title="Logout"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1m0-4V7a3 3 0 013-3h4a3 3 0 013 3v4" />
                </svg>
              </button>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-3 bg-blue-600 text-white px-3 py-2 rounded-lg font-medium no-underline"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1m0-4V7a3 3 0 013-3h6a3 3 0 013 3v4m-6-4h.01" />
                </svg>
                Login / SignUp
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
