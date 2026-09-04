// Car park bays managed by Touchwood Asset Management
// Images live in public/carparks/<building-slug>/<bay>/ (Dropbox exports from Raquel).
// Bays without photos yet use the placeholder until new watermarked images arrive.

export interface CarparkBay {
  id: string
  bayNumber: string // e.g. "136", "C25"
  building: string // display name, e.g. "255 Drummond Street"
  buildingSlug: string
  address: string
  suburb: string
  state: string
  postcode: string
  price?: number // monthly rent — undefined => "Contact for price"
  pricePeriod: 'per_month'
  status: 'AVAILABLE' | 'LEASED' | 'COMING_SOON'
  availableFrom?: string // ISO date
  images: string[]
  videoUrl?: string
  clearance?: string
  description: string
  features: string[]
}

const PLACEHOLDER = '/placeholder-property.svg'

const SHARED_FEATURES = [
  'Secure access',
  '24/7 entry',
  'Well-lit and monitored',
  'Flexible month-to-month lease',
]

// Helper to build a bay with defaults
function bay(b: {
  bayNumber: string
  building: string
  buildingSlug: string
  address: string
  suburb: string
  postcode: string
  price?: number
  status?: CarparkBay['status']
  availableFrom?: string
  images?: string[]
  videoUrl?: string
  clearance?: string
  description?: string
  features?: string[]
}): CarparkBay {
  const idBay = b.bayNumber.toLowerCase().replace(/[^a-z0-9]/g, '')
  return {
    id: `${b.buildingSlug}-bay-${idBay}`,
    bayNumber: b.bayNumber,
    building: b.building,
    buildingSlug: b.buildingSlug,
    address: b.address,
    suburb: b.suburb,
    state: 'VIC',
    postcode: b.postcode,
    price: b.price,
    pricePeriod: 'per_month',
    status: b.status ?? 'AVAILABLE',
    availableFrom: b.availableFrom,
    images: b.images ?? [PLACEHOLDER],
    videoUrl: b.videoUrl,
    clearance: b.clearance,
    description:
      b.description ??
      `Secure car park bay ${b.bayNumber} at ${b.address}, ${b.suburb}. Contact us for pricing and availability.`,
    features: b.features ?? SHARED_FEATURES,
  }
}

export const carparkBays: CarparkBay[] = [
  // ── 255 Drummond Street, Carlton ─────────────────────────────────────────
  bay({
    bayNumber: '136',
    building: '255 Drummond Street',
    buildingSlug: '255-drummond-st-carlton',
    address: '255 Drummond Street',
    suburb: 'Carlton',
    postcode: '3053',
    status: 'LEASED',
    images: [
      '/carparks/255-drummond-st-carlton/bay-136/1.jpeg',
      '/carparks/255-drummond-st-carlton/bay-136/2.jpeg',
      '/carparks/255-drummond-st-carlton/bay-136/3.jpeg',
      '/carparks/255-drummond-st-carlton/bay-136/4.jpeg',
    ],
    description:
      'Secure car park bay #136 at 255 Drummond Street, Carlton. Moments from Lygon Street, Melbourne University and RMIT. Contact us for pricing.',
  }),
  bay({
    bayNumber: '265',
    building: '255 Drummond Street',
    buildingSlug: '255-drummond-st-carlton',
    address: '255 Drummond Street',
    suburb: 'Carlton',
    postcode: '3053',
    availableFrom: '2026-07-20',
    images: [
      '/carparks/255-drummond-st-carlton/bay-265/1.jpeg',
      '/carparks/255-drummond-st-carlton/bay-265/2.jpeg',
      '/carparks/255-drummond-st-carlton/bay-265/3.jpeg',
      '/carparks/255-drummond-st-carlton/bay-265/4.jpeg',
      '/carparks/255-drummond-st-carlton/bay-265/5.jpeg',
    ],
    description:
      'Secure car park bay #265 at 255 Drummond Street, Carlton. Moments from Lygon Street, Melbourne University and RMIT. Contact us for pricing.',
  }),
  bay({
    bayNumber: '271',
    building: '255 Drummond Street',
    buildingSlug: '255-drummond-st-carlton',
    address: '255 Drummond Street',
    suburb: 'Carlton',
    postcode: '3053',
    images: [
      '/carparks/255-drummond-st-carlton/bay-271/1.jpeg',
      '/carparks/255-drummond-st-carlton/bay-271/2.jpeg',
      '/carparks/255-drummond-st-carlton/bay-271/3.jpeg',
    ],
    description:
      'Secure car park bay #271 at the Carlton Clocktower carpark, 255 Drummond Street, Carlton. Moments from Lygon Street, Melbourne University and RMIT. Contact us for pricing.',
  }),

  // ── 401 Docklands Drive, Docklands ───────────────────────────────────────
  bay({
    bayNumber: '430',
    building: '401 Docklands Drive',
    buildingSlug: '401-docklands-drive-docklands',
    address: '401 Docklands Drive',
    suburb: 'Docklands',
    postcode: '3008',
    status: 'LEASED',
    images: [
      '/carparks/401-docklands-drive-docklands/bay-430/1.jpeg',
      '/carparks/401-docklands-drive-docklands/bay-430/2.jpeg',
      '/carparks/401-docklands-drive-docklands/bay-430/3.jpeg',
    ],
    description:
      'Secure car park bay #430 at 401 Docklands Drive, Docklands. Near The District, Marvel Stadium and the free City Circle tram. Contact us for pricing.',
  }),
  bay({
    bayNumber: '537',
    building: '401 Docklands Drive',
    buildingSlug: '401-docklands-drive-docklands',
    address: '401 Docklands Drive',
    suburb: 'Docklands',
    postcode: '3008',
    status: 'LEASED',
    images: [
      '/carparks/401-docklands-drive-docklands/bay-537/1.jpeg',
      '/carparks/401-docklands-drive-docklands/bay-537/2.jpeg',
    ],
    description:
      'Secure car park bay #537 at 401 Docklands Drive, Docklands. Near The District, Marvel Stadium and the free City Circle tram. Contact us for pricing.',
  }),
  bay({
    bayNumber: '538',
    building: '401 Docklands Drive',
    buildingSlug: '401-docklands-drive-docklands',
    address: '401 Docklands Drive',
    suburb: 'Docklands',
    postcode: '3008',
    status: 'LEASED',
    images: ['/carparks/401-docklands-drive-docklands/bay-538/1.jpeg'],
    description:
      'Secure car park bay #538 at 401 Docklands Drive, Docklands. Near The District, Marvel Stadium and the free City Circle tram. Contact us for pricing.',
  }),

  // ── 58 Franklin Street, Melbourne ────────────────────────────────────────
  // Photos coming from Raquel — placeholder for now.
  bay({
    bayNumber: '330',
    building: '58 Franklin Street',
    buildingSlug: '58-franklin-st-melbourne',
    address: '58 Franklin Street',
    suburb: 'Melbourne',
    postcode: '3000',
    price: 320,
    description:
      'Secure car park bay #330 at 58 Franklin Street, Melbourne CBD. Near Queen Victoria Market, RMIT and Flagstaff Gardens. 24/7 swipe card access.',
  }),
  bay({
    bayNumber: '810',
    building: '58 Franklin Street',
    buildingSlug: '58-franklin-st-melbourne',
    address: '58 Franklin Street',
    suburb: 'Melbourne',
    postcode: '3000',
    status: 'COMING_SOON',
    availableFrom: '2026-09-12',
    description:
      'Secure car park bay #810 at 58 Franklin Street, Melbourne CBD. Near Queen Victoria Market, RMIT and Flagstaff Gardens. 24/7 swipe card access. Available from 12 September 2026 — enquire now to secure it. Contact us for pricing.',
  }),
  ...['603', '710', '749', '753', '755', '807'].map((n) =>
    bay({
      bayNumber: n,
      building: '58 Franklin Street',
      buildingSlug: '58-franklin-st-melbourne',
      address: '58 Franklin Street',
      suburb: 'Melbourne',
      postcode: '3000',
      status: 'LEASED',
      description: `Secure car park bay #${n} at 58 Franklin Street, Melbourne CBD. Near Queen Victoria Market, RMIT and Flagstaff Gardens. 24/7 swipe card access. Contact us for pricing.`,
    })
  ),
  // Known bays at 58 Franklin (carried over from existing listings)
  bay({
    bayNumber: '729',
    building: '58 Franklin Street',
    buildingSlug: '58-franklin-st-melbourne',
    address: '58 Franklin Street',
    suburb: 'Melbourne',
    postcode: '3000',
    price: 230,
    status: 'LEASED',
    description:
      'Secure car park bay #729 (Level 7) at 58 Franklin Street, Melbourne CBD. Near Queen Victoria Market, RMIT and Flagstaff Gardens. 24/7 swipe card access.',
  }),
  bay({
    bayNumber: '863',
    building: '58 Franklin Street',
    buildingSlug: '58-franklin-st-melbourne',
    address: '58 Franklin Street',
    suburb: 'Melbourne',
    postcode: '3000',
    price: 240,
    status: 'LEASED',
    images: ['/carparks/58-franklin-st-melbourne/bay-863/1.jpeg'],
    description:
      'Secure car park bay #863 at 58 Franklin Street, Melbourne CBD. Near Queen Victoria Market, RMIT and Flagstaff Gardens. 24/7 swipe card access.',
  }),

  // ── 68 La Trobe Street, Melbourne ────────────────────────────────────────
  bay({
    bayNumber: 'C25',
    building: '68 La Trobe Street',
    buildingSlug: '68-la-trobe-st-melbourne',
    address: '68 La Trobe Street',
    suburb: 'Melbourne',
    postcode: '3000',
    status: 'LEASED',
    images: [
      '/carparks/68-la-trobe-st-melbourne/bay-c25/1.jpeg',
      '/carparks/68-la-trobe-st-melbourne/bay-c25/2.jpeg',
      '/carparks/68-la-trobe-st-melbourne/bay-c25/3.jpeg',
    ],
    description:
      'Secure car park bay #C25 at 68 La Trobe Street, Melbourne CBD. Steps from Melbourne Central, RMIT and the State Library. Contact us for pricing.',
  }),

  // ── 20 Convention Centre Place, South Wharf ──────────────────────────────
  bay({
    bayNumber: 'C7',
    building: '20 Convention Centre Place',
    buildingSlug: '20-convention-centre-pl-south-wharf',
    address: '20 Convention Centre Place',
    suburb: 'South Wharf',
    postcode: '3006',
    status: 'COMING_SOON',
    availableFrom: '2026-09-20',
    description:
      'Secure car park bay C7 (carpark #35) at 20 Convention Centre Place, South Wharf. Next to MCEC, DFO South Wharf and the Yarra promenade. Available from 20 September 2026 — enquire now to secure it. Contact us for pricing.',
  }),
  ...['C5', 'C6', 'C8'].map((n) =>
    bay({
      bayNumber: n,
      building: '20 Convention Centre Place',
      buildingSlug: '20-convention-centre-pl-south-wharf',
      address: '20 Convention Centre Place',
      suburb: 'South Wharf',
      postcode: '3006',
      status: 'LEASED',
      description: `Secure car park bay ${n} at 20 Convention Centre Place, South Wharf. Next to MCEC, DFO South Wharf and the Yarra promenade. Contact us for pricing.`,
    })
  ),

  // ── 180 City Road, Southbank ─────────────────────────────────────────────
  bay({
    bayNumber: '1308A',
    building: '180 City Road',
    buildingSlug: '180-city-rd-southbank',
    address: '180 City Road',
    suburb: 'Southbank',
    postcode: '3006',
    availableFrom: '2026-08-21',
    description:
      'Secure car park bay #1308A on Level 6 at 180 City Road, Southbank. Moments from Crown, the Melbourne CBD and the Southbank arts precinct. Contact us for pricing.',
  }),

  // ── 83 Whiteman Street, Southbank ────────────────────────────────────────
  bay({
    bayNumber: '16',
    building: '83 Whiteman Street',
    buildingSlug: '83-whiteman-st-southbank',
    address: '83 Whiteman Street',
    suburb: 'Southbank',
    postcode: '3006',
    status: 'LEASED',
    description:
      'Secure car park bay #16 at 83 Whiteman Street, Southbank. Short walk to Crown, South Wharf and Southbank Promenade. Contact us for pricing.',
  }),

  // ── 11 Daly Street, South Yarra ──────────────────────────────────────────
  ...['375', '376', '595', '628'].map((n) =>
    bay({
      bayNumber: n,
      building: '11 Daly Street',
      buildingSlug: '11-daly-st-south-yarra',
      address: '11 Daly Street',
      suburb: 'South Yarra',
      postcode: '3141',
      status: 'LEASED',
      description: `Secure car park bay #${n} at 11 Daly Street, South Yarra. Moments from Chapel Street, South Yarra Station and the Yarra trails. Contact us for pricing.`,
    })
  ),
  bay({
    bayNumber: '592',
    building: '11 Daly Street',
    buildingSlug: '11-daly-st-south-yarra',
    address: '11 Daly Street',
    suburb: 'South Yarra',
    postcode: '3141',
    status: 'LEASED',
    images: ['/carparks/11-daly-st-south-yarra/bay-592/1.jpeg'],
    description:
      'Secure car park bay #592 at 11 Daly Street, South Yarra. Moments from Chapel Street and South Yarra Station.',
  }),
  bay({
    bayNumber: '593',
    building: '11 Daly Street',
    buildingSlug: '11-daly-st-south-yarra',
    address: '11 Daly Street',
    suburb: 'South Yarra',
    postcode: '3141',
    price: 240,
    status: 'LEASED',
    images: ['/carparks/11-daly-st-south-yarra/bay-593/1.jpeg'],
    description:
      'Secure car park bay #593 at 11 Daly Street, South Yarra. Moments from Chapel Street and South Yarra Station.',
  }),

  // ── 211 Powlett Street, East Melbourne (Tribeca) ─────────────────────────
  bay({
    bayNumber: '30',
    building: 'Tribeca, 211 Powlett Street',
    buildingSlug: '211-powlett-st-east-melbourne',
    address: '211 Powlett Street',
    suburb: 'East Melbourne',
    postcode: '3002',
    price: 365,
    status: 'LEASED',
    clearance: '2.1m',
    images: ['/211.jpg'],
    videoUrl: 'https://youtu.be/bGW4kY0r-g8',
    description:
      'Secure car park lot 30 at Tribeca, 211 Powlett Street, East Melbourne. 5 minutes walk to the MCG, moments to Jolimont Station, Fitzroy Gardens and the CBD.',
  }),
  bay({
    bayNumber: '31',
    building: 'Tribeca, 211 Powlett Street',
    buildingSlug: '211-powlett-st-east-melbourne',
    address: '211 Powlett Street',
    suburb: 'East Melbourne',
    postcode: '3002',
    status: 'LEASED',
    clearance: '2.1m',
    images: ['/carparks/211-powlett-st-east-melbourne/bay-31/1.jpeg'],
    description:
      'Secure car park lot 31 at Tribeca, 211 Powlett Street, East Melbourne. 5 minutes walk to the MCG, moments to Jolimont Station and the CBD.',
  }),

  // ── St Kilda Tower, Queens Lane ──────────────────────────────────────────
  bay({
    bayNumber: 'A20',
    building: 'St Kilda Tower',
    buildingSlug: 'st-kilda-tower-queens-lane',
    address: 'St Kilda Tower, Entry via Queens Lane',
    suburb: 'St Kilda',
    postcode: '3182',
    price: 340,
    status: 'LEASED',
    images: ['/A20-1-Queens-Rd.jpg'],
    description:
      'Secure car park space in St Kilda Tower with convenient Queens Lane access. Close to St Kilda Beach and Albert Park.',
  }),

  // ── 150 Albert Road, South Melbourne ─────────────────────────────────────
  ...['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'].map((n) =>
    bay({
      bayNumber: n,
      building: '150 Albert Road',
      buildingSlug: '150-albert-rd-south-melbourne',
      address: '150 Albert Road',
      suburb: 'South Melbourne',
      postcode: '3205',
      price: 250,
      status: 'LEASED',
      clearance: '2.1m',
      images: ['/pork/150%20Albert%20Rd,%20SOUTH%20MELBOURNE.jpg'],
      videoUrl: 'https://youtu.be/K75u14rFfPQ',
      description: `Secure car park bay ${n} at 150 Albert Road, South Melbourne. Easy CBD access, close to South Melbourne Market.`,
    })
  ),

  // ── 118 High Street, Kew ─────────────────────────────────────────────────
  bay({
    bayNumber: '501',
    building: '118 High Street',
    buildingSlug: '118-high-st-kew',
    address: '118 High Street',
    suburb: 'Kew',
    postcode: '3101',
    price: 290,
    status: 'LEASED',
    images: ['/carparks/118-high-st-kew/bay-501/1.jpeg'],
    description:
      'Secure car park bay #501 at 118 High Street, Kew. Convenient access to Kew Junction shops and cafes.',
  }),

  // ── 135 Fitzroy Street, St Kilda ─────────────────────────────────────────
  bay({
    bayNumber: '273',
    building: '135 Fitzroy Street',
    buildingSlug: '135-fitzroy-st-st-kilda',
    address: '135 Fitzroy Street',
    suburb: 'St Kilda',
    postcode: '3182',
    price: 220,
    status: 'LEASED',
    images: ['/carparks/135-fitzroy-st-st-kilda/bay-273/1.jpeg'],
    description:
      'Secure car park bay #273 at 135 Fitzroy Street, St Kilda. Steps from the Fitzroy Street dining strip and St Kilda Beach.',
  }),
  // Photos coming — placeholder for now.
  ...['270', '331', '332'].map((n) =>
    bay({
      bayNumber: n,
      building: '135 Fitzroy Street',
      buildingSlug: '135-fitzroy-st-st-kilda',
      address: '135 Fitzroy Street',
      suburb: 'St Kilda',
      postcode: '3182',
      description: `Secure car park bay #${n} at 135 Fitzroy Street, St Kilda. Steps from the Fitzroy Street dining strip and St Kilda Beach. Contact us for pricing.`,
    })
  ),

  // ── 63 Dorcas Street, South Melbourne ────────────────────────────────────
  // Photos coming — placeholder for now.
  bay({
    bayNumber: '94',
    building: '63 Dorcas Street',
    buildingSlug: '63-dorcas-st-south-melbourne',
    address: '63 Dorcas Street',
    suburb: 'South Melbourne',
    postcode: '3205',
    description:
      'Secure car park bay #94 at 63 Dorcas Street, South Melbourne. Moments from South Melbourne Market, Clarendon Street and the CBD. Contact us for pricing.',
  }),
]

// ── Helpers ────────────────────────────────────────────────────────────────
export const carparkSuburbs = Array.from(
  new Set(carparkBays.map((b) => b.suburb))
).sort()

export const carparkBuildings = Array.from(
  new Set(carparkBays.map((b) => b.building))
)

export function getCarparkBayById(id: string): CarparkBay | undefined {
  return carparkBays.find((b) => b.id === id)
}

export function getAvailableBays(): CarparkBay[] {
  return carparkBays.filter((b) => b.status === 'AVAILABLE')
}
