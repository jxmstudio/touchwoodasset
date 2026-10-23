// Storage units at The Archive - 601 Little Collins St, Melbourne
// NOTE: array generated from public/*.601 photo folders by scripts/gen-storage-units.mjs

export interface StorageUnit {
  id: string
  unitNumber: string
  size?: number // in square meters — undefined => size to be confirmed
  sizeCategory?:
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
  price?: number // monthly rent — undefined => "Contact for price"
  status: 'AVAILABLE' | 'LEASED'
  images: string[]
  videoUrl?: string
  description: string
  features: string[]
  floor: string
  clearance?: string
  availableFrom?: string // ISO date string
}

const SHARED_FEATURES = [
  '24/7 Monitored Security',
  'Individual Lock & Key',
  'Climate Controlled Environment',
  'Goods Lift Access',
  '7 Days a Week Access',
]

// Storage units with individual photos
export const storageUnits: StorageUnit[] = [
  {
    id: 'archive-unit-d5',
    unitNumber: 'D5',
    size: 2.2,
    sizeCategory: '2sqm',
    price: 90,
    status: 'LEASED',
    images: [
      '/D5.601/D5.601 (internal + furniture).jpg',
      '/D5.601/D5.601 (internal 2.2sqm).jpg',
      '/D5.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/Ydx87CMSoVA',
    description:
      'Entry-level storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 3',
  },
  {
    id: 'archive-unit-d10a',
    unitNumber: 'D10A',
    size: 2.2,
    sizeCategory: '2sqm',
    price: 80,
    status: 'LEASED',
    images: [
      '/D10a.601/D10a.601 (internal + furniture).jpg',
      '/D10a.601/D10a.601 (internal 2.2sqm).jpg',
      '/D10a.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/NN-o7adL5G0',
    description:
      'Entry-level storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 3',
  },
  {
    id: 'archive-unit-d21',
    unitNumber: 'D21',
    size: 9,
    sizeCategory: '9sqm',
    price: 270,
    status: 'AVAILABLE',
    images: [
      '/D21.601/D21.601 (9sqm internal + furniture).jpg',
      '/D21.601/D21.601 (9sqm internal).jpg',
      '/D21.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/TiuMUXBnq14',
    description:
      'Large storage unit at The Archive, 601 Little Collins Street. Ideal for business inventory or large furniture. Available now.',
    features: SHARED_FEATURES,
    floor: 'Level 3',
  },
  {
    // New listing per client email 22 Oct 2026 (1.8 sqm, $60/month, Available).
    // Photos still to come from the client — replace /F5.jpg once they arrive.
    id: 'archive-unit-d24',
    unitNumber: 'D24',
    size: 1.8,
    sizeCategory: '2sqm',
    price: 60,
    status: 'AVAILABLE',
    images: ['/F5.jpg'],
    description:
      'Entry-level 1.8 sqm storage unit at The Archive, 601 Little Collins Street. Available now.',
    features: SHARED_FEATURES,
    floor: 'Level 3',
  },
  {
    id: 'archive-unit-d32',
    unitNumber: 'D32A',
    size: 2.2,
    sizeCategory: '2sqm',
    price: 80,
    status: 'LEASED',
    images: [
      '/D32.601/D32.601 (internal + furniture).jpg',
      '/D32.601/D32.601 (internal 2.2sqm).jpg',
      '/D32.601/Loading & Lift.jpg',
    ],
    description:
      'Entry-level storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 3',
  },
  {
    id: 'archive-unit-d32b',
    unitNumber: 'D32B',
    size: 2.2,
    sizeCategory: '2sqm',
    price: 80,
    status: 'LEASED',
    images: [
      '/D32b.601/D32b.601 (internal + furniture).jpg',
      '/D32b.601/D32b.601 (internal 2.2sqm).jpg',
      '/D32b.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/Y_sxglZxPJU',
    description:
      'Entry-level storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 3',
  },
  {
    // Size and pricing to be confirmed — listed per availability update from the client.
    id: 'archive-unit-d45',
    unitNumber: 'D45',
    status: 'LEASED',
    images: ['/F5.jpg'],
    description:
      'Secure storage unit at The Archive, 601 Little Collins Street. Contact us for size and pricing.',
    features: SHARED_FEATURES,
    floor: 'Level 3',
  },
  {
    id: 'archive-unit-d56',
    unitNumber: 'D56',
    size: 2.2,
    sizeCategory: '2sqm',
    price: 80,
    status: 'LEASED',
    images: [
      '/D56.601/D56.601 (internal + furniture).jpg',
      '/D56.601/D56.601 (internal 2.2sqm).jpg',
      '/D56.601/Loading & Lift.jpg',
    ],
    description:
      'Entry-level storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 3',
  },
  {
    // Available at $110/month per client email 22 Oct 2026.
    id: 'archive-unit-d71',
    unitNumber: 'D71',
    size: 3.2,
    sizeCategory: '3sqm',
    price: 110,
    status: 'AVAILABLE',
    images: [
      '/D71.601/D71.601 (internal + furniture).jpg',
      '/D71.601/D71.601 (internal).jpg',
      '/D71.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/M_36RoNeI_4',
    description:
      'Secure storage unit at The Archive, 601 Little Collins Street. Available now.',
    features: SHARED_FEATURES,
    floor: 'Level 3',
  },
  {
    // Leased per client email 22 Oct 2026 (not on the current availability list).
    // $120/month per client list 2 Oct 2026.
    id: 'archive-unit-d74',
    unitNumber: 'D74',
    size: 2.2,
    sizeCategory: '2sqm',
    price: 120,
    status: 'LEASED',
    images: [
      '/D74.601/D74.601 (internal + furniture).jpg',
      '/D74.601/D74.601 (internal).jpg',
      '/D74.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/u8K9EGrbhuY',
    description:
      'Entry-level storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 3',
  },
  {
    // $120/month, available from 1 Nov 2026 per client list 2 Oct 2026.
    id: 'archive-unit-d75',
    unitNumber: 'D75',
    size: 3.2,
    sizeCategory: '3sqm',
    price: 120,
    status: 'LEASED',
    availableFrom: '2026-11-01',
    images: [
      '/D75.601/D75.601 (internal + furniture).jpg',
      '/D75.601/D75.601 (internal 3.2sqm).jpg',
      '/D75.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/UXTuUs-6Pl4',
    description:
      'Secure storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 3',
  },
  {
    id: 'archive-unit-d82',
    unitNumber: 'D82',
    size: 2.2,
    sizeCategory: '2sqm',
    price: 80,
    status: 'LEASED',
    images: [
      '/D82.601/D82.601 (internal + furniture).jpg',
      '/D82.601/D82.601 (2.2sqm internal).jpg',
      '/D82.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/jy51Q1pQGC4',
    description:
      'Entry-level storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 3',
  },
  {
    id: 'archive-unit-d96',
    unitNumber: 'D96',
    size: 9,
    sizeCategory: '9sqm',
    price: 300,
    status: 'LEASED',
    images: [
      '/D96.601/D96.601 (9sqm internal + furniture).jpg',
      '/D96.601/D96.601 (9sqm internal).jpg',
      '/D96.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/GkK2TvUpTJk',
    description:
      'Large storage unit at The Archive, 601 Little Collins Street. Ideal for business inventory or large furniture.',
    features: SHARED_FEATURES,
    floor: 'Level 3',
  },
  {
    id: 'archive-unit-d101',
    unitNumber: 'D101',
    size: 8,
    sizeCategory: '8sqm',
    price: 250,
    status: 'LEASED',
    images: [
      '/D101.601/D101.601 (internal + furniture).jpg',
      '/D101.601/D101.601 (8sqm internal).jpg',
      '/D101.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/gV-e6U47IqI',
    description:
      'Large storage unit at The Archive, 601 Little Collins Street. Ideal for business inventory or large furniture.',
    features: SHARED_FEATURES,
    floor: 'Level 3',
  },
  {
    id: 'archive-unit-e3',
    unitNumber: 'E3',
    size: 2.2,
    sizeCategory: '2sqm',
    price: 80,
    status: 'LEASED',
    images: [
      '/E3.601/E3.601 (internal + furniture).jpg',
      '/E3.601/E3.601 (internal 2.2sqm).jpg',
      '/E3.601/Loading & Lift.jpg',
    ],
    description:
      'Entry-level storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 4',
  },
  {
    id: 'archive-unit-e17',
    unitNumber: 'E17',
    size: 4,
    sizeCategory: '4sqm',
    price: 150,
    status: 'LEASED',
    images: [
      '/E17.601/E17.601 (internal + furniture).jpg',
      '/E17.601/E17.601 (4sqm internal).jpg',
      '/E17.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/u8j-J38XtHo',
    description:
      'Secure storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 4',
  },
  {
    id: 'archive-unit-e21',
    unitNumber: 'E21',
    size: 3,
    sizeCategory: '3sqm',
    price: 110,
    status: 'LEASED',
    images: [
      '/E21.601/E21.601 (internal + furniture).jpg',
      '/E21.601/E21.601 (3sqm internal).jpg',
      '/E21.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/2lyKt_fO4Xw',
    description:
      'Secure storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 4',
  },
  {
    id: 'archive-unit-e36',
    unitNumber: 'E36',
    size: 9,
    sizeCategory: '9sqm',
    price: 300,
    status: 'LEASED',
    images: [
      '/E36.601/E36.601 (internal 9sqm + furniture + shelvings).jpg',
      '/E36.601/E36.601 (internal).jpg',
      '/E36.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/k5pVqyD9xdU',
    description:
      'Large storage unit at The Archive, 601 Little Collins Street. Ideal for business inventory or large furniture.',
    features: SHARED_FEATURES,
    floor: 'Level 4',
  },
  {
    // Size corrected to 5 sqm and rent to $180/month per client email 12 Oct 2026.
    // Leased per client email 15 Oct 2026.
    id: 'archive-unit-e46',
    unitNumber: 'E46',
    size: 5,
    sizeCategory: '5sqm',
    price: 180,
    status: 'LEASED',
    images: [
      '/E46.601/E46.601 (internal + furniture).jpg',
      '/E46.601/E46.601 (internal).jpg',
      '/E46.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/LnCWsc_q6mI',
    description:
      'Mid-size storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 4',
  },
  {
    // 10.4 sqm per client email 22 Oct 2026 (site previously had 9 sqm).
    id: 'archive-unit-e68',
    unitNumber: 'E68',
    size: 10.4,
    sizeCategory: '10sqm+',
    price: 300,
    status: 'AVAILABLE',
    images: [
      '/E68.601/E68.601 (internal 9sqm + furniture).jpg',
      '/E68.601/E68.601 (internal 9sqm).jpg',
      '/E68.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/FXuv2XIjMFA',
    description:
      'Large storage unit at The Archive, 601 Little Collins Street. Ideal for business inventory or large furniture. Available now.',
    features: SHARED_FEATURES,
    floor: 'Level 4',
  },
  {
    id: 'archive-unit-e71',
    unitNumber: 'E71',
    size: 4,
    sizeCategory: '4sqm',
    price: 150,
    status: 'LEASED',
    images: [
      '/E71.601/E71.601 (internal + furniture).jpg',
      '/E71.601/E71.601 (internal 4sqm).jpg',
      '/E71.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/1O_5lvqCbxo',
    description:
      'Secure storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 4',
  },
  {
    id: 'archive-unit-e86',
    unitNumber: 'E86',
    size: 2.2,
    sizeCategory: '2sqm',
    price: 80,
    status: 'LEASED',
    images: [
      '/E86.601/E86.601 (internal +furniture 2.2sqm).jpg',
      '/E86.601/E86.601 (internal).jpg',
      '/E86.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/OYy7ALFE52A',
    description:
      'Entry-level storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 4',
  },
  {
    // Leased per client email 22 Oct 2026 (not on the current availability list).
    // Available at $80/month per client list 2 Oct 2026.
    id: 'archive-unit-e87',
    unitNumber: 'E87',
    size: 2.2,
    sizeCategory: '2sqm',
    price: 80,
    status: 'LEASED',
    images: [
      '/E87.601/E87.601 (internal +furniture 2.2sqm).jpg',
      '/E87.601/E87.601 (internal).jpg',
      '/E87.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/_OKOp2bQMj4',
    description:
      'Entry-level storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 4',
  },
  {
    id: 'archive-unit-e88',
    unitNumber: 'E88',
    size: 2.2,
    sizeCategory: '2sqm',
    price: 80,
    status: 'LEASED',
    images: [
      '/E88.601/E88.601 (2.2sqm internal + furniture).jpg',
      '/E88.601/E88.601 (internal).jpg',
      '/E88.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/pooTRRgvYE4',
    description:
      'Entry-level storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 4',
  },
  {
    // New listing per client list 2 Oct 2026 ($90/month, Available). Size and
    // photos still to come from the client — replace /F5.jpg with /E97.601/...
    // once they arrive. Leased per client email 15 Oct 2026.
    id: 'archive-unit-e97',
    unitNumber: 'E97',
    price: 90,
    status: 'LEASED',
    images: ['/F5.jpg'],
    description:
      'Secure storage unit at The Archive, 601 Little Collins Street. Contact us for size details.',
    features: SHARED_FEATURES,
    floor: 'Level 4',
  },
  {
    id: 'archive-unit-e105',
    unitNumber: 'E105',
    size: 2.4,
    sizeCategory: '2sqm',
    price: 80,
    status: 'LEASED',
    images: [
      '/E105.601/E105.601 (internal + furniture).jpg',
      '/E105.601/E105.601 (internal).jpg',
      '/E105.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/c3vRH-OiHDA',
    description:
      'Entry-level storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 4',
  },
  {
    id: 'archive-unit-e106',
    unitNumber: 'E106',
    size: 2.2,
    sizeCategory: '2sqm',
    price: 80,
    status: 'LEASED',
    images: [
      '/E106.601/E106.601 (internal + furniture).jpg',
      '/E106.601/E106.601 (internal).jpg',
      '/E106.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/9tuGjZSEG3s',
    description:
      'Entry-level storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 4',
  },
  {
    id: 'archive-unit-e132',
    unitNumber: 'E132',
    size: 6,
    sizeCategory: '6sqm',
    price: 200,
    status: 'LEASED',
    images: [
      '/E132.601/E132.601 (internal + furniture).png',
      '/E132.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/VzAxWAl9Jns',
    description:
      'Mid-size storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 4',
  },
  {
    id: 'archive-unit-f5',
    unitNumber: 'F5',
    size: 10,
    sizeCategory: '10sqm+',
    price: 400,
    status: 'AVAILABLE',
    images: [
      '/F5.601/F5.601 (internal + furniture + shelvings).jpg',
      '/F5.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/_-uCQjrsvEE',
    description:
      'Large storage unit at The Archive, 601 Little Collins Street. Ideal for business inventory or large furniture. Available now.',
    features: SHARED_FEATURES,
    floor: 'Level 5',
  },
  {
    // 5.4 sqm, $200/month per client email 22 Oct 2026 (was 5.2 sqm, $220).
    id: 'archive-unit-f36',
    unitNumber: 'F36',
    size: 5.4,
    sizeCategory: '5sqm',
    price: 200,
    status: 'AVAILABLE',
    images: [
      '/F36.601/F36.601 (internal 5.2sqm).jpg',
      '/F36.601/Loading & Lift.jpg',
    ],
    description:
      'Mid-size storage unit at The Archive, 601 Little Collins Street. Available now.',
    features: SHARED_FEATURES,
    floor: 'Level 5',
  },
  {
    id: 'archive-unit-f37',
    unitNumber: 'F37',
    size: 5.2,
    sizeCategory: '5sqm',
    price: 180,
    status: 'LEASED',
    images: [
      '/F37.601/F37.601 (internal + furniture).jpg',
      '/F37.601/F37 (5.2sqm internal).jpg',
      '/F37.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/NwL1fXkuts8',
    description:
      'Mid-size storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 5',
  },
  {
    // Leased per client email 22 Oct 2026 (not on the current availability list).
    id: 'archive-unit-f52',
    unitNumber: 'F52',
    size: 5.2,
    sizeCategory: '5sqm',
    price: 180,
    status: 'LEASED',
    images: [
      '/F52.601/F52 (internal + furniture).jpg',
      '/F52.601/F52 (5.2sqm internal).jpg',
      '/F52.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/FsxFOtwqqBA',
    description:
      'Mid-size storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 5',
  },
  {
    id: 'archive-unit-f73',
    unitNumber: 'F73',
    size: 2.4,
    sizeCategory: '2sqm',
    price: 80,
    status: 'LEASED',
    images: ['/F5.jpg'],
    description:
      'Entry-level storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 5',
  },
  {
    id: 'archive-unit-f76',
    unitNumber: 'F76',
    size: 3.2,
    sizeCategory: '3sqm',
    price: 110,
    status: 'LEASED',
    images: [
      '/F76.601/F76.601 (internal + furniture).jpg',
      '/F76.601/F76.601 (internal).jpg',
      '/F76.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/6yPur_cV3bY',
    description:
      'Secure storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 5',
  },
  {
    // Client email 22 Oct 2026 lists F83 at "$230/$250 per month"; showing the
    // lower rate until the client confirms.
    id: 'archive-unit-f83',
    unitNumber: 'F83',
    size: 8,
    sizeCategory: '8sqm',
    price: 230,
    status: 'AVAILABLE',
    images: [
      '/F83.601/F83.601 (8sqm internal+furniture).jpg',
      '/F83.601/F83.601 (8sqm internal)..jpg',
      '/F83.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/I_4ien5RfvY',
    description:
      'Large storage unit at The Archive, 601 Little Collins Street. Ideal for business inventory or large furniture. Rent $230–$250 per month. Available now.',
    features: SHARED_FEATURES,
    floor: 'Level 5',
  },
  {
    id: 'archive-unit-f90',
    unitNumber: 'F90',
    size: 2.2,
    sizeCategory: '2sqm',
    price: 80,
    status: 'LEASED',
    images: ['/F90.601/with stuff img.jpeg', '/F90.601/Empty Img.jpeg'],
    description:
      'Entry-level storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 5',
  },
  {
    // New listing per client email 22 Oct 2026 (3.2 sqm, $120/month, Available).
    // Photos still to come from the client — replace /F5.jpg once they arrive.
    id: 'archive-unit-f95',
    unitNumber: 'F95',
    size: 3.2,
    sizeCategory: '3sqm',
    price: 120,
    status: 'AVAILABLE',
    images: ['/F5.jpg'],
    description:
      'Secure 3.2 sqm storage unit at The Archive, 601 Little Collins Street. Available now.',
    features: SHARED_FEATURES,
    floor: 'Level 5',
  },
  {
    // New listing per client email 22 Oct 2026 (3.2 sqm, $120/month, Available).
    // Photos still to come from the client — replace /F5.jpg once they arrive.
    id: 'archive-unit-f96',
    unitNumber: 'F96',
    size: 3.2,
    sizeCategory: '3sqm',
    price: 120,
    status: 'AVAILABLE',
    images: ['/F5.jpg'],
    description:
      'Secure 3.2 sqm storage unit at The Archive, 601 Little Collins Street. Available now.',
    features: SHARED_FEATURES,
    floor: 'Level 5',
  },
  {
    // New listing per client email 22 Oct 2026 (3.2 sqm, $120/month, Available).
    // Photos still to come from the client — replace /F5.jpg once they arrive.
    id: 'archive-unit-f97',
    unitNumber: 'F97',
    size: 3.2,
    sizeCategory: '3sqm',
    price: 120,
    status: 'AVAILABLE',
    images: ['/F5.jpg'],
    description:
      'Secure 3.2 sqm storage unit at The Archive, 601 Little Collins Street. Available now.',
    features: SHARED_FEATURES,
    floor: 'Level 5',
  },
  {
    // 4 sqm, $150/month, Available per client email 22 Oct 2026 (site previously
    // had 2.2 sqm, $80).
    id: 'archive-unit-f98',
    unitNumber: 'F98',
    size: 4,
    sizeCategory: '4sqm',
    price: 150,
    status: 'AVAILABLE',
    images: ['/F98.601/With stuff Img.jpeg', '/F98.601/Empty Img.jpeg'],
    description:
      'Secure 4 sqm storage unit at The Archive, 601 Little Collins Street. Available now.',
    features: SHARED_FEATURES,
    floor: 'Level 5',
  },
  {
    id: 'archive-unit-f99',
    unitNumber: 'F99',
    size: 2.2,
    sizeCategory: '2sqm',
    price: 80,
    status: 'LEASED',
    images: ['/F99.601/with Stuff img.jpeg', '/F99.601/Empty Img.jpeg'],
    description:
      'Entry-level storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 5',
  },
  {
    // $270/month, Available per client email 22 Oct 2026 (was $300).
    id: 'archive-unit-f112',
    unitNumber: 'F112',
    size: 9,
    sizeCategory: '9sqm',
    price: 270,
    status: 'AVAILABLE',
    images: [
      '/F112.601/F112.601 (9sqm internal + furniture).jpg',
      '/F112.601/F112.601 (9sqm internal).jpg',
      '/F112.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/7yYTeBPZLr8',
    description:
      'Large storage unit at The Archive, 601 Little Collins Street. Ideal for business inventory or large furniture. Available now.',
    features: SHARED_FEATURES,
    floor: 'Level 5',
  },
  {
    // Leased per client email 22 Oct 2026 (not on the current availability list).
    id: 'archive-unit-f117',
    unitNumber: 'F117',
    size: 4,
    sizeCategory: '4sqm',
    price: 150,
    status: 'LEASED',
    images: [
      '/F117.601/F117.601 (4sqm internal + funiture).jpg',
      '/F117.601/F117.601 (4sqm internal).jpg',
      '/F117.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/1_IA7_BMS8I',
    description:
      'Secure storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 5',
  },
  {
    id: 'archive-unit-f132',
    unitNumber: 'F132',
    size: 3,
    sizeCategory: '3sqm',
    price: 120,
    status: 'LEASED',
    images: [
      '/F132.601/F132.601 (3sqm internal).jpg',
      '/F132.601/F132.601 (internal).jpg',
      '/F132.601/Loading & Lift.jpg',
    ],
    description:
      'Secure storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 5',
  },
  {
    // New listing per client email 22 Oct 2026 (3.2 sqm, $120/month, Available).
    // Photos still to come from the client — replace /F5.jpg once they arrive.
    id: 'archive-unit-f135',
    unitNumber: 'F135',
    size: 3.2,
    sizeCategory: '3sqm',
    price: 120,
    status: 'AVAILABLE',
    images: ['/F5.jpg'],
    description:
      'Secure 3.2 sqm storage unit at The Archive, 601 Little Collins Street. Available now.',
    features: SHARED_FEATURES,
    floor: 'Level 5',
  },
  {
    // Leased per client email 22 Oct 2026 (not on the current availability list).
    id: 'archive-unit-h23',
    unitNumber: 'H23',
    size: 6.2,
    sizeCategory: '6sqm',
    price: 200,
    status: 'LEASED',
    images: [
      '/H23.601/H23.601 (internal + furniture).jpg',
      '/H23.601/H23.601 (internal 6.2sqm).jpg',
      '/H23.601/H23.601 (marketing).jpg',
      '/H23.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/UKUxgKunQk0',
    description:
      'Mid-size storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
    floor: 'Level 7',
  },
  {
    id: 'archive-unit-h39',
    unitNumber: 'H39',
    size: 9,
    sizeCategory: '9sqm',
    price: 300,
    status: 'LEASED',
    images: [
      '/H39.601/H39.601 (internal + furniture).jpg',
      '/H39.601/H39.601 (internal 9sqm).jpg',
      '/H39.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/e1Z-PPBilgM',
    description:
      'Large storage unit at The Archive, 601 Little Collins Street. Ideal for business inventory or large furniture.',
    features: SHARED_FEATURES,
    floor: 'Level 7',
  },
  {
    // $300/month, Available per client email 22 Oct 2026 (was $350).
    id: 'archive-unit-h42',
    unitNumber: 'H42',
    size: 9,
    sizeCategory: '9sqm',
    price: 300,
    status: 'AVAILABLE',
    images: [
      '/H42.601/H42 (internal + furniture).jpg',
      '/H42.601/H42 (internal 9sqm).jpg',
      '/H42.601/H42 (external).jpg',
      '/H42.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/ErtRWEbBAqU',
    description:
      'Large storage unit at The Archive, 601 Little Collins Street. Ideal for business inventory or large furniture. Available now.',
    features: SHARED_FEATURES,
    floor: 'Level 7',
  },
  {
    id: 'archive-unit-h43',
    unitNumber: 'H43',
    size: 9,
    sizeCategory: '9sqm',
    price: 300,
    status: 'AVAILABLE',
    images: [
      '/H43.601/H43.601 (internal + furniture).jpg',
      '/H43.601/H43.601 (internal 9sqm).jpg',
      '/H43.601/Loading & Lift.jpg',
    ],
    videoUrl: 'https://youtu.be/xjfx2vxAbhM',
    description:
      'Large storage unit at The Archive, 601 Little Collins Street. Ideal for business inventory or large furniture. Available now.',
    features: SHARED_FEATURES,
    floor: 'Level 7',
  },
  {
    // 7.5 sqm, $220/month, Available per client email 22 Oct 2026. Photos still
    // to come from the client — replace /F5.jpg once they arrive.
    id: 'archive-unit-g68',
    unitNumber: 'G68',
    size: 7.5,
    sizeCategory: '7sqm',
    price: 220,
    status: 'AVAILABLE',
    images: ['/F5.jpg'],
    description:
      'Secure 7.5 sqm storage unit at The Archive, 601 Little Collins Street. Available now.',
    features: SHARED_FEATURES,
    floor: 'Level 6',
  },
  {
    // Leased per client email 22 Oct 2026 (not on the current availability list).
    // New listing per client email 24 Sep 2026 (7 sqm, Available). Photos from
    // the client's Dropbox Storage/F106.601 folder; $220/month confirmed 28 Sep 2026.
    id: 'archive-unit-f106',
    unitNumber: 'F106',
    size: 7,
    sizeCategory: '7sqm',
    price: 220,
    status: 'LEASED',
    images: [
      '/F106.601/F106.601 (internal + furniture).jpeg',
      '/F106.601/F106.601 (7sqm internal).jpeg',
      '/F106.601/F106.601 (door).jpeg',
      '/F106.601/Loading & Lift.jpg',
    ],
    description:
      'Secure 7 sqm storage unit at The Archive, 601 Little Collins Street.',
    features: SHARED_FEATURES,
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
    if (unit.price == null) return !minPrice && !maxPrice
    if (minPrice && unit.price < minPrice) return false
    if (maxPrice && unit.price > maxPrice) return false
    return true
  })
}
