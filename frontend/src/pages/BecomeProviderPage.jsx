import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createProvider, getCategories, getCurrentUser, isLoggedIn } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

export default function BecomeProviderPage() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: '',
    price: '',
    experience: '',
    description: '',
    availability: [
      { day: 'Monday', timeStart: '09:00', timeEnd: '17:00' },
      { day: 'Tuesday', timeStart: '09:00', timeEnd: '17:00' },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn()) {
      navigate('/auth');
      return;
    }

    // Fetch categories
    fetchCategories();
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updatedAvailability = [...formData.availability];
    updatedAvailability[index][field] = value;
    setFormData({
      ...formData,
      availability: updatedAvailability,
    });
  };

  const addAvailabilitySlot = () => {
    setFormData({
      ...formData,
      availability: [
        ...formData.availability,
        { day: 'Wednesday', timeStart: '09:00', timeEnd: '17:00' },
      ],
    });
  };

  const removeAvailabilitySlot = (index) => {
    setFormData({
      ...formData,
      availability: formData.availability.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate
    if (!formData.categoryId || !formData.price || !formData.experience) {
      setError('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      const user = getCurrentUser();
      const providerData = {
        ...formData,
        userId: user._id,
        price: parseFloat(formData.price),
      };

      const result = await createProvider(providerData);

      if (result._id || result.message?.includes('created')) {
        setSuccess('Profile created successfully!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(result.message || 'Failed to create profile');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Become a Service Provider
          </h1>
          <p className="text-gray-600">
            Create your professional profile and start earning
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Service Category *
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Input */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Hourly Rate ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 50"
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Experience Input */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Experience *
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g., 5 years in plumbing"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description Input */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                About You
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your skills and services..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Availability Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-gray-700 font-semibold">
                  Availability
                </label>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={addAvailabilitySlot}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  + Add Slot
                </motion.button>
              </div>

              {formData.availability.map((slot, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border border-gray-200 rounded bg-gray-50"
                >
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Day
                      </label>
                      <input
                        type="text"
                        value={slot.day}
                        onChange={(e) =>
                          handleAvailabilityChange(index, 'day', e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={slot.timeStart}
                        onChange={(e) =>
                          handleAvailabilityChange(
                            index,
                            'timeStart',
                            e.target.value
                          )
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={slot.timeEnd}
                        onChange={(e) =>
                          handleAvailabilityChange(index, 'timeEnd', e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                  {formData.availability.length > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => removeAvailabilitySlot(index)}
                      className="text-red-600 hover:text-red-700 text-sm font-semibold"
                    >
                      Remove
                    </motion.button>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition disabled:bg-gray-400"
            >
              {loading ? 'Creating Profile...' : 'Create Profile'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
