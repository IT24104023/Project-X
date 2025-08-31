import React, { useState } from 'react';
import HomePage from './components/HomePage';
import AvailabilityChecker from './components/AvailabilityChecker';
import WeddingPackages from './components/WeddingPackages';
import BookingSystem from './components/BookingSystem';
import GuestRSVP from './components/GuestRSVP';
import Dashboard from './components/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'availability':
        return <AvailabilityChecker onNavigate={handleNavigation} />;
      case 'packages':
        return <WeddingPackages onNavigate={handleNavigation} />;
      case 'booking':
        return <BookingSystem onNavigate={handleNavigation} />;
      case 'rsvp':
        return <GuestRSVP onNavigate={handleNavigation} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleNavigation('home')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="text-2xl">🏨</div>
              <div className="font-bold text-xl bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Golden Palm Grand
              </div>
            </button>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              {[
                { id: 'home', label: 'Home', icon: '🏠' },
                { id: 'availability', label: 'Availability', icon: '📅' },
                { id: 'packages', label: 'Packages', icon: '💎' },
                { id: 'booking', label: 'Book Now', icon: '📝' },
                { id: 'rsvp', label: 'RSVP', icon: '✉️' },
                { id: 'dashboard', label: 'Dashboard', icon: '📊' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-rose-100 text-rose-600'
                      : 'text-gray-600 hover:text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">🏨</div>
                <div className="font-bold text-xl">Golden Palm Grand Hotel</div>
              </div>
              <p className="text-gray-400 mb-4">
                Creating unforgettable wedding experiences with luxury, elegance, and personalized service.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                {['Home', 'Packages', 'Availability', 'Book Now'].map(link => (
                  <button
                    key={link}
                    className="block text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <div className="space-y-2 text-gray-400">
                <p>Wedding Planning</p>
                <p>Catering Services</p>
                <p>Photography</p>
                <p>Entertainment</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>📍 Colombo, Sri Lanka</p>
                <p>📞 +94 11 234 5678</p>
                <p>✉️ weddings@goldenpalm.lk</p>
                <p>🌐 www.goldenpalm.lk</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Golden Palm Grand Hotel. All rights reserved. | Developed for SE2030 Software Engineering Project</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;