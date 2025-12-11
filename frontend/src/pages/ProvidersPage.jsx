import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProviders } from '../services/apiService';
import BookingModal from '../components/BookingModal';

export default function ProvidersPage() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getProviders();
      setProviders(data);
    } catch (err) {
      setError('Failed to load providers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (provider) => {
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Service Providers
          </h1>
          <p className="text-gray-600 text-lg">
            Find trusted professionals for your service needs
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Providers List */}
        {!loading && providers.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {providers.map((provider) => (
              <motion.div
                key={provider._id}
                variants={itemVariants}
                whileHover={{ boxShadow: '0 20px 25px rgba(0,0,0,0.1)' }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Provider Info */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {provider.userId?.name || 'Service Provider'}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Category:</span>{' '}
                        {provider.categoryId?.name || 'General Service'}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Experience:</span>{' '}
                        {provider.experience || 'Not specified'}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Contact:</span>{' '}
                        {provider.userId?.phone || 'Not available'}
                      </p>
                    </div>

                    {/* Price & Rating */}
                    <div className="flex flex-col justify-center items-center border-l border-r border-gray-200 py-4">
                      <div className="text-center">
                        <p className="text-gray-600 text-sm mb-2">Price per hour</p>
                        <p className="text-3xl font-bold text-blue-600 mb-4">
                          ${provider.price || 0}
                        </p>
                        <div className="flex items-center justify-center gap-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>
                                {i < Math.round(provider.rating || 0) ? '★' : '☆'}
                              </span>
                            ))}
                          </div>
                          <span className="text-gray-600 text-sm">
                            ({provider.rating || 0}/5)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description & Action */}
                    <div className="flex flex-col justify-between">
                      <p className="text-gray-600 mb-4">
                        {provider.description || 'Professional service provider'}
                      </p>

                      {/* Availability */}
                      {provider.availability && provider.availability.length > 0 && (
                        <div className="mb-4">
                          <p className="font-semibold text-gray-900 mb-2">
                            Available:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {provider.availability.map((slot, idx) => (
                              <span
                                key={idx}
                                className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full"
                              >
                                {slot.day}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Book Now Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBookNow(provider)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && providers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p className="text-gray-600 text-lg">No providers available</p>
          </motion.div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedProvider && (
        <BookingModal
          provider={selectedProvider}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedProvider(null);
          }}
          onBookingSuccess={() => {
            setShowBookingModal(false);
            setSelectedProvider(null);
          }}
        />
      )}
    </div>
  );
}
