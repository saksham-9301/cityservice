import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getUserBookings, getCurrentUser, isLoggedIn } from '../services/apiService';

export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn()) {
      navigate('/auth');
      return;
    }

    const currentUser = getCurrentUser();
    setUser(currentUser);
    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getUserBookings();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load bookings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Dashboard
          </h1>
          {user && (
            <p className="text-gray-600">
              Welcome back, <span className="font-semibold">{user.name}</span>!
            </p>
          )}
        </motion.div>

        {/* User Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {/* Total Bookings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-gray-600 text-sm font-semibold mb-2">
              Total Bookings
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {bookings.length}
            </div>
          </div>

          {/* Pending Bookings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-gray-600 text-sm font-semibold mb-2">
              Pending
            </div>
            <div className="text-3xl font-bold text-yellow-600">
              {bookings.filter((b) => b.status === 'pending').length}
            </div>
          </div>

          {/* Completed Bookings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-gray-600 text-sm font-semibold mb-2">
              Completed
            </div>
            <div className="text-3xl font-bold text-green-600">
              {bookings.filter((b) => b.status === 'completed').length}
            </div>
          </div>
        </motion.div>

        {/* Bookings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>

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

          {/* Bookings List */}
          {!loading && bookings.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {bookings.map((booking) => (
                <motion.div
                  key={booking._id}
                  variants={itemVariants}
                  whileHover={{ boxShadow: '0 20px 25px rgba(0,0,0,0.1)' }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      {/* Provider Info */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {booking.providerId?.userId?.name ||
                            'Service Provider'}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          <span className="font-semibold">Service:</span>{' '}
                          {booking.providerId?.categoryId?.name ||
                            'General Service'}
                        </p>
                        <p className="text-gray-600 mb-2">
                          <span className="font-semibold">Price:</span> $
                          {booking.providerId?.price || 0}/hour
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Contact:</span>{' '}
                          {booking.providerId?.userId?.phone ||
                            'Not available'}
                        </p>
                      </div>

                      {/* Booking Details */}
                      <div>
                        <p className="text-gray-600 mb-2">
                          <span className="font-semibold">Booking Date:</span>{' '}
                          {new Date(booking.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600 mb-2">
                          <span className="font-semibold">Time Slot:</span>{' '}
                          {booking.timeSlot}
                        </p>
                        <div className="mt-4">
                          <span
                            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status?.charAt(0).toUpperCase() +
                              booking.status?.slice(1) || 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200">
                      Booking ID: {booking._id?.slice(-8)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && bookings.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow-md p-12 text-center"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-gray-600 text-lg mb-4">
                No bookings yet
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/providers')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                Browse Providers
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
