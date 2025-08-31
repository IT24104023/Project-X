import React, { useState, useEffect } from 'react';
import { mealOptions } from '../data/mockData';

const GuestRSVP = ({ onNavigate }) => {
  const [guestData, setGuestData] = useState({
    name: '',
    email: '',
    phone: '',
    attending: '',
    mealPreference: '',
    dietaryRestrictions: '',
    plusOne: false,
    plusOneName: '',
    plusOneMeal: '',
    message: ''
  });

  const [rsvpComplete, setRsvpComplete] = useState(false);
  const [existingRsvps, setExistingRsvps] = useState([]);

  useEffect(() => {
    // Load existing RSVPs from localStorage
    const savedRsvps = JSON.parse(localStorage.getItem('weddingRsvps') || '[]');
    setExistingRsvps(savedRsvps);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGuestData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const rsvpData = {
      ...guestData,
      rsvpId: 'RSVP' + Date.now(),
      submittedAt: new Date().toISOString()
    };

    // Save to localStorage
    const updatedRsvps = [...existingRsvps, rsvpData];
    localStorage.setItem('weddingRsvps', JSON.stringify(updatedRsvps));
    setExistingRsvps(updatedRsvps);
    
    setRsvpComplete(true);
  };

  if (rsvpComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="text-6xl mb-6">
              {guestData.attending === 'yes' ? '🎉' : '😔'}
            </div>
            <h1 className="text-4xl font-bold text-emerald-600 mb-4">
              {guestData.attending === 'yes' ? 'RSVP Confirmed!' : 'RSVP Received'}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {guestData.attending === 'yes' 
                ? `Thank you ${guestData.name}! We're excited to celebrate with you.`
                : `Thank you ${guestData.name} for letting us know. You'll be missed!`
              }
            </p>
            
            {guestData.attending === 'yes' && (
              <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">Your RSVP Details:</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {guestData.name}</p>
                  <p><span className="font-medium">Meal Preference:</span> {mealOptions.find(m => m.id === parseInt(guestData.mealPreference))?.name}</p>
                  {guestData.plusOne && (
                    <>
                      <p><span className="font-medium">Plus One:</span> {guestData.plusOneName}</p>
                      <p><span className="font-medium">Plus One Meal:</span> {mealOptions.find(m => m.id === parseInt(guestData.plusOneMeal))?.name}</p>
                    </>
                  )}
                  {guestData.dietaryRestrictions && (
                    <p><span className="font-medium">Dietary Restrictions:</span> {guestData.dietaryRestrictions}</p>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('home')}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all duration-200"
              >
                Back to Home
              </button>
              <button
                onClick={() => setRsvpComplete(false)}
                className="px-8 py-3 border-2 border-emerald-500 text-emerald-500 font-semibold rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-200"
              >
                Submit Another RSVP
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Wedding RSVP
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Please let us know if you'll be joining us for this special celebration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* RSVP Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={guestData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={guestData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={guestData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Attendance */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Will you be attending? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      guestData.attending === 'yes'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                    onClick={() => setGuestData(prev => ({ ...prev, attending: 'yes' }))}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">✅</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Yes, I'll be there!</h3>
                        <p className="text-sm text-gray-600">Can't wait to celebrate with you</p>
                      </div>
                    </div>
                  </div>
                  
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      guestData.attending === 'no'
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                    onClick={() => setGuestData(prev => ({ ...prev, attending: 'no' }))}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">❌</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Sorry, can't make it</h3>
                        <p className="text-sm text-gray-600">Will be thinking of you</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meal Selection - Only show if attending */}
              {guestData.attending === 'yes' && (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Meal Preference *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mealOptions.map(meal => (
                        <div
                          key={meal.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            guestData.mealPreference === meal.id.toString()
                              ? 'border-teal-500 bg-teal-50'
                              : 'border-gray-200 hover:border-teal-300'
                          }`}
                          onClick={() => setGuestData(prev => ({ ...prev, mealPreference: meal.id.toString() }))}
                        >
                          <h3 className="font-semibold text-gray-900 mb-2">{meal.name}</h3>
                          <p className="text-sm text-gray-600">{meal.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Plus One */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <input
                        type="checkbox"
                        name="plusOne"
                        checked={guestData.plusOne}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        I'll be bringing a plus one
                      </label>
                    </div>

                    {guestData.plusOne && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Plus One Name *
                          </label>
                          <input
                            type="text"
                            name="plusOneName"
                            value={guestData.plusOneName}
                            onChange={handleInputChange}
                            required={guestData.plusOne}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Plus One Meal *
                          </label>
                          <select
                            name="plusOneMeal"
                            value={guestData.plusOneMeal}
                            onChange={handleInputChange}
                            required={guestData.plusOne}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                          >
                            <option value="">Select meal preference</option>
                            {mealOptions.map(meal => (
                              <option key={meal.id} value={meal.id}>{meal.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dietary Restrictions */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dietary Restrictions or Allergies
                    </label>
                    <textarea
                      name="dietaryRestrictions"
                      value={guestData.dietaryRestrictions}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                      placeholder="Please let us know about any dietary restrictions or allergies..."
                    />
                  </div>
                </>
              )}

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message for the Couple
                </label>
                <textarea
                  name="message"
                  value={guestData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                  placeholder="Share your wishes and congratulations..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!guestData.name || !guestData.email || !guestData.attending}
                className="w-full px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-full hover:from-teal-600 hover:to-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Submit RSVP
              </button>
            </form>
          </div>

          {/* RSVP Summary Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">RSVP Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Responses:</span>
                  <span className="font-semibold">{existingRsvps.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Attending:</span>
                  <span className="font-semibold text-green-600">
                    {existingRsvps.filter(rsvp => rsvp.attending === 'yes').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Not Attending:</span>
                  <span className="font-semibold text-red-600">
                    {existingRsvps.filter(rsvp => rsvp.attending === 'no').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plus Ones:</span>
                  <span className="font-semibold">
                    {existingRsvps.filter(rsvp => rsvp.plusOne).length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Wedding Details</h3>
              <div className="space-y-2 text-sm text-teal-100">
                <p>📅 Date: To be confirmed</p>
                <p>🕕 Time: 6:00 PM onwards</p>
                <p>📍 Venue: Golden Palm Grand Hotel</p>
                <p>👗 Dress Code: Formal attire</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                If you have any questions about the wedding or need assistance with your RSVP, please don't hesitate to contact us.
              </p>
              <button
                onClick={() => onNavigate('home')}
                className="w-full px-4 py-2 bg-teal-100 text-teal-600 font-semibold rounded-full hover:bg-teal-200 transition-colors duration-200"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestRSVP;