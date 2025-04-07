import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
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
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-blue-900 font-medium hover:text-blue-700 transition">
            Home
          </Link>
          <Link to="/features" className="text-gray-700 hover:text-blue-900 transition">
            Features
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-900 transition">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-900 transition">
            Contact
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 text-blue-900 hover:bg-blue-50 rounded-lg transition"
          >
            Login
          </Link>
          <Link
            to="/register2"
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
