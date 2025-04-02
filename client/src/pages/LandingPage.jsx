import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function LandingPage() {
  useEffect(() => {
    const features = document.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, { threshold: 0.1 });

    features.forEach(feature => observer.observe(feature));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <h1 className="text-2xl font-bold text-blue-900">MediCare</h1>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-blue-900 font-medium">Home</Link>
            <Link to="/features" className="text-gray-600 hover:text-blue-900 transition">Features</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-900 transition">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-900 transition">Contact</Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/login" className="px-4 py-2 text-blue-900 hover:bg-blue-50 rounded-lg transition">Login</Link>
            <Link to="/register" className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition shadow-md">Register</Link>
          </div>
        </div>
      </nav>

      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
              Transforming <span className="text-blue-800">Healthcare</span> Management
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              Streamline hospital operations, enhance patient care, and optimize workflows with our comprehensive management solution.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register" className="px-8 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition shadow-lg text-center font-medium">
                Get Started
              </Link>
              <Link to="/demo" className="px-8 py-3 border border-blue-900 text-blue-900 rounded-lg hover:bg-blue-50 transition text-center font-medium">
                Live Demo
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Hospital Management Dashboard" 
                className="rounded-xl shadow-2xl border-8 border-white transform rotate-1"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-100 rounded-full opacity-30 z-0"></div>
          </div>
        </div>
      </section>

      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">250+</div>
              <div className="text-blue-100">Hospitals</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Medical Staff</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Patients</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Comprehensive Hospital Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your healthcare facility efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition hover:-translate-y-2 opacity-0">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Patient Records</h3>
              <p className="text-gray-600">
                Centralized electronic health records with secure access and real-time updates for better patient care.
              </p>
            </div>

            <div className="feature-card bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition hover:-translate-y-2 opacity-0 delay-100">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Appointment System</h3>
              <p className="text-gray-600">
                Automated scheduling with reminders and waitlist management to optimize doctor-patient interactions.
              </p>
            </div>

            <div className="feature-card bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition hover:-translate-y-2 opacity-0 delay-200">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Analytics Dashboard</h3>
              <p className="text-gray-600">
                Powerful insights with customizable reports to track KPIs and improve operational efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Hospital?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare providers delivering better patient care with our system
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register" className="px-8 py-3 bg-white text-blue-900 rounded-lg hover:bg-gray-100 transition shadow-lg text-center font-medium">
              Start Free Trial
            </Link>
            <Link to="/contact" className="px-8 py-3 border border-white text-white rounded-lg hover:bg-blue-700 transition text-center font-medium">
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <h2 className="text-xl font-bold">MediCare<span className="text-blue-400">Pro</span></h2>
              </div>
              <p className="text-gray-400">
                Revolutionizing healthcare management with innovative technology solutions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-400 hover:text-white transition">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition">Pricing</Link></li>
                <li><Link to="/demo" className="text-gray-400 hover:text-white transition">Demo</Link></li>
                <li><Link to="/updates" className="text-gray-400 hover:text-white transition">Updates</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition">About</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white transition">Careers</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
                <li><Link to="/press" className="text-gray-400 hover:text-white transition">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
                <li><Link to="/help" className="text-gray-400 hover:text-white transition">Help Center</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} MediCarePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}