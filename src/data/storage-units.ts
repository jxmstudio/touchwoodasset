// Storage units at The Archive - 601 Little Collins St, Melbourne
// This file contains placeholder data - client will provide 70+ units with photos/videos

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

// Placeholder storage units - awaiting client photos/videos
export const storageUnits: StorageUnit[] = [
  {
    id: 'archive-unit-001',
    unitNumber: 'Unit 001',
    size: 2,
    sizeCategory: '2sqm',
    price: 180,
    status: 'AVAILABLE',
    images: ['/F5.jpg'], // Placeholder - to be replaced
    description:
      '2sqm secure storage unit at The Archive. Perfect for personal belongings, documents, or small inventory.',
    features: [
      '24/7 Monitored Security',
      'Individual Lock & Key',
      'Climate Controlled Environment',
      'Goods Lift Access',
      '7 Days a Week Access',
    ],
    floor: 'Level 2',
  },
  {
    id: 'archive-unit-002',
    unitNumber: 'Unit 002',
    size: 3,
    sizeCategory: '3sqm',
    price: 220,
    status: 'AVAILABLE',
    images: ['/F5.jpg'], // Placeholder - to be replaced
    description:
      '3sqm secure storage unit at The Archive. Ideal for small furniture, boxes, or business stock.',
    features: [
      '24/7 Monitored Security',
      'Individual Lock & Key',
      'Climate Controlled Environment',
      'Goods Lift Access',
      '7 Days a Week Access',
    ],
    floor: 'Level 2',
  },
  {
    id: 'archive-unit-003',
    unitNumber: 'Unit 003',
    size: 4,
    sizeCategory: '4sqm',
    price: 260,
    status: 'LEASED',
    images: ['/F5.jpg'], // Placeholder - to be replaced
    description:
      '4sqm secure storage unit at The Archive. Great for furniture, seasonal items, or small business inventory.',
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
    id: 'archive-unit-004',
    unitNumber: 'Unit 004',
    size: 5,
    sizeCategory: '5sqm',
    price: 300,
    status: 'AVAILABLE',
    images: ['/F5.jpg'], // Placeholder - to be replaced
    description:
      '5sqm secure storage unit at The Archive. Suitable for larger furniture pieces or business stock.',
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
    id: 'archive-unit-005',
    unitNumber: 'Unit 005',
    size: 6,
    sizeCategory: '6sqm',
    price: 340,
    status: 'AVAILABLE',
    images: ['/F5.jpg'], // Placeholder - to be replaced
    description:
      '6sqm secure storage unit at The Archive. Perfect for household moves or business archives.',
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
    id: 'archive-unit-006',
    unitNumber: 'Unit 006',
    size: 8,
    sizeCategory: '8sqm',
    price: 420,
    status: 'AVAILABLE',
    images: ['/F5.jpg'], // Placeholder - to be replaced
    description:
      '8sqm secure storage unit at The Archive. Large space for multiple rooms of furniture or inventory.',
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
    id: 'archive-unit-007',
    unitNumber: 'Unit 007',
    size: 10,
    sizeCategory: '10sqm',
    price: 500,
    status: 'AVAILABLE',
    images: ['/F5.jpg'], // Placeholder - to be replaced
    description:
      '10sqm secure storage unit at The Archive. Spacious unit for large household or commercial needs.',
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
    id: 'archive-unit-008',
    unitNumber: 'Unit 008',
    size: 12,
    sizeCategory: '10sqm+',
    price: 580,
    status: 'LEASED',
    images: ['/F5.jpg'], // Placeholder - to be replaced
    description:
      '12sqm secure storage unit at The Archive. Premium large-scale storage solution.',
    features: [
      '24/7 Monitored Security',
      'Individual Lock & Key',
      'Climate Controlled Environment',
      'Goods Lift Access',
      '7 Days a Week Access',
    ],
    floor: 'Level 5',
  },
]

// Facility information
export const archiveFacility = {
  name: 'The Archive',
  address: '601 Little Collins Street',
  suburb: 'MELBOURNE',
  state: 'VIC',
  postcode: '3000',
  buildingImage: '/F5.jpg', // Placeholder - to be replaced with building shot
  videoUrl: '', // To be provided by client
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
