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
    id: '11',
    slug: 'chic-1br-apartment-fitzroy',
    title: 'Chic 1BR Apartment – Fitzroy Village',
    summary: 'Stylish inner-north living close to cafes and trams',
    type: 'RESIDENTIAL',
    status: 'FOR_RENT',
    price: 520,
    pricePeriod: 'per_week',
    address: '12 Rose Street',
    suburb: 'Fitzroy',
    state: 'VIC',
    bedrooms: 1,
    bathrooms: 1,
    carSpaces: 0,
    floorAreaSqm: 48,
    heroImageUrl: '/Living Room.jpg',
    description:
      'Boutique apartment with timber floors, modern kitchen and balcony, steps to Brunswick Street.',
    features: [
      'Timber floors',
      'Balcony',
      'Modern kitchen',
      'Tram at doorstep',
    ],
    gallery: [
      { url: '/Living Room.jpg', alt: 'Living room', width: 800, height: 600 },
      { url: '/Bedroom 2.jpg', alt: 'Bedroom', width: 800, height: 600 },
      { url: '/Kitchen.jpg', alt: 'Kitchen', width: 800, height: 600 },
    ],
    agent: {
      name: 'Eamon Chau',
      phone: '0413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'properties',
  },
  {
    id: '2',
    slug: 'furnished-apartment-st-kilda',
    title:
      '7/1 Fiona Court, St Kilda, VIC 3182 — Fully Furnished 1-Bedroom in Leafy Cul-de-sac',
    summary:
      'Fully furnished 1-bedroom apartment in a quiet cul-de-sac location in St Kilda',
    type: 'RESIDENTIAL',
    status: 'FOR_RENT',
    price: 450,
    pricePeriod: 'per_week',
    address: '7/1 Fiona Court',
    suburb: 'St Kilda',
    state: 'VIC',
    postcode: '3182',
    bedrooms: 1,
    bathrooms: 1,
    carSpaces: 1,
    floorAreaSqm: 55,
    heroImageUrl: '/Building shot 2.jpg',
    description:
      'Fully furnished 1-bedroom apartment in a quiet cul-de-sac location in St Kilda. Perfect for professionals or couples seeking a comfortable living space.',
    features: [
      'Fully furnished',
      'Quiet cul-de-sac location',
      'Modern kitchen with appliances',
      'Air conditioning',
      'Secure parking space',
      'Close to St Kilda Beach',
      'Public transport nearby',
    ],
    gallery: [
      {
        url: '/Building shot 2.jpg',
        alt: 'Exterior building view',
        width: 800,
        height: 600,
      },
      {
        url: '/Living Room.jpg',
        alt: 'Main living room',
        width: 800,
        height: 600,
      },
      {
        url: '/Living Room 2.jpg',
        alt: 'Living room alternate view',
        width: 800,
        height: 600,
      },
      {
        url: '/Living Room 3.jpg',
        alt: 'Living room with furnishings',
        width: 800,
        height: 600,
      },
      {
        url: '/Living Room 4.jpg',
        alt: 'Living room detail view',
        width: 800,
        height: 600,
      },
      { url: '/Kitchen.jpg', alt: 'Modern kitchen', width: 800, height: 600 },
      { url: '/Bedroom 1.jpg', alt: 'Master bedroom', width: 800, height: 600 },
      {
        url: '/Bedroom 2.jpg',
        alt: 'Bedroom with wardrobe',
        width: 800,
        height: 600,
      },
      { url: '/Bathroom.jpg', alt: 'Modern bathroom', width: 800, height: 600 },
      {
        url: '/Local shop.jpg',
        alt: 'Nearby local amenities',
        width: 800,
        height: 600,
      },
      {
        url: '/Floorplan.jpg',
        alt: 'Property floorplan',
        width: 800,
        height: 600,
      },
    ],
    agent: {
      name: 'Eamon Chau',
      phone: '0413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'properties',
  },
  {
    id: '3',
    slug: 'carpark-211-powlett-st-east-melbourne',
    title: 'Secure Car Park — 211 Powlett St, East Melbourne (Tribeca)',
    summary:
      'Secure car park space in prime East Melbourne location near Tribeca',
    type: 'ANCILLARY',
    status: 'FOR_RENT',
    price: 350,
    pricePeriod: 'per_month',
    address: '211 Powlett Street',
    suburb: 'East Melbourne',
    state: 'VIC',
    postcode: '3002',
    floorAreaSqm: 12,
    heroImageUrl: '/211-Powlett-St-EAST-MELB-landscape.jpg',
    description:
      'Secure car park space in the heart of East Melbourne, conveniently located near Tribeca. Perfect for residents or workers in the area seeking reliable parking.',
    features: [
      'Prime East Melbourne location',
      'Near Tribeca development',
      '24/7 security',
      'Well-lit and maintained',
      'Easy access to CBD',
    ],
    gallery: [
      {
        url: '/211-Powlett-St-EAST-MELB-landscape.jpg',
        alt: '211 Powlett St car park entrance',
        width: 800,
        height: 600,
      },
    ],
    agent: {
      name: 'Eamon Chau',
      phone: '0413 889 388',
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
      phone: '0413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'car-park',
  },
  {
    id: '5',
    slug: 'carparks-63-stead-st-south-melbourne',
    title: 'Car Parks for Rent – 63 Stead Street, South Melbourne',
    summary:
      'Multiple secure car park spaces available for rent in prime South Melbourne location',
    type: 'ANCILLARY',
    status: 'FOR_RENT',
    address: '63 Stead Street',
    suburb: 'South Melbourne',
    state: 'VIC',
    postcode: '3205',
    floorAreaSqm: 12,
    heroImageUrl: '/63-Stead-Street.jpg',
    description:
      'Multiple secure car park spaces available for rent in the heart of South Melbourne. Conveniently located with easy access to the CBD, these spaces offer excellent value for residents and workers in the area.',
    features: [
      'Prime South Melbourne location',
      'Multiple spaces available',
      '24/7 security',
      'Easy CBD access',
      'Close to South Melbourne Market',
      'Public transport nearby',
    ],
    gallery: [
      {
        url: '/63-Stead-Street.jpg',
        alt: '63 Stead Street exterior view',
        width: 800,
        height: 600,
      },
      {
        url: '/76-63-Stead-St.jpg',
        alt: 'Street view of 63 Stead Street',
        width: 800,
        height: 600,
      },
      {
        url: '/55-56-63-Stead.jpg',
        alt: 'Building entrance and surrounding area',
        width: 800,
        height: 600,
      },
    ],
    videoUrl: 'https://www.youtube.com/watch?v=5PO4SiEsIlU',
    agent: {
      name: 'Eamon Chau',
      phone: '0413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'car-park',
  },
  {
    id: '6',
    slug: 'carparks-150-albert-rd-south-melbourne',
    title: 'Carparks for Rent – 150 Albert Rd, South Melbourne',
    summary:
      '7 secure car park spaces available for rent in prime South Melbourne location',
    type: 'ANCILLARY',
    status: 'FOR_RENT',
    address: '150 Albert Road',
    suburb: 'South Melbourne',
    state: 'VIC',
    postcode: '3205',
    floorAreaSqm: 12,
    heroImageUrl: '/150-Albert-Rd-SOUTH-MELBOURNE-1.jpg',
    description:
      '7 secure car park spaces available for rent in the heart of South Melbourne. Conveniently located on Albert Road with easy access to the CBD, these spaces offer excellent value for residents and workers in the area.',
    features: [
      'Prime South Melbourne location on Albert Road',
      '7 spaces available',
      '24/7 security',
      'Easy CBD access',
      'Close to South Melbourne Market',
      'Public transport nearby',
    ],
    gallery: [
      {
        url: '/150-Albert-Rd-SOUTH-MELBOURNE-1.jpg',
        alt: '150 Albert Road exterior building view',
        width: 800,
        height: 600,
      },
      {
        url: '/150-Albert-Rd-SOUTH-MELBOUNRE-2-1.jpg',
        alt: '150 Albert Road interior hallway view',
        width: 800,
        height: 600,
      },
    ],
    videoUrl: 'https://youtu.be/K75u14rFfPQ?si=vrQt6TDqUq-OxCJz',
    spaces: [
      {
        id: 'space-1',
        spaceNumber: 'B1',
        price: 250,
        pricePeriod: 'per_month',
        available: true,
        description: 'Standard car park space - 2.4m x 5.0m',
      },
      {
        id: 'space-2',
        spaceNumber: 'B2',
        price: 250,
        pricePeriod: 'per_month',
        available: true,
        description: 'Standard car park space - 2.4m x 5.0m',
      },
      {
        id: 'space-3',
        spaceNumber: 'B3',
        price: 250,
        pricePeriod: 'per_month',
        available: true,
        description: 'Standard car park space - 2.4m x 5.0m',
      },
      {
        id: 'space-4',
        spaceNumber: 'B4',
        price: 250,
        pricePeriod: 'per_month',
        available: true,
        description: 'Standard car park space - 2.4m x 5.0m',
      },
      {
        id: 'space-5',
        spaceNumber: 'B5',
        price: 250,
        pricePeriod: 'per_month',
        available: true,
        description: 'Standard car park space - 2.4m x 5.0m',
      },
      {
        id: 'space-6',
        spaceNumber: 'B6',
        price: 250,
        pricePeriod: 'per_month',
        available: true,
        description: 'Standard car park space - 2.4m x 5.0m',
      },
      {
        id: 'space-7',
        spaceNumber: 'B7',
        price: 250,
        pricePeriod: 'per_month',
        available: true,
        description: 'Standard car park space - 2.4m x 5.0m',
      },
    ],
    agent: {
      name: 'Eamon Chau',
      phone: '0413 889 388',
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
    status: 'FOR_RENT',
    address: '1508/8 Franklin Street',
    suburb: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    bedrooms: 2,
    bathrooms: 2,
    floorAreaSqm: 85,
    heroImageUrl: '/15088/Living room.jpg',
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
        url: '/15088/Living room.jpg',
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
        url: '/15088/Bedroom 1.jpg',
        alt: 'Master bedroom with ensuite',
        width: 1200,
        height: 800,
      },
      {
        url: '/15088/Bedroom 2.jpg',
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
        url: '/15088/balcony view.jpg',
        alt: 'North-facing balcony with city views',
        width: 1200,
        height: 800,
      },
      {
        url: '/15088/Main building (waterpainting).jpg',
        alt: 'The Milano Apartments building exterior',
        width: 1200,
        height: 800,
      },
      {
        url: '/15088/Floorplan (1508.8).jpg',
        alt: 'Floor plan of apartment 1508/8',
        width: 1200,
        height: 800,
      },
      {
        url: '/15088/Pool & Sauna.jpg',
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
        url: '/15088/Tennis Court.jpg',
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
      phone: '0413 889 388',
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
