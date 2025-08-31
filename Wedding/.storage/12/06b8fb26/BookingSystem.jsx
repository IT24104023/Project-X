import React, { useState } from 'react';
import { weddingPackages, weddingHalls } from '../data/mockData';

const BookingSystem = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    // Couple Information
    brideName: '',
    groomName: '',
    email: '',
    phone: '',
    
    // Wedding Details
    weddingDate: '',
    selectedPackage: '',
    selectedHall: '',
    guestCount: '',
    specialRequests: '',
    
    // Payment Information
    paymentMethod: 'credit-card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Terms
    agreeTerms: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateTotal = () => {
    const selectedPkg = weddingPackages.find(pkg => pkg.id === parseInt(formData.selectedPackage));
    const selectedHallData = weddingHalls.find(hall => hall.id === parseInt(formData.selectedHall));
    
    let total = 0;
    if (selectedPkg) total += selectedPkg.price;
    if (selectedHallData) total += selectedHallData.pricePerDay;
    
    // Additional guest charges
    if (selectedPkg && formData.guestCount > selectedPkg.capacity) {
      const extraGuests = formData.guestCount - selectedPkg.capacity;
      const extraGuestRate = selectedPkg.id === 1 ? 15000 : selectedPkg.id === 2 ? 12000 : 10000;
      total += extraGuests * extraGuestRate;
    }
    
    return total;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const bookingData = {
        ...formData,
        bookingId: 'WED' + Date.now(),
        totalAmount: calculateTotal(),
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
      };
      
      // Save to localStorage
      const existingBookings = JSON.parse(localStorage.getItem('weddingBookings') || '[]');
      existingBookings.push(bookingData);
      localStorage.setItem('weddingBookings', JSON.stringify(existingBookings));
      
      setIsSubmitting(false);
      setBookingComplete(true);
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-bold text-green-600 mb-4">Booking Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-6">
              Congratulations! Your wedding booking has been successfully confirmed.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Booking Details:</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Booking ID:</span> WED{Date.now()}</p>
                <p><span className="font-medium">Couple:</span> {formData.brideName} & {formData.groomName}</p>
                <p><span className="font-medium">Wedding Date:</span> {new Date(formData.weddingDate).toLocaleDateString()}</p>
                <p><span className="font-medium">Package:</span> {weddingPackages.find(pkg => pkg.id === parseInt(formData.selectedPackage))?.name}</p>
                <p><span className="font-medium">Total Amount:</span> {formatCurrency(calculateTotal())}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
              >
                View Dashboard
              </button>
              <button
                onClick={() => onNavigate('rsvp')}
                className="px-8 py-3 border-2 border-green-500 text-green-500 font-semibold rounded-full hover:bg-green-500 hover:text-white transition-all duration-200"
              >
                Manage Guest RSVP
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Book Your Wedding
          </h1>
          <p className="text-xl text-gray-600">
            Complete your booking in just a few simple steps
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  currentStep >= step
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Wedding Details</span>
            <span>Package Selection</span>
            <span>Payment</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Step 1: Wedding Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Wedding Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bride's Name *
                  </label>
                  <input
                    type="text"
                    name="brideName"
                    value={formData.brideName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Groom's Name *
                  </label>
                  <input
                    type="text"
                    name="groomName"
                    value={formData.groomName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wedding Date *
                  </label>
                  <input
                    type="date"
                    name="weddingDate"
                    value={formData.weddingDate}
                    onChange={handleInputChange}
                    min={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Guest Count *
                  </label>
                  <input
                    type="number"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    min="50"
                    max="500"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  placeholder="Any special dietary requirements, decorations, or other requests..."
                />
              </div>
            </div>
          )}

          {/* Step 2: Package Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Package & Venue</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Wedding Package *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {weddingPackages.map(pkg => (
                    <div
                      key={pkg.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.selectedPackage === pkg.id.toString()
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, selectedPackage: pkg.id.toString() }))}
                    >
                      <h3 className="font-semibold text-gray-900">{pkg.name}</h3>
                      <p className="text-sm text-gray-600">Up to {pkg.capacity} guests</p>
                      <p className="text-lg font-bold text-indigo-600">{formatCurrency(pkg.price)}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Wedding Hall *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {weddingHalls.map(hall => (
                    <div
                      key={hall.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.selectedHall === hall.id.toString()
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, selectedHall: hall.id.toString() }))}
                    >
                      <h3 className="font-semibold text-gray-900">{hall.name}</h3>
                      <p className="text-sm text-gray-600">Capacity: {hall.capacity}</p>
                      <p className="text-lg font-bold text-indigo-600">{formatCurrency(hall.pricePerDay)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {formData.selectedPackage && formData.guestCount && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Package:</span>
                      <span>{weddingPackages.find(pkg => pkg.id === parseInt(formData.selectedPackage))?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hall:</span>
                      <span>{weddingHalls.find(hall => hall.id === parseInt(formData.selectedHall))?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guest Count:</span>
                      <span>{formData.guestCount}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total Amount:</span>
                      <span>{formatCurrency(calculateTotal())}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">Booking Summary</h3>
                <div className="text-sm text-blue-800">
                  <p>{formData.brideName} & {formData.groomName}</p>
                  <p>Wedding Date: {new Date(formData.weddingDate).toLocaleDateString()}</p>
                  <p className="font-bold text-lg">Total: {formatCurrency(calculateTotal())}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  required
                  className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label className="text-sm text-gray-700">
                  I agree to the terms and conditions and privacy policy *
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && (!formData.brideName || !formData.groomName || !formData.email || !formData.weddingDate)) ||
                  (currentStep === 2 && (!formData.selectedPackage || !formData.selectedHall))
                }
                className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-full hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || !formData.agreeTerms}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-full hover:from-green-600 hover:to-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSubmitting ? 'Processing...' : 'Complete Booking'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingSystem;