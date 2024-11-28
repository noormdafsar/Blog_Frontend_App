import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as loginApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginApi(formData);
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Please sign in to your account</p>
        </div>
        
        {error && (
          <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-semibold transition-colors duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
