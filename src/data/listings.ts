export type ListingCategory = 'properties' | 'car-park' | 'storage-cage'

export interface CarParkSpace {
  id: string
  spaceNumber: string
  price: number
  pricePeriod: 'per_month' | 'per_week' | 'per_day' | 'total'
  available: boolean
  description?: string
}

export interface ListingItem {
  id: string
  slug: string
  title: string
  summary: string
  type: 'RESIDENTIAL' | 'COMMERCIAL' | 'ANCILLARY'
  status:
    | 'AVAILABLE'
    | 'UNDER_OFFER'
    | 'SOLD'
    | 'LEASED'
    | 'COMING_SOON'
    | 'FOR_RENT'
  price?: number
  pricePeriod?: 'per_month' | 'per_week' | 'per_day' | 'total'
  address: string
  suburb: string
  state: string
  postcode?: string
  bedrooms?: number
  bathrooms?: number
  carSpaces?: number
  floorAreaSqm?: number
  heroImageUrl: string
  description?: string
  features?: string[]
  gallery?: { url: string; alt: string; width: number; height: number }[]
  videoUrl?: string
  spaces?: CarParkSpace[]
  agent?: { name: string; phone: string; email: string }
  category: ListingCategory
}

// Centralised listings dataset to be reused by list and detail pages
export const listings: ListingItem[] = [
  {
    id: '3',
    slug: 'carpark-211-powlett-st-east-melbourne',
    title: 'Secure Car Park for Lease at Tribeca, East Melbourne (lot. 31)',
    summary: 'Secure car park space — details coming soon',
    type: 'ANCILLARY',
    status: 'COMING_SOON',
    address: '31/211 Powlett Street',
    suburb: 'East Melbourne',
    state: 'VIC',
    postcode: '3002',
    heroImageUrl: '/placeholder-property.svg',
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'car-park',
  },
  {
    id: '30-211-powlett',
    slug: 'carpark-30-211-powlett-st-east-melbourne',
    title: 'Secure Car Park for Lease at Tribeca, East Melbourne (lot. 30)',
    summary: 'Premium secure parking near MCG, hospitals and CBD - leased',
    type: 'ANCILLARY',
    status: 'LEASED',
    price: 365,
    pricePeriod: 'per_month',
    address: '30/211 Powlett Street',
    suburb: 'East Melbourne',
    state: 'VIC',
    postcode: '3002',
    floorAreaSqm: 12,
    heroImageUrl: '/211.jpg',
    description:
      'Clearance: 2.1m\n\nSecure Car Park for Lease at Tribeca, East Melbourne (lot. 30)\n\nTired of circling the block for parking near the CBD, MCG or hospitals.\n\nEnjoy the convenience and peace of mind with this secure car parking space in one of East Melbourne most prestigious pockets.\n\nLocation highlights:\n\nEntry via Powlett St, just off Wellington Parade. 5mins walk to MCG, moments to Jolimont Station, Fitzroy Gardens and CBD. Easy access to St. Vincent Hospital, Epworth Freemasons, and Melbourne medical precinct.',
    features: [
      '2.1m clearance',
      '5 mins walk to MCG',
      'Entry via Powlett St off Wellington Parade',
      'Near St. Vincent Hospital',
      'Near Epworth Freemasons',
      'Close to Melbourne medical precinct',
      'Moments to Jolimont Station',
      'Near Fitzroy Gardens',
      'Easy CBD access',
      'Premium Tribeca location',
      'Secure parking',
      'External parking space',
    ],
    gallery: [
      {
        url: '/211.jpg',
        alt: '211 Powlett St car park at Tribeca',
        width: 1200,
        height: 800,
      },
    ],
    videoUrl: 'https://youtu.be/bGW4kY0r-g8',
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'car-park',
  },
  {
    id: '4',
    slug: 'carpark-st-kilda-tower-queens-lane',
    title: 'Car Park for Rent – St Kilda Tower (Entry via Queens Ln)',
    summary:
      'Secure car park space in St Kilda Tower with convenient Queens Lane access',
    type: 'ANCILLARY',
    status: 'LEASED',
    price: 340,
    pricePeriod: 'per_month',
    address: 'St Kilda Tower, Entry via Queens Lane',
    suburb: 'St Kilda',
    state: 'VIC',
    postcode: '3182',
    floorAreaSqm: 12,
    heroImageUrl: '/A20-1-Queens-Rd.jpg',
    description:
      'Secure car park space in St Kilda Tower with convenient Queens Lane access. Perfect for residents or workers in the St Kilda area.',
    features: [
      'St Kilda Tower location',
      'Queens Lane access',
      '24/7 security',
      'Well-maintained',
      'Close to St Kilda Beach',
    ],
    gallery: [
      {
        url: '/A20-1-Queens-Rd.jpg',
        alt: 'St Kilda Tower car park entrance',
        width: 800,
        height: 600,
      },
    ],
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'car-park',
  },
  {
    id: 'franklin-729-58',
    slug: 'carpark-729-58-franklin-st-melbourne',
    title: 'Prime Parking Space Available for Rent on Level 7(29)',
    summary:
      'Prime parking space on Level 7 with 24/7 swipe card access, conveniently located near Flagstaff Gardens, RMIT, and Queen Victoria Market',
    type: 'ANCILLARY',
    status: 'LEASED',
    price: 230,
    pricePeriod: 'per_month',
    address: '729/58 Franklin Street',
    suburb: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    floorAreaSqm: 12,
    heroImageUrl: '/58.jpg',
    description:
      'Tired of circling the block for parking, your solution is here!\n\nKey Features:\n\nPrime Location: Conveniently located near Flagstaff Gardens, RMIT, and Queen Victoria Market.\n\nSecure and Safe: Your vehicle will be securely parked in a well-lit and monitored area for peace of mind.\n\n24/7 Access with Swipe Entry: Access your parking space anytime with the convenience of secure swipe card entry.\n\nSpacious and Convenient: The generous space accommodates vehicles of all sizes, ensuring hassle-free parking.',
    features: [
      'Prime CBD location',
      'Near Flagstaff Gardens',
      'Near RMIT',
      'Near Queen Victoria Market',
      '24/7 swipe card access',
      'Well-lit and monitored',
      'Secure parking',
      'Spacious parking space',
      'Accommodates all vehicle sizes',
    ],
    gallery: [
      {
        url: '/58.jpg',
        alt: 'Parking space on Level 7 at 729/58 Franklin Street',
        width: 1021,
        height: 1024,
      },
    ],
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'car-park',
  },
  {
    id: '6',
    slug: 'carparks-150-albert-rd-south-melbourne',
    title: 'Carparks for Rent – 150 Albert Rd, South Melbourne',
    summary: '7 secure car park spaces in prime South Melbourne location',
    type: 'ANCILLARY',
    status: 'LEASED',
    address: '150 Albert Road',
    suburb: 'South Melbourne',
    state: 'VIC',
    postcode: '3205',
    floorAreaSqm: 12,
    heroImageUrl: '/pork/150%20Albert%20Rd,%20SOUTH%20MELBOURNE.jpg',
    description:
      '7 secure car park spaces available for rent in the heart of South Melbourne. Conveniently located on Albert Road with easy access to the CBD, these spaces offer excellent value for residents and workers in the area.\n\n2.1m clearance',
    features: [
      'Prime South Melbourne location on Albert Road',
      '7 spaces available',
      '2.1m clearance',
      '24/7 security',
      'Easy CBD access',
      'Close to South Melbourne Market',
      'Public transport nearby',
    ],
    gallery: [
      {
        url: '/pork/150%20Albert%20Rd,%20SOUTH%20MELBOURNE.jpg',
        alt: '150 Albert Road building exterior',
        width: 1200,
        height: 800,
      },
      {
        url: '/pork/150%20Albert%20Rd,%20SOUTH%20MELBOUNRE%202.jpg',
        alt: '150 Albert Road garage door entrance',
        width: 1200,
        height: 800,
      },
      {
        url: '/pork/IMG_4636.jpeg',
        alt: 'Car park bay 1',
        width: 1200,
        height: 800,
      },
      {
        url: '/pork/IMG_4637.jpeg',
        alt: 'Car park bay 2',
        width: 1200,
        height: 800,
      },
      {
        url: '/pork/IMG_4638.jpeg',
        alt: 'Car park bay 3',
        width: 1200,
        height: 800,
      },
      {
        url: '/pork/IMG_4639.jpeg',
        alt: 'Car park bay 4',
        width: 1200,
        height: 800,
      },
      {
        url: '/pork/IMG_4640.jpeg',
        alt: 'Car park bay 5',
        width: 1200,
        height: 800,
      },
      {
        url: '/pork/IMG_4641.jpeg',
        alt: 'Car park bay 6',
        width: 1200,
        height: 800,
      },
      {
        url: '/pork/IMG_4643.jpeg',
        alt: 'Car park bay 7',
        width: 1200,
        height: 800,
      },
      {
        url: '/pork/Building%20shot%201.jpg',
        alt: 'Building view',
        width: 1200,
        height: 800,
      },
    ],
    videoUrl: 'https://youtu.be/K75u14rFfPQ',
    spaces: [
      {
        id: 'space-1',
        spaceNumber: 'B1',
        price: 250,
        pricePeriod: 'per_month',
        available: false,
        description: 'Standard car park space - 2.4m x 5.0m',
      },
      {
        id: 'space-2',
        spaceNumber: 'B2',
        price: 250,
        pricePeriod: 'per_month',
        available: false,
        description: 'Standard car park space - 2.4m x 5.0m',
      },
      {
        id: 'space-3',
        spaceNumber: 'B3',
        price: 250,
        pricePeriod: 'per_month',
        available: false,
        description: 'Standard car park space - 2.4m x 5.0m',
      },
      {
        id: 'space-4',
        spaceNumber: 'B4',
        price: 250,
        pricePeriod: 'per_month',
        available: false,
        description: 'Standard car park space - 2.4m x 5.0m',
      },
      {
        id: 'space-5',
        spaceNumber: 'B5',
        price: 250,
        pricePeriod: 'per_month',
        available: false,
        description: 'Standard car park space - 2.4m x 5.0m',
      },
      {
        id: 'space-6',
        spaceNumber: 'B6',
        price: 250,
        pricePeriod: 'per_month',
        available: false,
        description: 'Standard car park space - 2.4m x 5.0m',
      },
      {
        id: 'space-7',
        spaceNumber: 'B7',
        price: 250,
        pricePeriod: 'per_month',
        available: false,
        description: 'Standard car park space - 2.4m x 5.0m',
      },
    ],
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'car-park',
  },
  {
    id: '15088',
    slug: 'milano-apartment-1508-8-franklin-melbourne',
    title: '1508/8 Franklin Street, Melbourne',
    summary:
      'Fully Renovated & Turn-Key Apartment | Impressive Gross Yield of 7.7% pa',
    type: 'RESIDENTIAL',
    status: 'SOLD',
    price: 427500,
    pricePeriod: 'total',
    address: '1508/8 Franklin Street',
    suburb: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    bedrooms: 2,
    bathrooms: 2,
    floorAreaSqm: 85,
    heroImageUrl: '/15088/Living%20room.jpg',
    description: `High-performing investment in The Milano Apartments with impressive 7.7% gross yield. This beautifully renovated two-bedroom apartment combines strong rental returns with enduring capital growth potential.

**Property Features:**
• Brand new engineered floorboards
• Freshly painted interiors  
• New reverse cycle heating/cooling
• Stylish new Holland blinds
• Double-glazed sliding door
• North-facing balcony with city views
• Stone finishes in kitchen and bathrooms
• Dual ensuite access for both bedrooms
• 2.7m ceilings with floor-to-ceiling glazing

**Building Facilities:**
• 25m heated swimming pool, spa, sauna
• Fully equipped gym and tennis court
• BBQ area and resident kitchen
• 21-seat cinema
• 24-hour building attendant

**Prime Location:**
• Steps from Melbourne Central, QV, Emporium
• Walk to Melbourne University and RMIT
• Close to trams, trains, dining, and entertainment

**Investment Highlights:**
• 7.7% gross yield per annum
• Low vacancy risk
• Strong capital growth prospects
• Premium rental yields

Property Code: 14110 - Please quote this number when phoning or texting.`,
    features: [
      '7.7% gross yield per annum',
      'Brand new engineered floorboards',
      'Freshly painted interiors',
      'New reverse cycle heating/cooling',
      'Stylish new Holland blinds',
      'Double-glazed sliding door',
      'North-facing balcony',
      'Stone finishes in kitchen and bathrooms',
      'Dual ensuite access for both bedrooms',
      '2.7m ceilings with floor-to-ceiling glazing',
      '15th floor with city views',
      '25m heated swimming pool',
      'Spa, sauna, and fully equipped gym',
      'Tennis court and BBQ area',
      '21-seat cinema',
      '24-hour building attendant',
      'Steps from Melbourne Central',
      'Walk to Melbourne University and RMIT',
      'Close to trams, trains, dining, and entertainment',
    ],
    gallery: [
      {
        url: '/15088/Living%20room.jpg',
        alt: 'Modern living room with city views',
        width: 1200,
        height: 800,
      },
      {
        url: '/15088/Kitchen.jpg',
        alt: 'Renovated kitchen with stone finishes',
        width: 1200,
        height: 800,
      },
      {
        url: '/15088/Bedroom%201.jpg',
        alt: 'Master bedroom with ensuite',
        width: 1200,
        height: 800,
      },
      {
        url: '/15088/Bedroom%202.jpg',
        alt: 'Second bedroom with city views',
        width: 1200,
        height: 800,
      },
      {
        url: '/15088/franklin_1508a_8_melbourne_bedroom_HR.jpg',
        alt: 'High-resolution bedroom view',
        width: 1200,
        height: 800,
      },
      {
        url: '/15088/Bathroom.jpg',
        alt: 'Renovated bathroom with stone finishes',
        width: 1200,
        height: 800,
      },
      {
        url: '/15088/balcony%20view.jpg',
        alt: 'North-facing balcony with city views',
        width: 1200,
        height: 800,
      },
      {
        url: '/15088/Main%20building%20(waterpainting).jpg',
        alt: 'The Milano Apartments building exterior',
        width: 1200,
        height: 800,
      },
      {
        url: '/15088/Floorplan%20(1508.8).jpg',
        alt: 'Floor plan of apartment 1508/8',
        width: 1200,
        height: 800,
      },
      {
        url: '/15088/Pool%20&%20Sauna.jpg',
        alt: '25m heated swimming pool and sauna facilities',
        width: 1200,
        height: 800,
      },
      {
        url: '/15088/Gym.jpg',
        alt: 'Fully equipped gym facilities',
        width: 1200,
        height: 800,
      },
      {
        url: '/15088/Tennis%20Court.jpg',
        alt: 'Tennis court facilities',
        width: 1200,
        height: 800,
      },
      {
        url: '/15088/Cinema.jpg',
        alt: '21-seat cinema room',
        width: 1200,
        height: 800,
      },
    ],
    videoUrl: 'https://www.youtube.com/watch?v=0_Bvl6n_HDY',
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'properties',
  },
  {
    id: '1316-lonsdale',
    slug: 'apartment-1316-39-lonsdale-street-melbourne',
    title: '1316/39 Lonsdale Street, Melbourne',
    summary: 'Fully furnished 2-bedroom apartment — Leased',
    type: 'RESIDENTIAL',
    status: 'LEASED',
    address: '1316/39 Lonsdale Street',
    suburb: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    bedrooms: 2,
    bathrooms: 1,
    heroImageUrl: '/placeholder-property.svg',
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'properties',
  },
  {
    id: 'carpark-593-11-daly-st-south-yarra',
    slug: 'carpark-593-11-daly-st-south-yarra',
    title: 'Car Park – 593/11 Daly Street, South Yarra',
    summary: 'Secure car park space in South Yarra — leased',
    type: 'ANCILLARY',
    status: 'LEASED',
    price: 250,
    pricePeriod: 'per_month',
    address: '593/11 Daly Street',
    suburb: 'South Yarra',
    state: 'VIC',
    postcode: '3141',
    heroImageUrl: '/placeholder-property.svg',
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'car-park',
  },
  {
    id: 'carpark-863-58-franklin-st-melbourne',
    slug: 'carpark-863-58-franklin-st-melbourne',
    title: 'Car Park for Rent – 863/58 Franklin Street, Melbourne',
    summary: 'Secure car park space available for rent in Melbourne CBD',
    type: 'ANCILLARY',
    status: 'FOR_RENT',
    price: 240,
    pricePeriod: 'per_month',
    address: '863/58 Franklin Street',
    suburb: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    heroImageUrl: '/placeholder-property.svg',
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'car-park',
  },
  {
    id: 'carpark-501-118-high-st-kew',
    slug: 'carpark-501-118-high-st-kew',
    title: 'Car Park for Rent – 501/118 High Street, Kew',
    summary: 'Secure car park space available for rent in Kew',
    type: 'ANCILLARY',
    status: 'FOR_RENT',
    price: 290,
    pricePeriod: 'per_month',
    address: '501/118 High Street',
    suburb: 'Kew',
    state: 'VIC',
    postcode: '3101',
    heroImageUrl: '/placeholder-property.svg',
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'car-park',
  },
  {
    id: 'carpark-273-135-fitzroy-st-st-kilda',
    slug: 'carpark-273-135-fitzroy-st-st-kilda',
    title: 'Car Park for Rent – 273/135 Fitzroy Street, St Kilda',
    summary: 'Secure car park space available for rent in St Kilda',
    type: 'ANCILLARY',
    status: 'FOR_RENT',
    price: 220,
    pricePeriod: 'per_month',
    address: '273/135 Fitzroy Street',
    suburb: 'St Kilda',
    state: 'VIC',
    postcode: '3182',
    heroImageUrl: '/placeholder-property.svg',
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'car-park',
  },
  {
    id: '6-1070-sydney-rd',
    slug: 'townhouse-6-1070-sydney-road-fawkner',
    title: '6/1070 Sydney Road, Fawkner',
    summary:
      'Modern Boutique Townhouse — Recently Leased | Management Transfer',
    type: 'RESIDENTIAL',
    status: 'LEASED',
    price: 500,
    pricePeriod: 'per_week',
    address: '6/1070 Sydney Road',
    suburb: 'Fawkner',
    state: 'VIC',
    postcode: '3060',
    bedrooms: 2,
    bathrooms: 1,
    carSpaces: 1,
    heroImageUrl: '/6-1070-sydney-rd-fawkner/Living-room-1.jpg',
    description: `Positioned in a well-maintained boutique development, this modern residence offers a seamless blend of comfort, functionality, and low-maintenance living — perfect for professionals, couples, or small families seeking lifestyle and convenience.

Property Highlights:

Light-filled open plan living and dining area with split system heating & cooling
Contemporary kitchen with stainless steel appliances, dishwasher & ample cabinetry
Two well-proportioned bedrooms with built-in robes
Central bathroom with sleek finishes and walk-in shower
Private balcony with outdoor entertaining space — ideal for weekend BBQs
Secure single car garage with additional storage options
Quality finishes throughout with a neutral colour palette

Lifestyle & Location:

Moments to Merri Creek Trail — perfect for walking, cycling, and outdoor lifestyle
Easy access to Gowrie Station for a direct CBD commute
Surrounded by local shops, cafes, and essential amenities along Sydney Road
Close to schools, parks, and community facilities

Why You'll Love It:

A move-in ready home that ticks all the boxes — modern design, practical layout, and a lifestyle location with strong connectivity. Whether you're relaxing indoors or entertaining outdoors, this property delivers effortless living.`,
    features: [
      'Light-filled open plan living and dining area',
      'Split system heating & cooling',
      'Contemporary kitchen with stainless steel appliances',
      'Dishwasher and ample cabinetry',
      'Two bedrooms with built-in robes',
      'Central bathroom with walk-in shower',
      'Private balcony with outdoor entertaining space',
      'Secure single car garage with additional storage',
      'Quality finishes with neutral colour palette',
      'Moments to Merri Creek Trail',
      'Easy access to Gowrie Station — direct CBD commute',
      'Local shops, cafes & amenities along Sydney Road',
      'Close to schools, parks & community facilities',
    ],
    gallery: [
      { url: '/6-1070-sydney-rd-fawkner/Living-room-1.jpg', alt: 'Light-filled open plan living and dining area', width: 1200, height: 800 },
      { url: '/6-1070-sydney-rd-fawkner/Living-room-2.jpg', alt: 'Living room alternate angle', width: 1200, height: 800 },
      { url: '/6-1070-sydney-rd-fawkner/Kitchen.jpg', alt: 'Contemporary kitchen with stainless steel appliances', width: 1200, height: 800 },
      { url: '/6-1070-sydney-rd-fawkner/Bedroom-1.jpg', alt: 'Bedroom 1 with built-in robes', width: 1200, height: 800 },
      { url: '/6-1070-sydney-rd-fawkner/Bedroom-2.jpg', alt: 'Bedroom 2 with built-in robes', width: 1200, height: 800 },
      { url: '/6-1070-sydney-rd-fawkner/Bathroom.jpg', alt: 'Central bathroom with walk-in shower', width: 1200, height: 800 },
      { url: '/6-1070-sydney-rd-fawkner/Balcony.jpg', alt: 'Private balcony with outdoor entertaining space', width: 1200, height: 800 },
      { url: '/6-1070-sydney-rd-fawkner/Garage.jpg', alt: 'Secure single car garage with storage', width: 1200, height: 800 },
      { url: '/6-1070-sydney-rd-fawkner/Front-building.jpg', alt: 'Front building exterior', width: 1200, height: 800 },
      { url: '/6-1070-sydney-rd-fawkner/Street-view.jpg', alt: 'Street view near Sydney Road', width: 1200, height: 800 },
      { url: '/6-1070-sydney-rd-fawkner/Merri-Creek-Trail.jpg', alt: 'Merri Creek Trail nearby', width: 1200, height: 800 },
      { url: '/6-1070-sydney-rd-fawkner/Train-station.jpg', alt: 'Gowrie Station for CBD commute', width: 1200, height: 800 },
    ],
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'properties',
  },
]

export const getCountsByCategory = () => {
  return listings.reduce(
    (acc, l) => {
      acc.all += 1
      if (l.category === 'properties') acc.properties += 1
      if (l.category === 'car-park') acc.carPark += 1
      if (l.category === 'storage-cage') acc.storageCage += 1
      return acc
    },
    { all: 0, properties: 0, carPark: 0, storageCage: 0 }
  )
}

export const getListingsByCategory = (category: ListingCategory) => {
  return listings.filter((l) => l.category === category)
}

export const getListingBySlug = (slug: string) => {
  return listings.find((l) => l.slug === slug)
}
