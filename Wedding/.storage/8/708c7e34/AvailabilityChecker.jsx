import React, { useState, useEffect } from 'react';
import { availableDates, weddingHalls } from '../data/mockData';

const AvailabilityChecker = ({ onNavigate }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHall, setSelectedHall] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableHalls, setAvailableHalls] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      const dateInfo = availableDates.find(d => d.date === selectedDate);
      setAvailableHalls(dateInfo ? dateInfo.halls : []);
    }
  }, [selectedDate]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dateInfo = availableDates.find(d => d.date === dateString);
      const isAvailable = dateInfo?.available || false;
      const isPast = new Date(dateString) < new Date();
      
      days.push({
        day,
        dateString,
        isAvailable: isAvailable && !isPast,
        isPast
      });
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Check Availability
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select your preferred wedding date and venue from our available options
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calendar Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-2xl font-bold text-gray-900">{monthYear}</h2>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => (
                <div key={index} className="aspect-square">
                  {day && (
                    <button
                      onClick={() => day.isAvailable && setSelectedDate(day.dateString)}
                      disabled={!day.isAvailable}
                      className={`w-full h-full rounded-lg text-sm font-medium transition-all duration-200 ${
                        day.isPast
                          ? 'text-gray-300 cursor-not-allowed'
                          : day.isAvailable
                          ? selectedDate === day.dateString
                            ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                            : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                          : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                      }`}
                    >
                      {day.day}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-100 rounded"></div>
                <span>Unavailable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                <span>Available</span>
              </div>
            </div>
          </div>

          {/* Available Halls Section */}
          <div className="space-y-6">
            {selectedDate ? (
              <>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Available Halls for {new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>

                  <div className="space-y-4">
                    {availableHalls.filter(hall => hall.available).map(hall => (
                      <div
                        key={hall.id}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                          selectedHall?.id === hall.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedHall(hall)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xl font-semibold text-gray-900">{hall.name}</h4>
                          <span className="text-lg font-bold text-blue-600">
                            {formatCurrency(hall.pricePerDay)}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">Capacity: {hall.capacity} guests</p>
                        <div className="flex flex-wrap gap-2">
                          {hall.features.map((feature, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {availableHalls.filter(hall => hall.available).length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">😔</div>
                      <p className="text-gray-500">No halls available for this date</p>
                    </div>
                  )}
                </div>

                {selectedHall && (
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-xl p-8 text-white">
                    <h4 className="text-2xl font-bold mb-4">Ready to Book?</h4>
                    <p className="mb-6 text-blue-100">
                      You've selected {selectedHall.name} for {new Date(selectedDate).toLocaleDateString()}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => onNavigate('packages')}
                        className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-full hover:bg-gray-50 transition-colors duration-200"
                      >
                        View Packages
                      </button>
                      <button
                        onClick={() => onNavigate('booking')}
                        className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-500 transition-all duration-200"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Select a Date</h3>
                <p className="text-gray-600">
                  Choose an available date from the calendar to see available wedding halls
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityChecker;