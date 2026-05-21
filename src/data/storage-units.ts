// Storage units at The Archive - 601 Little Collins St, Melbourne

export interface StorageUnit {
  id: string
  unitNumber: string
  size: number // in square meters
  sizeCategory:
    | '2sqm'
    | '3sqm'
    | '4sqm'
    | '5sqm'
    | '6sqm'
    | '7sqm'
    | '8sqm'
    | '9sqm'
    | '10sqm'
    | '10sqm+'
  price: number // monthly rent
  status: 'AVAILABLE' | 'LEASED'
  images: string[]
  videoUrl?: string
  description: string
  features: string[]
  floor: string
  clearance?: string
  availableFrom?: string // ISO date string
}

// Storage units with individual photos
export const storageUnits: StorageUnit[] = [
  {
    id: 'archive-unit-d21',
    unitNumber: 'D21',
    size: 9,
    sizeCategory: '9sqm',
    price: 260,
    status: 'AVAILABLE',
    images: [
      '/D21/D21 front.jpg',
      '/D21/D21 internal 1.jpg',
      '/D21/D21 internal 2.jpg',
    ],
    videoUrl: 'https://youtu.be/TouzGw20rDY',
    description:
      'Secure 9sqm storage unit at The Archive. Great for furniture, seasonal items, or small business inventory.',
    features: [
      '24/7 Monitored Security',
      'Individual Lock & Key',
      'Climate Controlled Environment',
      'Goods Lift Access',
      '7 Days a Week Access',
    ],
    floor: 'Level 3',
  },
  {
    id: 'archive-unit-d32b',
    unitNumber: 'D32B',
    size: 2.4,
    sizeCategory: '2sqm',
    price: 70,
    status: 'AVAILABLE',
    images: [
      '/D32/D36b front.jpg',
      '/D32/D36b internal.jpg',
    ],
    videoUrl: 'https://youtu.be/Mj9S80tGVVw',
    description:
      'Entry level unit with internal lighting. Available now, reserve this unit today!',
    features: [
      '24/7 Monitored Security',
      'Individual Lock & Key',
      'Climate Controlled Environment',
      'Goods Lift Access',
      '7 Days a Week Access',
    ],
    floor: 'Level 3',
  },
  {
    id: 'archive-unit-d56',
    unitNumber: 'D56',
    size: 2.4,
    sizeCategory: '2sqm',
    price: 80,
    status: 'AVAILABLE',
    images: [
      '/D56b:601/D56b front.jpg',
      '/D56b:601/D56b internal.jpg',
    ],
    videoUrl: 'https://youtu.be/0q0pWNz2o08',
    description:
      'Entry level unit with internal lighting. Available now, reserve this unit today!',
    features: [
      '24/7 Monitored Security',
      'Individual Lock & Key',
      'Climate Controlled Environment',
      'Goods Lift Access',
      '7 Days a Week Access',
    ],
    floor: 'Level 3',
  },
  {
    id: 'archive-unit-d71',
    unitNumber: 'D71',
    size: 3.2,
    sizeCategory: '3sqm',
    price: 110,
    status: 'AVAILABLE',
    images: [
      '/D71:601/D71 front.jpg',
      '/D71:601/D71 internal.jpg',
    ],
    videoUrl: 'https://youtu.be/ZZAMDxuywTo',
    description:
      'Entry level corner unit, great starter. Available now, reserve this unit today!',
    features: [
      '24/7 Monitored Security',
      'Individual Lock & Key',
      'Climate Controlled Environment',
      'Goods Lift Access',
      '7 Days a Week Access',
    ],
    floor: 'Level 3',
  },
  {
    id: 'archive-unit-d82',
    unitNumber: 'D82',
    size: 2.4,
    sizeCategory: '2sqm',
    price: 80,
    status: 'AVAILABLE',
    images: ['/F5.jpg'],
    description: 'Secure storage unit at The Archive, 601 Little Collins Street. Available now.',
    features: [
      '24/7 Monitored Security',
      'Individual Lock & Key',
      'Climate Controlled Environment',
      'Goods Lift Access',
      '7 Days a Week Access',
    ],
    floor: 'Level 3',
  },
  {
    id: 'archive-unit-d101',
    unitNumber: 'D101',
    size: 8,
    sizeCategory: '8sqm',
    price: 250,
    status: 'AVAILABLE',
    images: ['/F5.jpg'],
    description: 'Spacious storage unit at The Archive, 601 Little Collins Street. Available now.',
    features: [
      '24/7 Monitored Security',
      'Individual Lock & Key',
      'Climate Controlled Environment',
      'Goods Lift Access',
      '7 Days a Week Access',
    ],
    floor: 'Level 3',
  },
  {
    id: 'archive-unit-f73',
    unitNumber: 'F73',
    size: 2.4,
    sizeCategory: '2sqm',
    price: 80,
    status: 'AVAILABLE',
    images: ['/F5.jpg'],
    description: 'Secure storage unit at The Archive, 601 Little Collins Street. Available now.',
    features: [
      '24/7 Monitored Security',
      'Individual Lock & Key',
      'Climate Controlled Environment',
      'Goods Lift Access',
      '7 Days a Week Access',
    ],
    floor: 'Level 5',
  },
  {
    id: 'archive-unit-e105',
    unitNumber: 'E105',
    size: 2.4,
    sizeCategory: '2sqm',
    price: 80,
    status: 'AVAILABLE',
    images: ['/F5.jpg'],
    description: 'Secure storage unit at The Archive, 601 Little Collins Street. Available now.',
    features: [
      '24/7 Monitored Security',
      'Individual Lock & Key',
      'Climate Controlled Environment',
      'Goods Lift Access',
      '7 Days a Week Access',
    ],
    floor: 'Level 4',
  },
  {
    id: 'archive-unit-e132',
    unitNumber: 'E132',
    size: 6,
    sizeCategory: '6sqm',
    price: 220,
    status: 'AVAILABLE',
    images: ['/F5.jpg'],
    description: 'Mid-size storage unit at The Archive, 601 Little Collins Street. Available now.',
    features: [
      '24/7 Monitored Security',
      'Individual Lock & Key',
      'Climate Controlled Environment',
      'Goods Lift Access',
      '7 Days a Week Access',
    ],
    floor: 'Level 4',
  },
  {
    id: 'archive-unit-f5',
    unitNumber: 'F5',
    size: 10,
    sizeCategory: '10sqm+',
    price: 400,
    status: 'AVAILABLE',
    images: ['/F5.jpg'],
    description: 'Large storage unit at The Archive, 601 Little Collins Street. Ideal for business inventory or large furniture. Available now.',
    features: [
      '24/7 Monitored Security',
      'Individual Lock & Key',
      'Climate Controlled Environment',
      'Goods Lift Access',
      '7 Days a Week Access',
    ],
    floor: 'Level 5',
  },
  {
    id: 'archive-unit-f36',
    unitNumber: 'F36',
    size: 6,
    sizeCategory: '6sqm',
    price: 220,
    status: 'AVAILABLE',
    images: ['/F5.jpg'],
    description: 'Mid-size storage unit at The Archive, 601 Little Collins Street. Available now.',
    features: [
      '24/7 Monitored Security',
      'Individual Lock & Key',
      'Climate Controlled Environment',
      'Goods Lift Access',
      '7 Days a Week Access',
    ],
    floor: 'Level 5',
  },
  {
    id: 'archive-unit-g46',
    unitNumber: 'G46',
    size: 6,
    sizeCategory: '6sqm',
    price: 200,
    status: 'AVAILABLE',
    images: ['/F5.jpg'],
    description: 'Mid-size storage unit at The Archive, 601 Little Collins Street. Available now.',
    features: [
      '24/7 Monitored Security',
      'Individual Lock & Key',
      'Climate Controlled Environment',
      'Goods Lift Access',
      '7 Days a Week Access',
    ],
    floor: 'Level 6',
  },
  {
    id: 'archive-unit-h23',
    unitNumber: 'H23',
    size: 6,
    sizeCategory: '6sqm',
    price: 200,
    status: 'AVAILABLE',
    images: ['/F5.jpg'],
    description: 'Mid-size storage unit at The Archive, 601 Little Collins Street. Available now.',
    features: [
      '24/7 Monitored Security',
      'Individual Lock & Key',
      'Climate Controlled Environment',
      'Goods Lift Access',
      '7 Days a Week Access',
    ],
    floor: 'Level 7',
  },
  {
    id: 'archive-unit-h42',
    unitNumber: 'H42',
    size: 9,
    sizeCategory: '9sqm',
    price: 350,
    status: 'AVAILABLE',
    images: ['/F5.jpg'],
    description: 'Large storage unit at The Archive, 601 Little Collins Street. Available now.',
    features: [
      '24/7 Monitored Security',
      'Individual Lock & Key',
      'Climate Controlled Environment',
      'Goods Lift Access',
      '7 Days a Week Access',
    ],
    floor: 'Level 7',
  },
]

// Facility information
export const archiveFacility = {
  name: 'The Archive',
  address: '601 Little Collins Street',
  suburb: 'MELBOURNE',
  state: 'VIC',
  postcode: '3000',
  buildingImage: '/F5.jpg',
  videoUrl: '',
  description: `601 Little Collins Street – Secure 24/7 Storage Facility

Located in the heart of Melbourne's CBD, this modern storage facility offers safe, clean, and convenient storage solutions within 'The Archive' building at 601 Little Collins Street, MELBOURNE. Each unit is individually secured, accessible 7-days a week, and designed for personal or business use — ideal for storing documents, furniture, stock, or personal belongings.

Enjoy 24/7 monitored security, goods-lift access, and a well-maintained environment just moments from Southern Cross Station.`,
  features: [
    '24/7 Monitored Security',
    '7-Day Week Access',
    'Goods Lift Available',
    'Climate Controlled',
    'Individual Unit Locks',
    'CBD Location',
    'Near Southern Cross Station',
    'Personal & Business Use',
  ],
  contact: {
    phone: '+61 413 889 388',
    email: 'admin@touchwoodasset.com',
  },
}

// Helper function to get units by size
export function getUnitsBySize(sizeCategory?: string): StorageUnit[] {
  if (!sizeCategory) return storageUnits
  return storageUnits.filter((unit) => unit.sizeCategory === sizeCategory)
}

// Helper function to get available units
export function getAvailableUnits(): StorageUnit[] {
  return storageUnits.filter((unit) => unit.status === 'AVAILABLE')
}

// Helper function to get units by price range
export function getUnitsByPriceRange(
  minPrice?: number,
  maxPrice?: number
): StorageUnit[] {
  return storageUnits.filter((unit) => {
    if (minPrice && unit.price < minPrice) return false
    if (maxPrice && unit.price > maxPrice) return false
    return true
  })
}
