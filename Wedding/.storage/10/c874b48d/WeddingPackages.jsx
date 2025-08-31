import React, { useState } from 'react';
import { weddingPackages } from '../data/mockData';

const WeddingPackages = ({ onNavigate }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const PackageCard = ({ pkg, isSelected, onSelect }) => (
    <div
      className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 ${
        isSelected ? 'ring-4 ring-rose-500 scale-105' : 'hover:shadow-2xl'
      }`}
    >
      {/* Package Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold">{pkg.name}</h3>
          <p className="text-sm opacity-90">Up to {pkg.capacity} guests</p>
        </div>
        {pkg.name === 'Gold Package' && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </div>
        )}
      </div>

      {/* Package Content */}
      <div className="p-6">
        {/* Price */}
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {formatCurrency(pkg.price)}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {pkg.highlights.map((highlight, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-rose-100 text-rose-600 text-sm rounded-full"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Included Services:</h4>
          <ul className="space-y-2">
            {pkg.services.slice(0, 4).map((service, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {service}
              </li>
            ))}
            {pkg.services.length > 4 && (
              <li className="text-sm text-gray-500 italic">
                +{pkg.services.length - 4} more services...
              </li>
            )}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => setSelectedPackage(selectedPackage?.id === pkg.id ? null : pkg)}
            className="w-full px-6 py-3 border-2 border-rose-500 text-rose-500 font-semibold rounded-full hover:bg-rose-500 hover:text-white transition-all duration-200"
          >
            {selectedPackage?.id === pkg.id ? 'Hide Details' : 'View Details'}
          </button>
          <button
            onClick={() => onNavigate('booking')}
            className="w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Select Package
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-rose-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Wedding Packages
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect package for your special day. Each package is carefully designed 
            to create unforgettable memories within your budget.
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="px-6 py-3 bg-purple-100 text-purple-600 font-semibold rounded-full hover:bg-purple-200 transition-colors duration-200"
            >
              {showComparison ? 'Hide Comparison' : 'Compare Packages'}
            </button>
          </div>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {weddingPackages.map(pkg => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              isSelected={selectedPackage?.id === pkg.id}
              onSelect={setSelectedPackage}
            />
          ))}
        </div>

        {/* Package Details Modal */}
        {selectedPackage && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{selectedPackage.name}</h3>
                <div className="text-2xl font-bold text-rose-600 mb-6">
                  {formatCurrency(selectedPackage.price)}
                </div>
                
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Complete Service List:</h4>
                  <ul className="space-y-3">
                    {selectedPackage.services.map((service, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Available Add-ons:</h4>
                <ul className="space-y-3 mb-6">
                  {selectedPackage.addOns.map((addon, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{addon}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl p-6 text-white">
                  <h5 className="text-lg font-semibold mb-2">Ready to book?</h5>
                  <p className="text-rose-100 mb-4">
                    This package includes everything you need for {selectedPackage.capacity} guests
                  </p>
                  <button
                    onClick={() => onNavigate('booking')}
                    className="w-full px-6 py-3 bg-white text-rose-500 font-semibold rounded-full hover:bg-gray-50 transition-colors duration-200"
                  >
                    Book This Package
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {showComparison && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-12">
            <div className="bg-gradient-to-r from-purple-500 to-rose-500 p-6">
              <h3 className="text-2xl font-bold text-white text-center">Package Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Feature</th>
                    {weddingPackages.map(pkg => (
                      <th key={pkg.id} className="px-6 py-4 text-center font-semibold text-gray-900">
                        {pkg.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Price</td>
                    {weddingPackages.map(pkg => (
                      <td key={pkg.id} className="px-6 py-4 text-center font-bold text-rose-600">
                        {formatCurrency(pkg.price)}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Guest Capacity</td>
                    {weddingPackages.map(pkg => (
                      <td key={pkg.id} className="px-6 py-4 text-center text-gray-700">
                        {pkg.capacity} guests
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Photography</td>
                    {weddingPackages.map(pkg => (
                      <td key={pkg.id} className="px-6 py-4 text-center text-gray-700">
                        {pkg.services.find(s => s.includes('photography')) ? '✓' : '✗'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Entertainment</td>
                    {weddingPackages.map(pkg => (
                      <td key={pkg.id} className="px-6 py-4 text-center text-gray-700">
                        {pkg.id === 1 ? 'DJ' : pkg.id === 2 ? 'DJ + Drummers' : 'Live Band'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500 to-rose-500 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Need Help Choosing?</h3>
            <p className="text-lg text-purple-100 mb-6 max-w-2xl mx-auto">
              Our wedding coordinators are here to help you select the perfect package 
              and customize it to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('availability')}
                className="px-8 py-3 bg-white text-purple-500 font-semibold rounded-full hover:bg-gray-50 transition-colors duration-200"
              >
                Check Availability
              </button>
              <button
                onClick={() => onNavigate('booking')}
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-purple-500 transition-all duration-200"
              >
                Start Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingPackages;