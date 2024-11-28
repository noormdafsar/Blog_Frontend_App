import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import { EditPost } from './pages/EditPost';
import { LandingPage } from './pages/LandingPage';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />

            {/* Protected routes */}
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/dashboard/edit/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
