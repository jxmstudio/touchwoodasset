export type ListingCategory = 'properties' | 'car-park' | 'storage-cage'

export interface ListingItem {
  id: string
  slug: string
  title: string
  summary: string
  type: 'RESIDENTIAL' | 'COMMERCIAL' | 'ANCILLARY'
  status: 'AVAILABLE' | 'UNDER_OFFER' | 'SOLD' | 'LEASED'
  price?: number
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
  agent?: { name: string; phone: string; email: string }
  category: ListingCategory
}

// Centralised listings dataset to be reused by list and detail pages
export const listings: ListingItem[] = [
  {
    id: '1',
    slug: 'luxury-apartment-sydney-harbour',
    title: 'Luxury Apartment with Sydney Harbour Views',
    summary: 'Stunning 3-bedroom apartment with panoramic harbour views and premium finishes',
    type: 'RESIDENTIAL',
    status: 'AVAILABLE',
    price: 2500000,
    address: '123 Harbour Drive',
    suburb: 'Sydney',
    state: 'NSW',
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 2,
    floorAreaSqm: 180,
    heroImageUrl: '/placeholder-property.svg',
    description: 'This exceptional apartment offers breathtaking views of Sydney Harbour and the Opera House. Featuring premium finishes throughout, this 3-bedroom, 2-bathroom home is perfect for those seeking luxury living in the heart of Sydney.',
    features: [
      'Panoramic harbour views',
      'Premium finishes throughout',
      'Open plan living and dining',
      'Modern kitchen with stone benchtops',
      'Master bedroom with ensuite',
      'Balcony with harbour views',
      'Secure parking for 2 cars',
      'Building amenities including pool and gym'
    ],
    gallery: [
      { url: '/placeholder-property.svg', alt: 'Living room with harbour views', width: 800, height: 600 },
      { url: '/placeholder-property.svg', alt: 'Modern kitchen', width: 800, height: 600 }
    ],
    agent: { name: 'Eamon Chau', phone: '0413 889 388', email: 'admin@touchwoodasset.com' },
    category: 'properties'
  },
  {
    id: '2',
    slug: 'modern-office-space-cbd',
    title: 'Modern Office Space in CBD',
    summary: 'Premium office space in the heart of Sydney CBD with modern amenities',
    type: 'COMMERCIAL',
    status: 'AVAILABLE',
    price: 85000,
    address: '456 Business Street',
    suburb: 'Sydney',
    state: 'NSW',
    floorAreaSqm: 200,
    heroImageUrl: '/placeholder-property.svg',
    description: 'Modern office space in the heart of Sydney CBD, perfect for growing businesses. Features open plan layout, modern amenities, and excellent transport links.',
    features: ['Open plan layout','Modern amenities','Excellent transport links','Air conditioning'],
    gallery: [
      { url: '/placeholder-property.svg', alt: 'Open plan office space', width: 800, height: 600 }
    ],
    agent: { name: 'Eamon Chau', phone: '0413 889 388', email: 'admin@touchwoodasset.com' },
    category: 'properties'
  },
  {
    id: '3',
    slug: 'secure-storage-units-parramatta',
    title: 'Secure Storage Units in Parramatta',
    summary: 'Convenient and secure storage solutions in the heart of Parramatta',
    type: 'ANCILLARY',
    status: 'AVAILABLE',
    price: 150,
    address: '789 Storage Lane',
    suburb: 'Parramatta',
    state: 'NSW',
    postcode: '2150',
    floorAreaSqm: 25,
    heroImageUrl: '/placeholder-property.svg',
    category: 'storage-cage'
  },
  {
    id: '4',
    slug: 'family-home-northern-beaches',
    title: 'Family Home in Northern Beaches',
    summary: 'Spacious 4-bedroom family home in sought-after Northern Beaches location',
    type: 'RESIDENTIAL',
    status: 'UNDER_OFFER',
    price: 3200000,
    address: '321 Beach Road',
    suburb: 'Manly',
    state: 'NSW',
    postcode: '2095',
    bedrooms: 4,
    bathrooms: 3,
    carSpaces: 3,
    floorAreaSqm: 280,
    heroImageUrl: '/placeholder-property.svg',
    category: 'properties'
  },
  {
    id: '5',
    slug: 'retail-space-chatswood',
    title: 'Prime Retail Space in Chatswood',
    summary: 'High-traffic retail space in the bustling Chatswood shopping district',
    type: 'COMMERCIAL',
    status: 'LEASED',
    price: 65000,
    address: '654 Shopping Centre Drive',
    suburb: 'Chatswood',
    state: 'NSW',
    postcode: '2067',
    floorAreaSqm: 150,
    heroImageUrl: '/placeholder-property.svg',
    category: 'properties'
  },
  {
    id: '6',
    slug: 'car-park-spaces-cbd',
    title: 'CBD Car Park Spaces',
    summary: 'Convenient car parking spaces in Sydney CBD for daily or monthly rental',
    type: 'ANCILLARY',
    status: 'SOLD',
    price: 80,
    address: '987 Parking Street',
    suburb: 'Sydney',
    state: 'NSW',
    postcode: '2000',
    heroImageUrl: '/placeholder-property.svg',
    category: 'car-park'
  },
  {
    id: '7',
    slug: 'secure-car-park-melbourne',
    title: 'Secure Car Park - Melbourne CBD',
    summary: 'Secure underground car park in prime Melbourne CBD location',
    type: 'ANCILLARY',
    status: 'AVAILABLE',
    price: 45000,
    address: '789 Collins Street',
    suburb: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    floorAreaSqm: 12,
    heroImageUrl: '/placeholder-property.svg',
    category: 'car-park'
  },
  {
    id: '8',
    slug: 'storage-cage-sydney',
    title: 'Storage Cage - Sydney',
    summary: 'Secure storage cage in Sydney apartment building',
    type: 'ANCILLARY',
    status: 'AVAILABLE',
    price: 15000,
    address: '321 George Street',
    suburb: 'Sydney',
    state: 'NSW',
    postcode: '2000',
    floorAreaSqm: 3,
    heroImageUrl: '/placeholder-property.svg',
    category: 'storage-cage'
  }
]

export const getCountsByCategory = () => {
  return listings.reduce(
    (acc, l) => {
      acc.all += 1
      acc[l.category] += 1
      return acc
    },
    { all: 0, properties: 0, 'car-park': 0, 'storage-cage': 0 } as { all: number; properties: number; 'car-park': number; 'storage-cage': number }
  )
}


