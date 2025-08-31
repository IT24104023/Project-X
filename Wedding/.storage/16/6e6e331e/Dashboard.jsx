import React, { useState, useEffect } from 'react';
import { weddingPackages, weddingHalls, mealOptions } from '../data/mockData';

const Dashboard = ({ onNavigate }) => {
  const [bookings, setBookings] = useState([]);
  const [rsvps, setRsvps] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Load data from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('weddingBookings') || '[]');
    const savedRsvps = JSON.parse(localStorage.getItem('weddingRsvps') || '[]');
    setBookings(savedBookings);
    setRsvps(savedRsvps);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPackageName = (packageId) => {
    return weddingPackages.find(pkg => pkg.id === parseInt(packageId))?.name || 'Unknown Package';
  };

  const getHallName = (hallId) => {
    return weddingHalls.find(hall => hall.id === parseInt(hallId))?.name || 'Unknown Hall';
  };

  const getMealName = (mealId) => {
    return mealOptions.find(meal => meal.id === parseInt(mealId))?.name || 'Unknown Meal';
  };

  const attendingGuests = rsvps.filter(rsvp => rsvp.attending === 'yes');
  const totalGuests = attendingGuests.length + attendingGuests.filter(rsvp => rsvp.plusOne).length;

  const mealCounts = mealOptions.reduce((acc, meal) => {
    acc[meal.name] = 0;
    return acc;
  }, {});

  attendingGuests.forEach(rsvp => {
    if (rsvp.mealPreference) {
      const mealName = getMealName(rsvp.mealPreference);
      mealCounts[mealName] = (mealCounts[mealName] || 0) + 1;
    }
    if (rsvp.plusOne && rsvp.plusOneMeal) {
      const plusOneMealName = getMealName(rsvp.plusOneMeal);
      mealCounts[plusOneMealName] = (mealCounts[plusOneMealName] || 0) + 1;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent mb-4">
            Wedding Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage your wedding bookings and guest responses
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'bookings', label: 'Bookings', icon: '📅' },
            { id: 'rsvps', label: 'Guest RSVPs', icon: '✉️' },
            { id: 'meals', label: 'Meal Planning', icon: '🍽️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-slate-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-slate-100 shadow-md'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="text-3xl">📅</div>
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="text-3xl">👥</div>
                <div>
                  <p className="text-sm text-gray-600">Total Guests</p>
                  <p className="text-2xl font-bold text-green-600">{totalGuests}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="text-3xl">✅</div>
                <div>
                  <p className="text-sm text-gray-600">RSVP Responses</p>
                  <p className="text-2xl font-bold text-blue-600">{rsvps.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="text-3xl">💰</div>
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatCurrency(bookings.reduce((sum, booking) => sum + (booking.totalAmount || 0), 0))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-slate-500 to-gray-500 p-6">
              <h2 className="text-2xl font-bold text-white">Wedding Bookings</h2>
            </div>
            <div className="p-6">
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
                  <p className="text-gray-600 mb-6">Start by creating your first wedding booking</p>
                  <button
                    onClick={() => onNavigate('booking')}
                    className="px-8 py-3 bg-gradient-to-r from-slate-500 to-gray-500 text-white font-semibold rounded-full hover:from-slate-600 hover:to-gray-600 transition-all duration-200"
                  >
                    Create Booking
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {bookings.map((booking, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {booking.brideName} & {booking.groomName}
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p><span className="font-medium">Booking ID:</span> {booking.bookingId}</p>
                            <p><span className="font-medium">Wedding Date:</span> {formatDate(booking.weddingDate)}</p>
                            <p><span className="font-medium">Email:</span> {booking.email}</p>
                            <p><span className="font-medium">Phone:</span> {booking.phone}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Package Details</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p><span className="font-medium">Package:</span> {getPackageName(booking.selectedPackage)}</p>
                            <p><span className="font-medium">Hall:</span> {getHallName(booking.selectedHall)}</p>
                            <p><span className="font-medium">Guests:</span> {booking.guestCount}</p>
                            <p><span className="font-medium">Status:</span> 
                              <span className="ml-1 px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                                {booking.status || 'Confirmed'}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Payment</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p><span className="font-medium">Total Amount:</span> {formatCurrency(booking.totalAmount)}</p>
                            <p><span className="font-medium">Payment Method:</span> Credit Card</p>
                            <p><span className="font-medium">Booked On:</span> {formatDate(booking.bookingDate)}</p>
                          </div>
                          {booking.specialRequests && (
                            <div className="mt-3">
                              <p className="font-medium text-gray-900 text-sm">Special Requests:</p>
                              <p className="text-sm text-gray-600">{booking.specialRequests}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* RSVPs Tab */}
        {activeTab === 'rsvps' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
              <h2 className="text-2xl font-bold text-white">Guest RSVPs</h2>
              <p className="text-emerald-100">Track guest responses and meal preferences</p>
            </div>
            <div className="p-6">
              {rsvps.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✉️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No RSVPs yet</h3>
                  <p className="text-gray-600 mb-6">Guests haven't started responding yet</p>
                  <button
                    onClick={() => onNavigate('rsvp')}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all duration-200"
                  >
                    View RSVP Form
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {rsvps.map((rsvp, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow duration-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{rsvp.name}</h3>
                          <p className="text-sm text-gray-600">{rsvp.email}</p>
                          {rsvp.phone && <p className="text-sm text-gray-600">{rsvp.phone}</p>}
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              rsvp.attending === 'yes' 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-red-100 text-red-600'
                            }`}>
                              {rsvp.attending === 'yes' ? '✅ Attending' : '❌ Not Attending'}
                            </span>
                          </div>
                          {rsvp.attending === 'yes' && rsvp.mealPreference && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Meal:</span> {getMealName(rsvp.mealPreference)}
                            </p>
                          )}
                          {rsvp.plusOne && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Plus One:</span> {rsvp.plusOneName}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          {rsvp.dietaryRestrictions && (
                            <p className="text-sm text-gray-600 mb-2">
                              <span className="font-medium">Dietary:</span> {rsvp.dietaryRestrictions}
                            </p>
                          )}
                          {rsvp.message && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Message:</span> {rsvp.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Meals Tab */}
        {activeTab === 'meals' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
              <h2 className="text-2xl font-bold text-white">Meal Planning</h2>
              <p className="text-orange-100">Overview of meal preferences for catering preparation</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Meal Preference Summary</h3>
                  <div className="space-y-4">
                    {mealOptions.map(meal => (
                      <div key={meal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900">{meal.name}</h4>
                          <p className="text-sm text-gray-600">{meal.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600">
                            {mealCounts[meal.name] || 0}
                          </div>
                          <div className="text-sm text-gray-600">guests</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Dietary Restrictions</h3>
                  <div className="space-y-3">
                    {attendingGuests
                      .filter(rsvp => rsvp.dietaryRestrictions)
                      .map((rsvp, index) => (
                        <div key={index} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <h4 className="font-semibold text-gray-900">{rsvp.name}</h4>
                          <p className="text-sm text-gray-600">{rsvp.dietaryRestrictions}</p>
                        </div>
                      ))}
                    {attendingGuests.filter(rsvp => rsvp.dietaryRestrictions).length === 0 && (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-4">🍽️</div>
                        <p className="text-gray-600">No special dietary restrictions reported</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white">
                    <h4 className="text-lg font-bold mb-2">Total Guest Count</h4>
                    <div className="text-3xl font-bold">{totalGuests}</div>
                    <p className="text-orange-100">guests confirmed attending</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('booking')}
            className="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <div className="text-2xl mb-2">➕</div>
            <div className="font-semibold">New Booking</div>
          </button>

          <button
            onClick={() => onNavigate('rsvp')}
            className="p-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <div className="text-2xl mb-2">✉️</div>
            <div className="font-semibold">RSVP Form</div>
          </button>

          <button
            onClick={() => onNavigate('packages')}
            className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <div className="text-2xl mb-2">💎</div>
            <div className="font-semibold">View Packages</div>
          </button>

          <button
            onClick={() => onNavigate('availability')}
            className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <div className="text-2xl mb-2">📅</div>
            <div className="font-semibold">Check Dates</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;