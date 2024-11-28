import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../services/api';
import { useAuth } from '../context/AuthContext'; // Add this import

export const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Add this line

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp(formData);
      // After successful signup, immediately log in the user
      login(response.data.user, response.data.token);
      navigate('/dashboard'); // Navigate directly to dashboard instead of login
    } catch (error) {
      setError(error.response?.data?.message || 'Sign up failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600">Join us today! It only takes a minute</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-sm font-semibold transition-colors duration-200"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium bg-blue-500 hover:bg-blue-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
