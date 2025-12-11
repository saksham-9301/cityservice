import { useState } from 'react';
import { motion } from 'framer-motion';
import { createBooking } from '../services/apiService';
import { isLoggedIn } from '../services/apiService';

export default function BookingModal({ provider, onClose, onBookingSuccess }) {
  const [bookingData, setBookingData] = useState({
    date: '',
    timeSlot: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check if user is logged in
    if (!isLoggedIn()) {
      setError('Please login to book a service');
      return;
    }

    // Validate inputs
    if (!bookingData.date || !bookingData.timeSlot) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const result = await createBooking({
        providerId: provider._id,
        date: bookingData.date,
        timeSlot: bookingData.timeSlot,
      });

      if (result._id || result.message?.includes('created')) {
        setSuccess('Booking created successfully!');
        setTimeout(() => {
          onBookingSuccess();
        }, 1500);
      } else {
        setError(result.message || 'Failed to create booking');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Book Service</h2>
          <button
            onClick={onClose}
            className="text-2xl hover:bg-white hover:text-blue-600 rounded-full w-8 h-8 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Provider Info */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">
              {provider.userId?.name || 'Service Provider'}
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              {provider.categoryId?.name || 'Service'}
            </p>
            <p className="text-blue-600 font-semibold mt-2">
              ${provider.price} per hour
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
              {success}
            </div>
          )}

          {/* Booking Form */}
          {!success && (
            <form onSubmit={handleSubmit}>
              {/* Date Input */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleChange}
                  min={minDate}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Time Slot Input */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Time Slot
                </label>
                <input
                  type="text"
                  name="timeSlot"
                  placeholder="e.g., 10:00-11:00 or 2PM-3PM"
                  value={bookingData.timeSlot}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  Format: HH:MM-HH:MM (24-hour) or 2PM-3PM
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition disabled:bg-gray-400"
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </motion.button>
            </form>
          )}

          {/* Cancel Button */}
          {!success && (
            <button
              onClick={onClose}
              className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition"
            >
              Cancel
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
