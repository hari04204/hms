import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";

export default function LandingPage() {
  const features = [
    // ... (keep existing feature array unchanged)
  ];

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight * 0.8) {
          element.classList.add("opacity-100", "translate-y-0");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white/70">
      <Navbar />

      <section className="container mx-auto px-6 py-20 md:py-32 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 animate-on-scroll opacity-0 translate-y-8 transition-all duration-500">
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
              <Link
                to="/demo"
                className="px-8 py-3.5 border-2 border-blue-900/20 text-blue-900 rounded-xl hover:border-blue-900/40 hover:bg-blue-50/50 transition-all duration-300 text-center font-medium"
              >
                Live Demo
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative animate-on-scroll opacity-0 translate-y-8 transition-all duration-500 delay-150">
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
              { number: "24/7", label: "Support" },
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
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-500">
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-on-scroll opacity-0">
            Ready to Transform Your Hospital?
          </h2>
          <p className="text-xl text-blue-100/90 mb-8 max-w-2xl mx-auto animate-on-scroll opacity-0">
            Join thousands of healthcare providers delivering better patient
            care with our system
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-on-scroll opacity-0">
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
            {/* Keep existing footer content but add animation classes */}
            <div className="animate-on-scroll opacity-0 translate-y-8">
              {/* ... existing footer column 1 ... */}
            </div>
            <div className="animate-on-scroll opacity-0 translate-y-8 delay-100">
              {/* ... existing footer column 2 ... */}
            </div>
            <div className="animate-on-scroll opacity-0 translate-y-8 delay-200">
              {/* ... existing footer column 3 ... */}
            </div>
            <div className="animate-on-scroll opacity-0 translate-y-8 delay-300">
              {/* ... existing footer column 4 ... */}
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p className="animate-on-scroll opacity-0">
              © {new Date().getFullYear()} MediCarePro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}