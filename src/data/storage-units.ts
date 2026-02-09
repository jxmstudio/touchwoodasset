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
    id: 'archive-unit-f37',
    unitNumber: 'F37/601',
    size: 5.2,
    sizeCategory: '5sqm',
    price: 220,
    status: 'AVAILABLE',
    images: [
      '/F37/F37 (image 1).jpg',
      '/F37/F37 (image 2).jpg',
      '/F37/F37 (image 3).jpg',
      '/F37/F37 (image 4).jpg',
    ],
    videoUrl: 'https://youtu.be/v3mNifLJoJk',
    description:
      'Rare corner unit with ample natural lighting. Available now, reserve this unit today!',
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
    id: 'archive-unit-e71',
    unitNumber: 'E71/601',
    size: 4,
    sizeCategory: '4sqm',
    price: 150,
    status: 'AVAILABLE',
    images: [
      '/E71:601/E71.601 (1).jpg',
      '/E71:601/E71.601 (2).jpg',
      '/E71:601/E71.601 (3).jpg',
    ],
    videoUrl: 'https://youtu.be/OPsJHtjoCAg',
    description:
      'Long unit, great for storing items that need extra length, equipped with internal lighting. Available now, reserve this unit today!',
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
    id: 'archive-unit-e68',
    unitNumber: 'E68/601',
    size: 10.4,
    sizeCategory: '10sqm+',
    price: 300,
    status: 'AVAILABLE',
    images: [
      '/E68.601/E68.601 (image 1).jpg',
      '/E68.601/E68.601 (image 2).jpg',
      '/E68.601/E68.601 (image 3).jpg',
      '/E68.601/E68.601 (image 4).jpg',
      '/E68.601/E68.601 (image 5).jpg',
    ],
    videoUrl: 'https://youtu.be/gqFMKpz3VB4',
    description:
      'Excellent commercial size storage, comes equipped with shelving and internal lighting. Available now, reserve this unit today!',
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
    id: 'archive-unit-e105',
    unitNumber: 'E105/601',
    size: 2.0,
    sizeCategory: '2sqm',
    price: 70,
    status: 'AVAILABLE',
    images: [
      '/E105.601/E105.601 (image 1).jpg',
      '/E105.601/E105.601 (image 2).jpg',
    ],
    videoUrl: 'https://youtu.be/JCy_PhzWyJQ',
    description:
      'Entry level unit with internal lighting. Available now, reserve this unit today!',
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
    id: 'archive-unit-e88',
    unitNumber: 'E88/601',
    size: 2.4,
    sizeCategory: '2sqm',
    price: 80,
    status: 'AVAILABLE',
    images: [
      '/E88.601/E88.601 (image 1).jpg',
      '/E88.601/E88.601 (image 2).jpg',
      '/E88.601/E88.601 (image 3).jpg',
    ],
    videoUrl: 'https://youtu.be/3uwXDDLnef0',
    description:
      'Entry level unit with internal lighting. Available now, reserve this unit today!',
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
    id: 'archive-unit-e21',
    unitNumber: 'E21/601',
    size: 3.4,
    sizeCategory: '3sqm',
    price: 120,
    status: 'AVAILABLE',
    images: [
      '/E21.601/E21.601 (image 1).jpg',
      '/E21.601/E21.601 (image 2).jpg',
      '/E21.601/E21.601 (image 3).jpg',
    ],
    videoUrl: 'https://youtu.be/2HR5NQKQZ_Q',
    description:
      'Great starter unit with internal lighting. Available now, reserve this unit today!',
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
    id: 'archive-unit-d71',
    unitNumber: 'D71/601',
    size: 3.2,
    sizeCategory: '3sqm',
    price: 120,
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
    unitNumber: 'D82/601',
    size: 2.4,
    sizeCategory: '2sqm',
    price: 70,
    status: 'AVAILABLE',
    images: [
      '/D82:601/D82 front.jpg',
      '/D82:601/D82 internal.jpg',
    ],
    videoUrl: 'https://youtu.be/cRGPVLAD0_8',
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
    id: 'archive-unit-d56b',
    unitNumber: 'D56b/601',
    size: 2.4,
    sizeCategory: '2sqm',
    price: 70,
    status: 'LEASED',
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
    id: 'archive-unit-d32b',
    unitNumber: 'D32b/601',
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
