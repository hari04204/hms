import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isLandingPage, setIsLandingPage] = useState(false);

  useEffect(() => {
    setIsLandingPage(location.pathname === '/');
  }, [location.pathname]);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-8 w-auto">
              <img className="h-8 w-auto" src="/logo.png" alt="Logo" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to={isLandingPage ? "/" : "/dashboard"} className="flex items-center space-x-2">
                  <span className="text-gray-700 hover:text-blue-900 transition font-medium">
                    {isLandingPage ? "Home" : "Dashboard"}
                  </span>
                </Link>
                <Link to="/" className="text-gray-700 hover:text-blue-900 transition font-medium">
                  Home
                </Link>
                <Link to="/" className="text-gray-700 hover:text-blue-900 transition font-medium">
                  About
                </Link>
                <Link to="/" className="text-gray-700 hover:text-blue-900 transition font-medium">
                  Services
                </Link>
                <Link to="/" className="text-gray-700 hover:text-blue-900 transition font-medium">
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative ml-3">
                <div>
                  <Link to="/" className="text-gray-700 hover:text-blue-900 transition font-medium">
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v-2a3 3 0 006 0v2M9 9h12v12" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 