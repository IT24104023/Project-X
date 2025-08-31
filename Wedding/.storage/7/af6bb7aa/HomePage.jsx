import React from 'react';

const HomePage = ({ onNavigate }) => {
  const features = [
    {
      icon: "📅",
      title: "Check Availability",
      description: "View real-time availability of wedding dates and halls"
    },
    {
      icon: "💎",
      title: "Wedding Packages",
      description: "Choose from Silver, Gold, or Platinum wedding packages"
    },
    {
      icon: "💳",
      title: "Online Booking",
      description: "Secure online booking and payment processing"
    },
    {
      icon: "✉️",
      title: "Guest RSVP",
      description: "Manage guest responses and meal preferences"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600/20 to-pink-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-8 duration-1000">
                Golden Palm Grand Hotel
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                Your Dream Wedding Destination
              </p>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                Create unforgettable memories with our comprehensive wedding planning system. 
                From venue selection to guest management, we make your special day perfect.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
              <button
                onClick={() => onNavigate('availability')}
                className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Check Availability
              </button>
              <button
                onClick={() => onNavigate('packages')}
                className="px-8 py-4 border-2 border-rose-500 text-rose-500 font-semibold rounded-full hover:bg-rose-500 hover:text-white transform hover:scale-105 transition-all duration-300"
              >
                View Packages
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Your Perfect Wedding
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive system handles every aspect of your wedding planning, 
            from initial booking to the final celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-rose-200"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Plan Your Dream Wedding?
          </h2>
          <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of happy couples who have celebrated their special day with us. 
            Start planning your perfect wedding today.
          </p>
          <button
            onClick={() => onNavigate('availability')}
            className="px-10 py-4 bg-white text-rose-500 font-bold rounded-full hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Planning Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;