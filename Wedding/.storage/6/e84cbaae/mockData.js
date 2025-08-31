// Mock data for the wedding reservation system

export const weddingPackages = [
  {
    id: 1,
    name: "Silver Package",
    price: 1500000,
    currency: "LKR",
    capacity: 100,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
    highlights: ["Budget-friendly option", "Perfect for intimate celebrations"],
    services: [
      "Buffet dinner for 100 guests",
      "Basic floral decorations",
      "DJ and sound system",
      "Professional photography (4 hours)",
      "Wedding cake",
      "Bridal suite for one night"
    ],
    addOns: [
      "Additional guests: LKR 15,000 per person",
      "Extended photography: LKR 50,000",
      "Live band: LKR 100,000"
    ]
  },
  {
    id: 2,
    name: "Gold Package",
    price: 3000000,
    currency: "LKR",
    capacity: 200,
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400",
    highlights: ["Most popular choice", "Enhanced decorations & entertainment"],
    services: [
      "Premium buffet for 200 guests",
      "Enhanced floral & lighting decorations",
      "DJ with premium sound system",
      "Professional photography & videography (6 hours)",
      "Traditional Kandyan drummers",
      "Multi-tier wedding cake",
      "Bridal suite for two nights",
      "Welcome drinks for guests"
    ],
    addOns: [
      "Additional guests: LKR 12,000 per person",
      "Drone videography: LKR 75,000",
      "Photo booth: LKR 50,000"
    ]
  },
  {
    id: 3,
    name: "Platinum Package",
    price: 5000000,
    currency: "LKR",
    capacity: 300,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400",
    highlights: ["Luxury experience", "Premium venue & services"],
    services: [
      "Luxury buffet & live cooking stations for 300 guests",
      "Premium venue with scenic garden view",
      "Live band & premium entertainment",
      "Professional photography & videography (8 hours)",
      "Drone videography included",
      "Luxury floral arrangements & lighting",
      "Designer wedding cake",
      "Honeymoon suite for three nights",
      "Champagne toast for all guests",
      "Dedicated wedding coordinator"
    ],
    addOns: [
      "Additional guests: LKR 10,000 per person",
      "Celebrity performer: LKR 200,000",
      "Fireworks display: LKR 150,000"
    ]
  }
];

export const weddingHalls = [
  {
    id: 1,
    name: "Grand Ballroom",
    capacity: 300,
    features: ["Air-conditioned", "Stage", "Premium lighting", "Sound system"],
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
    pricePerDay: 200000
  },
  {
    id: 2,
    name: "Garden Pavilion", 
    capacity: 200,
    features: ["Open-air", "Garden view", "Natural lighting", "Scenic backdrop"],
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400",
    pricePerDay: 150000
  },
  {
    id: 3,
    name: "Rooftop Terrace",
    capacity: 150,
    features: ["City view", "Sunset backdrop", "Intimate setting", "Modern design"],
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400",
    pricePerDay: 180000
  }
];

export const mealOptions = [
  { id: 1, name: "Vegetarian", description: "Fresh vegetables, rice, lentils, and traditional Sri Lankan vegetarian dishes" },
  { id: 2, name: "Non-Vegetarian", description: "Chicken, beef, fish curry with rice and traditional accompaniments" },
  { id: 3, name: "Vegan", description: "Plant-based dishes with coconut milk curries and fresh vegetables" },
  { id: 4, name: "Seafood Special", description: "Fresh fish, prawns, and crab preparations with traditional spices" }
];

// Generate available dates (next 6 months, excluding some random dates as booked)
export const generateAvailableDates = () => {
  const dates = [];
  const today = new Date();
  const bookedDates = [
    '2025-01-15', '2025-01-22', '2025-02-14', '2025-02-28',
    '2025-03-08', '2025-03-15', '2025-04-12', '2025-04-26'
  ];
  
  for (let i = 7; i < 180; i++) { // Start from 7 days ahead
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateString = date.toISOString().split('T')[0];
    
    dates.push({
      date: dateString,
      available: !bookedDates.includes(dateString),
      halls: weddingHalls.map(hall => ({
        ...hall,
        available: !bookedDates.includes(dateString) || Math.random() > 0.3
      }))
    });
  }
  
  return dates;
};

export const availableDates = generateAvailableDates();