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
  status: 'AVAILABLE' | 'UNDER_OFFER' | 'SOLD' | 'LEASED' | 'COMING_SOON' | 'FOR_RENT'
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
    id: '1',
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
    description: 'Secure underground car park in the heart of Melbourne CBD, perfect for residents or workers in the area.',
    features: ['CBD location','24/7 security','Underground parking','Monthly rates available'],
    agent: { name: 'Eamon Chau', phone: '0413 889 388', email: 'admin@touchwoodasset.com' },
    category: 'car-park'
  },
  {
    id: '2',
    slug: 'furnished-apartment-st-kilda',
    title: '7/1 Fiona Court, St Kilda, VIC 3182 — Fully Furnished 1-Bedroom in Leafy Cul-de-sac',
    summary: 'Fully furnished 1-bedroom apartment in a quiet cul-de-sac location in St Kilda',
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
    heroImageUrl: '/placeholder-property.svg',
    description: 'Fully furnished 1-bedroom apartment in a quiet cul-de-sac location in St Kilda. Perfect for professionals or couples seeking a comfortable living space.',
    features: [
      'Fully furnished',
      'Quiet cul-de-sac location',
      'Modern kitchen with appliances',
      'Air conditioning',
      'Secure parking space',
      'Close to St Kilda Beach',
      'Public transport nearby'
    ],
    gallery: [
      { url: '/placeholder-property.svg', alt: 'Living room with modern furnishings', width: 800, height: 600 },
      { url: '/placeholder-property.svg', alt: 'Modern kitchen', width: 800, height: 600 },
      { url: '/placeholder-property.svg', alt: 'Bedroom with built-in wardrobe', width: 800, height: 600 }
    ],
    agent: { name: 'Eamon Chau', phone: '0413 889 388', email: 'admin@touchwoodasset.com' },
    category: 'properties'
  },
  {
    id: '3',
    slug: 'carpark-211-powlett-st-east-melbourne',
    title: 'Secure Car Park — 211 Powlett St, East Melbourne (Tribeca)',
    summary: 'Secure car park space in prime East Melbourne location near Tribeca',
    type: 'ANCILLARY',
    status: 'FOR_RENT',
    price: 350,
    pricePeriod: 'per_month',
    address: '211 Powlett Street',
    suburb: 'East Melbourne',
    state: 'VIC',
    postcode: '3002',
    floorAreaSqm: 12,
    heroImageUrl: '/placeholder-property.svg',
    description: 'Secure car park space in the heart of East Melbourne, conveniently located near Tribeca. Perfect for residents or workers in the area seeking reliable parking.',
    features: [
      'Prime East Melbourne location',
      'Near Tribeca development',
      '24/7 security',
      'Well-lit and maintained',
      'Easy access to CBD'
    ],
    agent: { name: 'Eamon Chau', phone: '0413 889 388', email: 'admin@touchwoodasset.com' },
    category: 'car-park'
  },
  {
    id: '4',
    slug: 'carpark-st-kilda-tower-queens-lane',
    title: 'Car Park for Rent – St Kilda Tower (Entry via Queens Ln)',
    summary: 'Secure car park space in St Kilda Tower with convenient Queens Lane access',
    type: 'ANCILLARY',
    status: 'FOR_RENT',
    price: 350,
    pricePeriod: 'per_month',
    address: 'St Kilda Tower, Entry via Queens Lane',
    suburb: 'St Kilda',
    state: 'VIC',
    postcode: '3182',
    floorAreaSqm: 12,
    heroImageUrl: '/placeholder-property.svg',
    description: 'Secure car park space in St Kilda Tower with convenient Queens Lane access. Perfect for residents or workers in the St Kilda area.',
    features: [
      'St Kilda Tower location',
      'Queens Lane access',
      '24/7 security',
      'Well-maintained',
      'Close to St Kilda Beach'
    ],
    agent: { name: 'Eamon Chau', phone: '0413 889 388', email: 'admin@touchwoodasset.com' },
    category: 'car-park'
  },
  {
    id: '5',
    slug: 'carparks-63-stead-st-south-melbourne',
    title: 'Car Parks for Rent – 63 Stead Street, South Melbourne',
    summary: 'Multiple secure car park spaces available for rent in prime South Melbourne location',
    type: 'ANCILLARY',
    status: 'FOR_RENT',
    address: '63 Stead Street',
    suburb: 'South Melbourne',
    state: 'VIC',
    postcode: '3205',
    floorAreaSqm: 12,
    heroImageUrl: '/placeholder-property.svg',
    description: 'Multiple secure car park spaces available for rent in the heart of South Melbourne. Conveniently located with easy access to the CBD, these spaces offer excellent value for residents and workers in the area.',
    features: [
      'Prime South Melbourne location',
      'Multiple spaces available',
      '24/7 security',
      'Easy CBD access',
      'Close to South Melbourne Market',
      'Public transport nearby'
    ],
    gallery: [
      { url: '/placeholder-property.svg', alt: 'South Melbourne car park entrance', width: 800, height: 600 },
      { url: '/placeholder-property.svg', alt: 'Secure car park spaces', width: 800, height: 600 }
    ],
    agent: { name: 'Eamon Chau', phone: '0413 889 388', email: 'admin@touchwoodasset.com' },
    category: 'car-park'
  },
  {
    id: '6',
    slug: 'carparks-150-albert-rd-south-melbourne',
    title: 'Carparks for Rent – 150 Albert Rd, South Melbourne',
    summary: '7 secure car park spaces available for rent in prime South Melbourne location',
    type: 'ANCILLARY',
    status: 'FOR_RENT',
    address: '150 Albert Road',
    suburb: 'South Melbourne',
    state: 'VIC',
    postcode: '3205',
    floorAreaSqm: 12,
    heroImageUrl: '/placeholder-property.svg',
    description: '7 secure car park spaces available for rent in the heart of South Melbourne. Conveniently located on Albert Road with easy access to the CBD, these spaces offer excellent value for residents and workers in the area.',
    features: [
      'Prime South Melbourne location on Albert Road',
      '7 spaces available',
      '24/7 security',
      'Easy CBD access',
      'Close to South Melbourne Market',
      'Public transport nearby'
    ],
    videoUrl: 'https://youtu.be/K75u14rFfPQ?si=vrQt6TDqUq-OxCJz',
    spaces: [
      {
        id: 'space-1',
        spaceNumber: 'B1',
        price: 250,
        pricePeriod: 'per_month',
        available: true,
        description: 'Standard car park space - 2.4m x 5.0m'
      },
      {
        id: 'space-2',
        spaceNumber: 'B2',
        price: 250,
        pricePeriod: 'per_month',
        available: true,
        description: 'Standard car park space - 2.4m x 5.0m'
      },
      {
        id: 'space-3',
        spaceNumber: 'B3',
        price: 250,
        pricePeriod: 'per_month',
        available: true,
        description: 'Standard car park space - 2.4m x 5.0m'
      },
      {
        id: 'space-4',
        spaceNumber: 'B4',
        price: 250,
        pricePeriod: 'per_month',
        available: true,
        description: 'Standard car park space - 2.4m x 5.0m'
      },
      {
        id: 'space-5',
        spaceNumber: 'B5',
        price: 250,
        pricePeriod: 'per_month',
        available: true,
        description: 'Standard car park space - 2.4m x 5.0m'
      },
      {
        id: 'space-6',
        spaceNumber: 'B6',
        price: 250,
        pricePeriod: 'per_month',
        available: true,
        description: 'Standard car park space - 2.4m x 5.0m'
      },
      {
        id: 'space-7',
        spaceNumber: 'B7',
        price: 250,
        pricePeriod: 'per_month',
        available: true,
        description: 'Standard car park space - 2.4m x 5.0m'
      }
    ],
    agent: { name: 'Eamon Chau', phone: '0413 889 388', email: 'admin@touchwoodasset.com' },
    category: 'car-park'
  },
  {
    id: '7',
    slug: 'carpark-a20-1-queens-road-melbourne-3004',
    title: 'Car Park for Rent – A20/1 Queens Road (St Kilda Tower, Entry via Queens Ln)',
    summary: 'Secure car park space in St Kilda Tower with convenient Queens Lane access',
    type: 'ANCILLARY',
    status: 'FOR_RENT',
    price: 350,
    pricePeriod: 'per_month',
    address: 'A20/1 Queens Road',
    suburb: 'Melbourne',
    state: 'VIC',
    postcode: '3004',
    floorAreaSqm: 12,
    heroImageUrl: '/placeholder-property.svg',
    description: 'Secure car park space in St Kilda Tower with convenient Queens Lane access. This well-maintained space offers easy entry and exit with 24/7 security.',
    features: [
      '24/7 Security',
      'Easy Access via Queens Lane',
      'Well-lit and maintained',
      'Convenient CBD location',
      'Monthly rental available'
    ],
    videoUrl: 'https://youtu.be/X_l_lQjp-HA',
    agent: { name: 'Eamon Chau', phone: '0413 889 388', email: 'admin@touchwoodasset.com' },
    category: 'car-park'
  }
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
