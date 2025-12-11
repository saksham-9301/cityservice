import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';

export default function AuthPage() {
  // State to toggle between login and register
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Handle successful login/register
  const handleAuthSuccess = () => {
    // Redirect to home page after successful auth
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Toggle Buttons */}
        <div className="flex gap-4 mb-6 justify-center">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              isLogin
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-300'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              !isLogin
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-300'
            }`}
          >
            Register
          </button>
        </div>

        {/* Show Login or Register Component */}
        {isLogin ? (
          <Login onSuccess={handleAuthSuccess} />
        ) : (
          <Register onSuccess={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}
