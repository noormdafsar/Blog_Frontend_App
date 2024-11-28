import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={user ? "/home" : "/"} className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Blog Application</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/home" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Home
                </Link>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {user ? (
              <>
                <Link
                  to="/home"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
