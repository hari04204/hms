import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RoleBasedLayout from './components/RoleBasedLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import DoctorDashboard from './pages/doctor/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import PatientDashboard from './pages/patient/Dashboard';
import { loginSuccess } from './redux/slices/authSlice';
import { authAPI } from './services/api';
import { AuthProvider } from './context/AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return <RoleBasedLayout>{children}</RoleBasedLayout>;
};

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Check for token and restore session on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Verify token and get user data
          const response = await authAPI.verifyToken();
          dispatch(loginSuccess(response.data));
        } catch (error) {
          // If token is invalid, clear it
          localStorage.removeItem('token');
        }
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to={`/${user.role}/dashboard`} replace /> : <Landing />} 
          />
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to={`/${user.role}/dashboard`} replace /> : <Login />} 
          />
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to={`/${user.role}/dashboard`} replace /> : <Register />} 
          />
          
          {/* Doctor Routes */}
          <Route
            path="/doctor/dashboard"
            element={
              <PrivateRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </PrivateRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* Patient Routes */}
          <Route
            path="/patient/dashboard"
            element={
              <PrivateRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </PrivateRoute>
            }
          />

          {/* Catch all route - Redirect to landing page or dashboard */}
          <Route 
            path="*" 
            element={
              isAuthenticated 
                ? <Navigate to={`/${user.role}/dashboard`} replace />
                : <Navigate to="/" replace />
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App; 