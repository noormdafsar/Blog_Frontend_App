import { Link } from "react-router-dom";

export const LandingPage = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Welcome to Our Blog Application
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12">
            Share your thoughts and connect with others
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/login" 
              className="w-full sm:w-auto bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  };
  