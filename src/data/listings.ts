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
    summary:
      'Premium secure parking near MCG, hospitals and CBD - perfect for professionals',
    type: 'ANCILLARY',
    status: 'FOR_RENT',
    price: 350,
    pricePeriod: 'per_month',
    address: '31/211 Powlett Street',
    suburb: 'East Melbourne',
    state: 'VIC',
    postcode: '3002',
    floorAreaSqm: 12,
    heroImageUrl: '/211.jpg',
    description:
      'Clearance: 2.1m\n\nSecure Car Park for Lease at Tribeca, East Melbourne (lot. 31)\n\nTired of circling the block for parking near the CBD, MCG or hospitals.\n\nEnjoy the convenience and peace of mind with this secure car parking space in one of East Melbourne most prestigious pockets.\n\nLocation highlights:\n\nEntry via Powlett St, just off Wellington Parade. 5mins walk to MCG, moments to Jolimont Station, Fitzroy Gardens and CBD. Easy access to St. Vincent Hospital, Epworth Freemasons, and Melbourne medical precinct.\n\nAsking $350 per month',
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
    status: 'FOR_RENT',
    price: 350,
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
    id: '5',
    slug: 'carparks-63-stead-st-south-melbourne',
    title: 'Affordable Parking Options– 63 Stead St, South Melbourne',
    summary:
      'Convenient and affordable parking in South Melbourne with undercover and open bay options',
    type: 'ANCILLARY',
    status: 'FOR_RENT',
    address: '63 Stead Street',
    suburb: 'South Melbourne',
    state: 'VIC',
    postcode: '3205',
    floorAreaSqm: 12,
    heroImageUrl: '/happy/63%20Stead%20Street.jpg',
    description:
      'Looking for convenient and affordable parking in South Melbourne?\n\nWe have three exclusive car parks available now, perfectly located just minutes from:\nSouth Melbourne Market, Clarendon Street precinct, Albert Park Lake, with quick access to the CBD, St Kilda Road and CityLink.\n\nAvailable spaces:\n• 1x Undercover bay – $250 per month\n• 1x Open bay – $250 per month (LEASED)\n• 1x Open bay – $250 per month\n\nSecure, accessible, and ideal for local residents or professionals seeking reliable parking in a prime location.\nEnquire today to reserve your space!',
    features: [
      'Prime South Melbourne location',
      'Minutes from South Melbourne Market',
      'Close to Clarendon Street precinct',
      'Near Albert Park Lake',
      'Quick access to CBD',
      'Easy access to St Kilda Road',
      'Close to CityLink',
      'Undercover and open bay options',
      'Secure parking',
      'Ideal for residents and professionals',
    ],
    gallery: [
      {
        url: '/happy/63%20Stead%20Street.jpg',
        alt: '63 Stead Street exterior view',
        width: 1200,
        height: 800,
      },
      {
        url: '/happy/76.63%20Stead%20St.jpg',
        alt: 'Street view of 63 Stead Street',
        width: 1200,
        height: 800,
      },
      {
        url: '/happy/55&56.63%20Stead.jpg',
        alt: 'Building entrance and surrounding area',
        width: 1200,
        height: 800,
      },
    ],
    videoUrl: 'https://youtu.be/5PO4SiEsIlU',
    spaces: [
      {
        id: 'space-1',
        spaceNumber: 'Undercover Bay 1',
        price: 250,
        pricePeriod: 'per_month',
        available: true,
        description: 'Undercover car park bay',
      },
      {
        id: 'space-2',
        spaceNumber: 'Open Bay 1',
        price: 250,
        pricePeriod: 'per_month',
        available: false,
        description: 'Open car park bay - LEASED',
      },
      {
        id: 'space-3',
        spaceNumber: 'Open Bay 2',
        price: 250,
        pricePeriod: 'per_month',
        available: true,
        description: 'Open car park bay',
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
    id: '212-600-little-bourke',
    slug: 'studio-apartment-212-600-little-bourke-melbourne',
    title: '212/600 Little Bourke Street, Melbourne',
    summary:
      'Set-and-forget investment with a steady return - fixed 5-year lease with YESH Hotel',
    type: 'RESIDENTIAL',
    status: 'SOLD',
    price: 106500,
    pricePeriod: 'total',
    address: '212/600 Little Bourke Street',
    suburb: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    bedrooms: 1,
    bathrooms: 1,
    carSpaces: 0,
    floorAreaSqm: 19,
    heroImageUrl: '/john/Studio%201.jpg',
    description: `Set-and-forget investment with a steady return - fixed 5-year lease with YESH Hotel.

Burst onto the investment scene with this sleek CBD lifestyle pad - an easy-care studio apartment featuring a dedicated study zone, perfect for executives or savvy investors seeking reliable, hands-off returns.

Positioned in the vibrant heart of Melbourne, you're just moments from iconic landmarks including Flagstaff Gardens, Queen Victoria Market, Bourke Street Mall, and public transport options that put the entire city at your feet.

World-class dining, cultural attractions, and entertainment hubs like Melbourne Aquarium, Crown Casino, Marvel Stadium, and the theatre district all lie within effortless reach.

**Key Features:**
• Open-plan studio layout
• Study desk, ideal for remote work or executive stays
• Bathroom with combined shower/bath and toilet
• Large window drawing in natural light
• Split system heating and air conditioning
• Surrounded by Melbourne's best restaurants, nightlife, and shopping

**Investment Snapshot:**
A rare passive investment opportunity - secure it today and enjoy guaranteed returns tomorrow.`,
    features: [
      'Open-plan studio layout',
      'Study desk for remote work',
      'Combined shower/bath and toilet',
      'Large window with natural light',
      'Split system heating and air conditioning',
      'Fixed 5-year lease with YESH Hotel',
      'CBD location',
      'Near Flagstaff Gardens',
      'Near Queen Victoria Market',
      'Near Bourke Street Mall',
      'Close to Melbourne Aquarium',
      'Close to Crown Casino',
      'Close to Marvel Stadium',
      'Close to theatre district',
      'Excellent public transport access',
    ],
    gallery: [
      {
        url: '/john/Studio%201.jpg',
        alt: 'Open-plan studio apartment interior',
        width: 1200,
        height: 800,
      },
      {
        url: '/john/Building%20shot%201.jpg',
        alt: 'Building exterior at 600 Little Bourke Street',
        width: 1200,
        height: 800,
      },
      {
        url: '/john/Studio%202.jpg',
        alt: 'Studio apartment with study area',
        width: 1200,
        height: 800,
      },
      {
        url: '/john/Studio%203.jpg',
        alt: 'Living space with natural light',
        width: 1200,
        height: 800,
      },
      {
        url: '/john/Bathroom.jpg',
        alt: 'Modern bathroom with shower/bath combo',
        width: 1200,
        height: 800,
      },
      {
        url: '/john/Floorplan.jpg',
        alt: 'Studio apartment floor plan',
        width: 1200,
        height: 800,
      },
    ],
    videoUrl: 'https://youtu.be/cQmfpK0pD2E',
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
