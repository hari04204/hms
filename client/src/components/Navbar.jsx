import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === '/landing';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/landing");
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-white shadow-lg" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to={isLandingPage ? "/landing" : "/dashboard"} className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-blue-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-label="MediCare Logo"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            <h1 className="text-2xl font-bold text-blue-900">MediCare</h1>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-900 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-900 transition font-medium">
                  Dashboard
                </Link>
                <Link to="/patients" className="text-gray-700 hover:text-blue-900 transition font-medium">
                  Patients
                </Link>
                <Link to="/appointments" className="text-gray-700 hover:text-blue-900 transition font-medium">
                  Appointments
                </Link>
                <Link to="/staff" className="text-gray-700 hover:text-blue-900 transition font-medium">
                  Staff
                </Link>
                <Link to="/inventory" className="text-gray-700 hover:text-blue-900 transition font-medium">
                  Inventory
                </Link>
                <Link to="/billing" className="text-gray-700 hover:text-blue-900 transition font-medium">
                  Billing
                </Link>
                <Link to="/reports" className="text-gray-700 hover:text-blue-900 transition font-medium">
                  Reports
                </Link>
                <Link to="/settings" className="text-gray-700 hover:text-blue-900 transition font-medium">
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-blue-900 transition font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/landing" className="text-gray-700 hover:text-blue-900 transition font-medium">
                  Home
                </Link>
                <Link to="/login" className="text-gray-700 hover:text-blue-900 transition font-medium">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-blue-900">
                  Dashboard
                </Link>
                <Link to="/patients" className="block px-3 py-2 text-gray-700 hover:text-blue-900">
                  Patients
                </Link>
                <Link to="/appointments" className="block px-3 py-2 text-gray-700 hover:text-blue-900">
                  Appointments
                </Link>
                <Link to="/staff" className="block px-3 py-2 text-gray-700 hover:text-blue-900">
                  Staff
                </Link>
                <Link to="/inventory" className="block px-3 py-2 text-gray-700 hover:text-blue-900">
                  Inventory
                </Link>
                <Link to="/billing" className="block px-3 py-2 text-gray-700 hover:text-blue-900">
                  Billing
                </Link>
                <Link to="/reports" className="block px-3 py-2 text-gray-700 hover:text-blue-900">
                  Reports
                </Link>
                <Link to="/settings" className="block px-3 py-2 text-gray-700 hover:text-blue-900">
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/landing" className="block px-3 py-2 text-gray-700 hover:text-blue-900">
                  Home
                </Link>
                <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-blue-900">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-white bg-blue-900 rounded-lg hover:bg-blue-800"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
