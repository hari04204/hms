import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";

export default function LandingPage() {
  const features = [
    {
      title: "Patient Records",
      description:
        "Centralized electronic health records with secure access and real-time updates for better patient care.",
      icon: (
        <svg
          className="w-8 h-8 text-blue-900"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      title: "Appointment System",
      description:
        "Automated scheduling with reminders and waitlist management to optimize doctor-patient interactions.",
      icon: (
        <svg
          className="w-8 h-8 text-blue-900"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Analytics Dashboard",
      description:
        "Powerful insights with customizable reports to track KPIs and improve operational efficiency.",
      icon: (
        <svg
          className="w-8 h-8 text-blue-900"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white/70">
      <Navbar />

      <section className="container mx-auto px-6 py-20 md:py-32 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
              Transforming <span className="text-blue-800 bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900">Healthcare</span> Management
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              Streamline hospital operations, enhance patient care, and optimize
              workflows with our comprehensive management solution.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/register"
                className="px-8 py-3.5 bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02] shadow-lg text-center font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative z-10 group">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118"
                alt="Hospital Management Dashboard"
                className="rounded-2xl shadow-2xl border-8 border-white transform rotate-1 transition-all duration-500 group-hover:rotate-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-2xl" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-100 rounded-full opacity-30 z-0 animate-float" />
          </div>
        </div>
      </section>

      <section className="bg-blue-900/95 text-white py-16 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[ 
              { number: "250+", label: "Hospitals" },
              { number: "10K+", label: "Medical Staff" },
              { number: "1M+", label: "Patients" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-4xl font-bold mb-2 text-blue-200">{stat.number}</div>
                <div className="text-blue-100/90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Comprehensive Hospital Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your healthcare facility efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')]" />
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Hospital?
          </h2>
          <p className="text-xl text-blue-100/90 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare providers delivering better patient
            care with our system
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="px-8 py-3.5 bg-white text-blue-900 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
              Start Free Trial
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 border-2 border-white/30 text-white rounded-xl hover:border-white/60 hover:bg-white/10 transition-all duration-300 font-medium"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              {/* Footer Column 1 */}
            </div>
            <div>
              {/* Footer Column 2 */}
            </div>
            <div>
              {/* Footer Column 3 */}
            </div>
            <div>
              {/* Footer Column 4 */}
            </div>
          </div>
          <div className="text-center mt-8 text-gray-400">
            &copy; 2025 Hospital Management. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
