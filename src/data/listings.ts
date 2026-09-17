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
    // New management (Sept 2026). Eamon is re-shooting photos and video; the two
    // virtually staged images below are the interim marketing shots (tagged
    // Unfurnished). Bed/bath/car from the public record for this address.
    // Rent to come — Coming Soon until the new photos and price arrive.
    id: '17-third-ave-dandenong-north',
    slug: 'house-17-third-avenue-dandenong-north',
    title: '17 Third Avenue, Dandenong North',
    summary: 'Three-bedroom brick home with carport, close to Dandenong Plaza and schools — new photos coming',
    type: 'RESIDENTIAL',
    status: 'COMING_SOON',
    address: '17 Third Avenue',
    suburb: 'Dandenong North',
    state: 'VIC',
    postcode: '3175',
    bedrooms: 3,
    bathrooms: 1,
    carSpaces: 1,
    heroImageUrl: '/17-third-ave-dandenong-north/kitchen-staged.jpg',
    description: `A solid three-bedroom brick home on a generous block in Dandenong North, freshly presented and coming to market with Touchwood.

Property Highlights:

Kitchen and meals area with electric cooking and plenty of bench space, opening to the rear yard
Three bedrooms with roller blinds and garden outlooks
Bathroom with separate toilet
Split system heating and cooling
Carport plus a long driveway for extra off-street parking

Lifestyle & Location:

Minutes to Dandenong Plaza, Dandenong Market and Dandenong Station
Local primary and secondary schools within walking distance
Easy access to the Monash Freeway and EastLink

Images shown are virtually staged and the property is offered unfurnished. Fresh photography is on its way — contact our team for the weekly rent and availability date, or to register your interest.`,
    features: [
      'Three bedrooms with built-in robes',
      'Kitchen and meals area opening to the yard',
      'Split system heating and cooling',
      'Bathroom with separate toilet',
      'Carport plus long driveway',
      'Close to Dandenong Plaza and Dandenong Station',
      'Offered unfurnished',
    ],
    gallery: [
      { url: '/17-third-ave-dandenong-north/kitchen-staged.jpg', alt: 'Kitchen and meals area at 17 Third Avenue, Dandenong North (virtually staged, offered unfurnished)', width: 1448, height: 1086 },
      { url: '/17-third-ave-dandenong-north/bedroom-staged.jpg', alt: 'Main bedroom at 17 Third Avenue, Dandenong North (virtually staged, offered unfurnished)', width: 1448, height: 1086 },
    ],
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'properties',
  },
  {
    // Photos + floorplan supplied via Dropbox 14 Sep 2026 (floorplan states
    // 2 bed / 1 bath / 1 car, 79 sqm approx, furnished). Rent and available
    // date never supplied. Leased per client email 17 Sep 2026.
    id: '23-114-dodds-st-southbank',
    slug: 'apartment-23-114-dodds-street-southbank',
    title: '23/114 Dodds Street, Southbank',
    summary: 'Furnished two-bedroom apartment with balcony and secure car space in Southbank Gardens',
    type: 'RESIDENTIAL',
    status: 'LEASED',
    address: '23/114 Dodds Street',
    suburb: 'Southbank',
    state: 'VIC',
    postcode: '3006',
    bedrooms: 2,
    bathrooms: 1,
    carSpaces: 1,
    floorAreaSqm: 79,
    heroImageUrl: '/23-114-dodds-st-southbank/living-1.jpeg',
    description: `A light-filled, fully furnished two-bedroom apartment in the leafy, low-rise Southbank Gardens complex on Dodds Street.

Property Highlights:

Open plan living and dining opening to a private balcony with a leafy outlook
Kitchen with electric cooktop, oven and dishwasher
Two bedrooms with built-in robes
Bathroom with bath and shower, separate toilet
Split system heating and cooling
Secure undercover car space and intercom entry
Approximately 79 sqm internal (as per floorplan), furnished

Lifestyle & Location:

Walk to South Melbourne Market, Clarendon Street cafes and the Southbank arts precinct
Trams on Clarendon Street and Sturt Street for a quick trip to the CBD
Close to the Royal Botanic Gardens and Albert Park Lake

Contact our team for the weekly rent and availability date, or to arrange an inspection.`,
    features: [
      'Fully furnished',
      'Open plan living and dining',
      'Private balcony with leafy outlook',
      'Kitchen with dishwasher',
      'Two bedrooms with built-in robes',
      'Bathroom with bath and shower',
      'Split system heating and cooling',
      'Secure undercover car space',
      'Intercom entry',
      'Walk to South Melbourne Market',
    ],
    gallery: [
      { url: '/23-114-dodds-st-southbank/living-1.jpeg', alt: 'Furnished living room at 23/114 Dodds Street, Southbank', width: 1448, height: 1086 },
      { url: '/23-114-dodds-st-southbank/living-2.jpeg', alt: 'Living area opening to the balcony at 23/114 Dodds Street, Southbank', width: 1536, height: 1024 },
      { url: '/23-114-dodds-st-southbank/dining.jpeg', alt: 'Dining area at 23/114 Dodds Street, Southbank', width: 1536, height: 1024 },
      { url: '/23-114-dodds-st-southbank/kitchen.jpeg', alt: 'Kitchen with dishwasher at 23/114 Dodds Street, Southbank', width: 1536, height: 1024 },
      { url: '/23-114-dodds-st-southbank/bedroom-1.jpeg', alt: 'Main bedroom at 23/114 Dodds Street, Southbank', width: 1537, height: 1023 },
      { url: '/23-114-dodds-st-southbank/bedroom-2.jpeg', alt: 'Second bedroom with study desk at 23/114 Dodds Street, Southbank', width: 1448, height: 1086 },
      { url: '/23-114-dodds-st-southbank/bathroom.jpeg', alt: 'Bathroom with bath and shower at 23/114 Dodds Street, Southbank', width: 1448, height: 1086 },
      { url: '/23-114-dodds-st-southbank/balcony.jpeg', alt: 'Balcony with leafy outlook at 23/114 Dodds Street, Southbank', width: 1536, height: 1024 },
      { url: '/23-114-dodds-st-southbank/exterior-dusk.jpeg', alt: 'Southbank Gardens complex at 114 Dodds Street at dusk', width: 1553, height: 1013 },
      { url: '/23-114-dodds-st-southbank/floorplan.jpeg', alt: 'Floorplan for 23/114 Dodds Street, Southbank', width: 1536, height: 1024 },
    ],
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'properties',
  },
  {
    // Photos supplied via Dropbox 14 Sep 2026. Furnished two-bedroom in the
    // UniLodge on Lonsdale building. Rent $600/week confirmed by client 17 Sep 2026.
    id: '2016-39-lonsdale',
    slug: 'apartment-2016-39-lonsdale-street-melbourne',
    title: '2016/39 Lonsdale Street, Melbourne',
    summary: 'Furnished two-bedroom apartment in the Paris end of the Melbourne CBD',
    type: 'RESIDENTIAL',
    status: 'FOR_RENT',
    price: 600,
    pricePeriod: 'per_week',
    address: '2016/39 Lonsdale Street',
    suburb: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    bedrooms: 2,
    bathrooms: 1,
    carSpaces: 0,
    heroImageUrl: '/2016-39-lonsdale-st-melbourne/living.jpeg',
    description: `A fully furnished two-bedroom apartment on level 20 of 39 Lonsdale Street, at the quieter Paris end of the CBD.

Property Highlights:

Furnished living area with sofa and wall-mounted TV
Open plan kitchenette with cooktop, microwave and bar fridge
Two bedrooms, each with a bed, desk and built-in storage
Modern bathroom with shower
Secure building entry with on-site management, communal laundry and residents' lounge

Lifestyle & Location:

Steps to RMIT, the State Library, QV and Chinatown
Parliament and Melbourne Central stations both within a short walk
Trams on Swanston Street and Lonsdale Street at the door

Contact our team to arrange an inspection.`,
    features: [
      'Fully furnished',
      'Two bedrooms with desks and built-in storage',
      'Kitchenette with cooktop and microwave',
      'Modern bathroom',
      'Secure entry and on-site building management',
      'Communal laundry and residents\' lounge',
      'Walk to RMIT, State Library and QV',
    ],
    gallery: [
      { url: '/2016-39-lonsdale-st-melbourne/living.jpeg', alt: 'Furnished living area at 2016/39 Lonsdale Street, Melbourne', width: 1448, height: 1086 },
      { url: '/2016-39-lonsdale-st-melbourne/living-kitchen.jpeg', alt: 'Living area and kitchenette at 2016/39 Lonsdale Street, Melbourne', width: 1448, height: 1086 },
      { url: '/2016-39-lonsdale-st-melbourne/kitchen.jpeg', alt: 'Kitchenette at 2016/39 Lonsdale Street, Melbourne', width: 1448, height: 1086 },
      { url: '/2016-39-lonsdale-st-melbourne/bedroom-1.jpeg', alt: 'Main bedroom with desk at 2016/39 Lonsdale Street, Melbourne', width: 1448, height: 1086 },
      { url: '/2016-39-lonsdale-st-melbourne/bedroom-2.jpeg', alt: 'Second bedroom with desk at 2016/39 Lonsdale Street, Melbourne', width: 1448, height: 1086 },
      { url: '/2016-39-lonsdale-st-melbourne/bathroom.jpeg', alt: 'Bathroom at 2016/39 Lonsdale Street, Melbourne', width: 1448, height: 1086 },
      { url: '/2016-39-lonsdale-st-melbourne/building.jpeg', alt: '39 Lonsdale Street building exterior, Melbourne', width: 1632, height: 964 },
    ],
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'properties',
  },
  {
    // Photos + floorplan supplied via Dropbox (Aug 2026). Leased per client email 17 Sep 2026.
    id: '2-15-victoria-ave-mitcham',
    slug: 'unit-2-15-victoria-avenue-mitcham',
    title: '2/15 Victoria Avenue, Mitcham',
    summary: 'Modern two-bedroom unit with landscaped courtyard and lock-up garage, walk to Mitcham Station',
    type: 'RESIDENTIAL',
    status: 'LEASED',
    address: '2/15 Victoria Avenue',
    suburb: 'Mitcham',
    state: 'VIC',
    postcode: '3132',
    bedrooms: 2,
    bathrooms: 1,
    carSpaces: 1,
    heroImageUrl: '/2-15-victoria-ave-mitcham/exterior-front.jpeg',
    description: `A contemporary brick unit in a quiet Mitcham street, with a private landscaped courtyard and a single lock-up garage.

Property Highlights:

Open plan living and dining with split system heating and cooling
Stone-bench kitchen with island, gas cooktop, stainless steel appliances and dishwasher
Two bedrooms with built-in robes, the main with courtyard outlook
Central bathroom with shower and vanity, plus separate powder room
Private paved courtyard with Japanese-style garden and feature lighting
Single lock-up garage with internal access

Lifestyle & Location:

Short walk to Mitcham Station and Mitcham Village shops
Close to Eastland, Whitehorse Road and the Eastlink
Well-regarded local schools and parkland nearby

Contact our team for the weekly rent and availability date, or to arrange an inspection.`,
    features: [
      'Open plan living and dining',
      'Split system heating and cooling',
      'Stone-bench kitchen with island and dishwasher',
      'Two bedrooms with built-in robes',
      'Bathroom plus separate powder room',
      'Private landscaped courtyard',
      'Single lock-up garage',
      'Walk to Mitcham Station',
    ],
    gallery: [
      { url: '/2-15-victoria-ave-mitcham/exterior-front.jpeg', alt: 'Front exterior of 2/15 Victoria Avenue, Mitcham', width: 1320, height: 978 },
      { url: '/2-15-victoria-ave-mitcham/living-1.jpeg', alt: 'Open plan living area at 2/15 Victoria Avenue, Mitcham', width: 1320, height: 968 },
      { url: '/2-15-victoria-ave-mitcham/living-2.jpeg', alt: 'Living and dining with kitchen beyond at 2/15 Victoria Avenue, Mitcham', width: 1320, height: 977 },
      { url: '/2-15-victoria-ave-mitcham/kitchen.jpeg', alt: 'Stone-bench kitchen with island at 2/15 Victoria Avenue, Mitcham', width: 1320, height: 982 },
      { url: '/2-15-victoria-ave-mitcham/living-3.jpeg', alt: 'Living area at 2/15 Victoria Avenue, Mitcham', width: 1320, height: 981 },
      { url: '/2-15-victoria-ave-mitcham/bedroom-1a.jpeg', alt: 'Main bedroom at 2/15 Victoria Avenue, Mitcham', width: 1320, height: 975 },
      { url: '/2-15-victoria-ave-mitcham/bedroom-1b.jpeg', alt: 'Main bedroom with built-in robes at 2/15 Victoria Avenue, Mitcham', width: 1320, height: 981 },
      { url: '/2-15-victoria-ave-mitcham/bedroom-2a.jpeg', alt: 'Second bedroom at 2/15 Victoria Avenue, Mitcham', width: 1320, height: 977 },
      { url: '/2-15-victoria-ave-mitcham/bedroom-2b.jpeg', alt: 'Second bedroom with built-in robes at 2/15 Victoria Avenue, Mitcham', width: 1320, height: 973 },
      { url: '/2-15-victoria-ave-mitcham/bathroom.jpeg', alt: 'Bathroom at 2/15 Victoria Avenue, Mitcham', width: 1320, height: 979 },
      { url: '/2-15-victoria-ave-mitcham/powder-room.jpeg', alt: 'Powder room at 2/15 Victoria Avenue, Mitcham', width: 1212, height: 1600 },
      { url: '/2-15-victoria-ave-mitcham/courtyard-day.jpeg', alt: 'Landscaped courtyard at 2/15 Victoria Avenue, Mitcham', width: 1320, height: 960 },
      { url: '/2-15-victoria-ave-mitcham/courtyard-night.jpeg', alt: 'Courtyard with feature lighting at night at 2/15 Victoria Avenue, Mitcham', width: 1320, height: 973 },
      { url: '/2-15-victoria-ave-mitcham/garage.jpeg', alt: 'Lock-up garage at 2/15 Victoria Avenue, Mitcham', width: 1320, height: 973 },
      { url: '/2-15-victoria-ave-mitcham/floorplan.jpeg', alt: 'Floorplan for 2/15 Victoria Avenue, Mitcham', width: 1322, height: 1190 },
    ],
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'properties',
  },
  {
    // Photos + floorplan supplied via Dropbox (Jul/Aug 2026). Bed/bath/car
    // counts taken from the public record for this address — confirm with
    // Touchwood. The public record also shows a 2026 sale campaign for this
    // address, so confirm it is for lease (not sale). Rent still to come. Leased per client email 17 Sep 2026.
    id: '22-teal-court-dandenong-north',
    slug: 'house-22-teal-court-dandenong-north',
    title: '22 Teal Court, Dandenong North',
    summary: 'Renovated four-bedroom family home on a quiet court with landscaped gardens',
    type: 'RESIDENTIAL',
    status: 'LEASED',
    address: '22 Teal Court',
    suburb: 'Dandenong North',
    state: 'VIC',
    postcode: '3175',
    bedrooms: 4,
    bathrooms: 1,
    carSpaces: 2,
    heroImageUrl: '/22-teal-court-dandenong-north/exterior-front.jpeg',
    description: `A freshly presented brick family home in a quiet Dandenong North court, with polished timber floors, updated kitchen and bathroom, and landscaped front and rear gardens.

Property Highlights:

Spacious living and dining with split system heating and cooling
Timber kitchen with stainless steel appliances, gas cooktop and dishwasher
Four bedrooms with built-in robes — the fourth ideal as a study
Renovated bathroom with walk-in shower and floating vanity
Separate laundry with dryer
Landscaped rear garden with paved entertaining area and lawn
Garage plus carport and off-street parking

Lifestyle & Location:

Close to Dandenong Plaza, Dandenong Market and Dandenong Station
Local primary and secondary schools within easy reach
Easy access to the Monash Freeway and EastLink

Contact our team for the weekly rent and availability date, or to arrange an inspection.`,
    features: [
      'Four bedrooms with built-in robes',
      'Polished timber floors',
      'Split system heating and cooling',
      'Kitchen with gas cooktop and dishwasher',
      'Renovated bathroom with walk-in shower',
      'Separate laundry',
      'Landscaped rear garden with paved entertaining area',
      'Garage plus carport',
    ],
    gallery: [
      { url: '/22-teal-court-dandenong-north/exterior-front.jpeg', alt: 'Front exterior of 22 Teal Court, Dandenong North at dusk', width: 1448, height: 1086 },
      { url: '/22-teal-court-dandenong-north/living-1.jpeg', alt: 'Living room at 22 Teal Court, Dandenong North', width: 1448, height: 1086 },
      { url: '/22-teal-court-dandenong-north/living-2.jpeg', alt: 'Living and dining area at 22 Teal Court, Dandenong North', width: 1448, height: 1086 },
      { url: '/22-teal-court-dandenong-north/dining.jpeg', alt: 'Dining area at 22 Teal Court, Dandenong North', width: 1448, height: 1086 },
      { url: '/22-teal-court-dandenong-north/kitchen.jpeg', alt: 'Timber kitchen with stainless steel appliances at 22 Teal Court, Dandenong North', width: 1448, height: 1086 },
      { url: '/22-teal-court-dandenong-north/hallway.jpeg', alt: 'Hallway at 22 Teal Court, Dandenong North', width: 1448, height: 1086 },
      { url: '/22-teal-court-dandenong-north/bedroom-1.jpeg', alt: 'Main bedroom at 22 Teal Court, Dandenong North', width: 1448, height: 1086 },
      { url: '/22-teal-court-dandenong-north/bedroom-2.jpeg', alt: 'Bedroom with mirrored built-in robes at 22 Teal Court, Dandenong North', width: 1448, height: 1086 },
      { url: '/22-teal-court-dandenong-north/bedroom-3.jpeg', alt: 'Bedroom at 22 Teal Court, Dandenong North', width: 1448, height: 1086 },
      { url: '/22-teal-court-dandenong-north/bedroom-4.jpeg', alt: 'Fourth bedroom or study at 22 Teal Court, Dandenong North', width: 1448, height: 1086 },
      { url: '/22-teal-court-dandenong-north/bathroom.jpeg', alt: 'Renovated bathroom at 22 Teal Court, Dandenong North', width: 1448, height: 1086 },
      { url: '/22-teal-court-dandenong-north/laundry.jpeg', alt: 'Laundry at 22 Teal Court, Dandenong North', width: 1448, height: 1086 },
      { url: '/22-teal-court-dandenong-north/backyard-1.jpeg', alt: 'Landscaped rear garden at 22 Teal Court, Dandenong North', width: 1448, height: 1086 },
      { url: '/22-teal-court-dandenong-north/backyard-2.jpeg', alt: 'Rear garden and clothesline at 22 Teal Court, Dandenong North', width: 1448, height: 1086 },
      { url: '/22-teal-court-dandenong-north/floorplan.jpeg', alt: 'Floorplan for 22 Teal Court, Dandenong North', width: 1086, height: 1448 },
    ],
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'properties',
  },
  {
    // Photos + floorplan supplied via Dropbox (floorplan states 3 bed / 1 bath /
    // 2 car). The set also included AI-rendered local-amenity images
    // (Watergardens, park, school, childcare) which are not used here.
    // Rent still to come. Leased per client email 17 Sep 2026.
    id: '37-boberrit-wynd-sydenham',
    slug: 'house-37-boberrit-wynd-sydenham',
    title: '37 Boberrit Wynd, Sydenham',
    summary: 'Three-bedroom brick home with double garage and shed, minutes from Watergardens',
    type: 'RESIDENTIAL',
    status: 'LEASED',
    address: '37 Boberrit Wynd',
    suburb: 'Sydenham',
    state: 'VIC',
    postcode: '3037',
    bedrooms: 3,
    bathrooms: 1,
    carSpaces: 2,
    heroImageUrl: '/37-boberrit-wynd-sydenham/exterior-front.jpg',
    description: `A neatly presented single-level brick home on a quiet Sydenham street, with a double garage, rear shed and easy-care gardens.

Property Highlights:

Front lounge with ceiling fan and large windows
Separate meals area adjoining the kitchen
Kitchen with electric cooktop, wall oven and ample bench space
Three bedrooms, the main with ensuite access to the bathroom and built-in robes
Bathroom with bath, shower and skylight
Study or home office space
Double lock-up garage plus garden shed

Lifestyle & Location:

Minutes to Watergardens Town Centre and Watergardens Station
Close to Sydenham Park, local primary schools and childcare
Quick access to the Calder Freeway

Contact our team for the weekly rent and availability date, or to arrange an inspection.`,
    features: [
      'Three bedrooms with built-in robes',
      'Separate lounge and meals area',
      'Kitchen with wall oven and electric cooktop',
      'Bathroom with bath and shower',
      'Study or home office',
      'Double lock-up garage',
      'Garden shed',
      'Minutes to Watergardens',
    ],
    gallery: [
      { url: '/37-boberrit-wynd-sydenham/exterior-front.jpg', alt: 'Front exterior of 37 Boberrit Wynd, Sydenham', width: 1536, height: 1024 },
      { url: '/37-boberrit-wynd-sydenham/living.jpg', alt: 'Lounge room at 37 Boberrit Wynd, Sydenham', width: 1448, height: 1086 },
      { url: '/37-boberrit-wynd-sydenham/dining.jpg', alt: 'Meals area at 37 Boberrit Wynd, Sydenham', width: 1536, height: 1024 },
      { url: '/37-boberrit-wynd-sydenham/kitchen.jpg', alt: 'Kitchen at 37 Boberrit Wynd, Sydenham', width: 1536, height: 1024 },
      { url: '/37-boberrit-wynd-sydenham/bedroom-1.jpg', alt: 'Main bedroom at 37 Boberrit Wynd, Sydenham', width: 1448, height: 1086 },
      { url: '/37-boberrit-wynd-sydenham/bedroom-2.jpg', alt: 'Bedroom at 37 Boberrit Wynd, Sydenham', width: 1448, height: 1086 },
      { url: '/37-boberrit-wynd-sydenham/study.jpg', alt: 'Study at 37 Boberrit Wynd, Sydenham', width: 1448, height: 1086 },
      { url: '/37-boberrit-wynd-sydenham/bathroom.jpg', alt: 'Bathroom with bath and skylight at 37 Boberrit Wynd, Sydenham', width: 1448, height: 1086 },
      { url: '/37-boberrit-wynd-sydenham/garage.jpg', alt: 'Double garage at 37 Boberrit Wynd, Sydenham', width: 1536, height: 1024 },
      { url: '/37-boberrit-wynd-sydenham/exterior-rear.jpg', alt: 'Rear of the house and lawn at 37 Boberrit Wynd, Sydenham', width: 1536, height: 1024 },
      { url: '/37-boberrit-wynd-sydenham/floorplan.jpg', alt: 'Floorplan for 37 Boberrit Wynd, Sydenham', width: 1092, height: 1001 },
    ],
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'properties',
  },
  {
    id: '22-23-coate-ave-alphington',
    slug: 'townhouse-22-23-coate-avenue-alphington',
    title: '22/23 Coate Avenue, Alphington',
    summary:
      'Beautifully presented three-bedroom semi-detached home with private courtyard and garage — leased',
    type: 'RESIDENTIAL',
    status: 'LEASED',
    price: 695,
    pricePeriod: 'per_week',
    address: '22/23 Coate Avenue',
    suburb: 'Alphington',
    state: 'VIC',
    postcode: '3078',
    bedrooms: 3,
    bathrooms: 1,
    carSpaces: 1,
    floorAreaSqm: 116,
    heroImageUrl: '/22-23-coate-ave-alphington/Front-exterior.jpeg',
    description: `Nestled in a quiet, well-kept development in one of Melbourne's most sought-after inner-north pockets, this beautifully presented single-level semi-detached home combines light-filled interiors, quality updates and easy low-maintenance living.

Property Highlights:

Sun-drenched open plan living and dining area with split system heating & cooling and ceiling fans
Crisp white kitchen with island bench, gas cooktop, stainless steel appliances & dishwasher
Three well-sized bedrooms with built-in robes and garden outlooks
Stylishly renovated bathroom with bathtub, walk-in shower and brushed brass tapware
Separate toilet and full-sized internal laundry
Private landscaped courtyard garden — perfect for relaxing or entertaining outdoors
Single lock-up garage with convenient internal access
Freshly presented throughout with a warm, neutral palette

Lifestyle & Location:

Moments to Alphington Station for an easy CBD commute
Close to Darebin Parklands, the Yarra River trails and Alphington Park
Handy to local shops, cafes and the Alphington Village strip
Zoned access to well-regarded local schools

Why You'll Love It:

A move-in ready home offering space, style and serenity in a tightly held Alphington enclave — ideal for professionals, couples or small families seeking lifestyle and convenience.`,
    features: [
      'Sun-drenched open plan living and dining area',
      'Split system heating & cooling plus ceiling fans',
      'White kitchen with island bench and gas cooktop',
      'Stainless steel appliances and dishwasher',
      'Three bedrooms with built-in robes',
      'Renovated bathroom with bathtub and walk-in shower',
      'Brushed brass tapware and quality finishes',
      'Separate toilet and full-sized laundry',
      'Private landscaped courtyard garden',
      'Single lock-up garage',
      'Moments to Alphington Station — easy CBD commute',
      'Close to Darebin Parklands and Yarra River trails',
      'Near local shops, cafes and Alphington Village',
    ],
    gallery: [
      { url: '/22-23-coate-ave-alphington/Front-exterior.jpeg', alt: 'Front exterior of 22/23 Coate Avenue, Alphington', width: 1448, height: 1086 },
      { url: '/22-23-coate-ave-alphington/Front-door-garage.jpeg', alt: 'Front entry with lock-up garage', width: 1448, height: 1086 },
      { url: '/22-23-coate-ave-alphington/Living-room.jpeg', alt: 'Light-filled living room with garden outlook', width: 1448, height: 1086 },
      { url: '/22-23-coate-ave-alphington/Living-dining.jpeg', alt: 'Living and dining area', width: 1448, height: 1086 },
      { url: '/22-23-coate-ave-alphington/Kitchen-1.jpeg', alt: 'White kitchen with island bench and stainless steel appliances', width: 1448, height: 1086 },
      { url: '/22-23-coate-ave-alphington/Kitchen-2.jpeg', alt: 'Kitchen with gas cooktop, dishwasher and garden views', width: 1448, height: 1086 },
      { url: '/22-23-coate-ave-alphington/Master-bedroom.jpeg', alt: 'Main bedroom with mirrored built-in robes and ceiling fan', width: 1448, height: 1086 },
      { url: '/22-23-coate-ave-alphington/Bedroom-2.jpeg', alt: 'Second bedroom with garden outlook', width: 1448, height: 1086 },
      { url: '/22-23-coate-ave-alphington/Bathroom-1.jpeg', alt: 'Renovated bathroom with bathtub and brushed brass tapware', width: 1448, height: 1086 },
      { url: '/22-23-coate-ave-alphington/Bathroom-2.jpeg', alt: 'Bathroom with walk-in shower over bath', width: 1448, height: 1086 },
      { url: '/22-23-coate-ave-alphington/Toilet-1.jpeg', alt: 'Separate toilet', width: 1448, height: 1086 },
      { url: '/22-23-coate-ave-alphington/Toilet-2.jpeg', alt: 'Separate toilet with window', width: 1448, height: 1086 },
      { url: '/22-23-coate-ave-alphington/Laundry-1.jpeg', alt: 'Full-sized laundry with trough and storage', width: 1448, height: 1086 },
      { url: '/22-23-coate-ave-alphington/Laundry-2.jpeg', alt: 'Laundry with garden window', width: 1448, height: 1086 },
      { url: '/22-23-coate-ave-alphington/Backyard.jpeg', alt: 'Private landscaped courtyard garden', width: 1448, height: 1086 },
      { url: '/22-23-coate-ave-alphington/Floorplan.jpeg', alt: 'Floorplan for 22/23 Coate Avenue, Alphington', width: 1122, height: 1402 },
    ],
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'properties',
  },
  {
    // For Sale confirmed by client 17 Sep 2026. Price and copy still to come.
    id: '2002-555-swanston',
    slug: 'apartment-2002-555-swanston-street-carlton',
    title: '2002/555 Swanston Street, Carlton',
    summary: 'Two-bedroom, two-bathroom apartment with balcony and secure car space in Carlton',
    type: 'RESIDENTIAL',
    status: 'AVAILABLE',
    address: '2002/555 Swanston Street',
    suburb: 'Carlton',
    state: 'VIC',
    postcode: '3053',
    heroImageUrl: '/2002-555-swanston-st-carlton/2.jpeg',
    description:
      'A two-bedroom, two-bathroom apartment with balcony and secure car space at 555 Swanston Street, Carlton, coming to market for sale. Moments from Melbourne University, RMIT and Lygon Street. Full pricing details will be published shortly — for early enquiries or to arrange an inspection, please get in touch with our team.',
    gallery: [
      { url: '/2002-555-swanston-st-carlton/2.jpeg', alt: 'Balcony with city views at 2002/555 Swanston Street, Carlton', width: 1448, height: 1086 },
      { url: '/2002-555-swanston-st-carlton/3.jpeg', alt: 'Interior at 2002/555 Swanston Street, Carlton', width: 1448, height: 1086 },
      { url: '/2002-555-swanston-st-carlton/4.jpeg', alt: 'Interior at 2002/555 Swanston Street, Carlton', width: 1448, height: 1086 },
      { url: '/2002-555-swanston-st-carlton/5.jpeg', alt: 'Interior at 2002/555 Swanston Street, Carlton', width: 1448, height: 1086 },
      { url: '/2002-555-swanston-st-carlton/6.jpeg', alt: 'Interior at 2002/555 Swanston Street, Carlton', width: 1448, height: 1086 },
      { url: '/2002-555-swanston-st-carlton/7.jpeg', alt: 'Interior at 2002/555 Swanston Street, Carlton', width: 1448, height: 1086 },
      { url: '/2002-555-swanston-st-carlton/8.jpeg', alt: 'Interior at 2002/555 Swanston Street, Carlton', width: 1448, height: 1086 },
      { url: '/2002-555-swanston-st-carlton/9.jpeg', alt: 'Interior at 2002/555 Swanston Street, Carlton', width: 1448, height: 1086 },
      { url: '/2002-555-swanston-st-carlton/10.jpeg', alt: 'Interior at 2002/555 Swanston Street, Carlton', width: 1448, height: 1086 },
      { url: '/2002-555-swanston-st-carlton/11.jpeg', alt: 'Interior at 2002/555 Swanston Street, Carlton', width: 1449, height: 1086 },
      { url: '/2002-555-swanston-st-carlton/12.jpeg', alt: 'Building at 555 Swanston Street, Carlton', width: 1545, height: 1018 },
      { url: '/2002-555-swanston-st-carlton/13.jpeg', alt: 'Building at 555 Swanston Street, Carlton', width: 1537, height: 1023 },
      { url: '/2002-555-swanston-st-carlton/14.jpeg', alt: 'Building at 555 Swanston Street, Carlton', width: 1537, height: 1023 },
      { url: '/2002-555-swanston-st-carlton/1.jpeg', alt: 'Floorplan for 2002/555 Swanston Street, Carlton', width: 1126, height: 1397 },
    ],
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'properties',
  },
  {
    // Rental (For Lease) confirmed by client 17 Sep 2026. Rent still to come.
    id: '2111-22-24-jane-bell',
    slug: 'apartment-2111-22-24-jane-bell-lane-melbourne',
    title: '2111/22-24 Jane Bell Lane, Melbourne',
    summary: 'Two-bedroom apartment with secure car space in the Melbourne CBD',
    type: 'RESIDENTIAL',
    status: 'FOR_RENT',
    address: '2111/22-24 Jane Bell Lane',
    suburb: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    heroImageUrl: '/2111-22-24-jane-bell-lane/6.jpeg',
    description:
      'A two-bedroom apartment with secure car space at 22-24 Jane Bell Lane, Melbourne, coming to market for lease. Steps from Melbourne Central, the State Library and RMIT. Full pricing details will be published shortly — for early enquiries or to arrange an inspection, please get in touch with our team.',
    gallery: [
      { url: '/2111-22-24-jane-bell-lane/6.jpeg', alt: 'Kitchen at 2111/22-24 Jane Bell Lane, Melbourne', width: 1448, height: 1086 },
      { url: '/2111-22-24-jane-bell-lane/2.jpeg', alt: 'Bedroom at 2111/22-24 Jane Bell Lane, Melbourne', width: 1447, height: 1087 },
      { url: '/2111-22-24-jane-bell-lane/3.jpeg', alt: 'Interior at 2111/22-24 Jane Bell Lane, Melbourne', width: 1448, height: 1086 },
      { url: '/2111-22-24-jane-bell-lane/4.jpeg', alt: 'Interior at 2111/22-24 Jane Bell Lane, Melbourne', width: 1448, height: 1086 },
      { url: '/2111-22-24-jane-bell-lane/5.jpeg', alt: 'Interior at 2111/22-24 Jane Bell Lane, Melbourne', width: 1307, height: 969 },
      { url: '/2111-22-24-jane-bell-lane/7.jpeg', alt: 'Interior at 2111/22-24 Jane Bell Lane, Melbourne', width: 1086, height: 1448 },
      { url: '/2111-22-24-jane-bell-lane/8.jpeg', alt: 'Interior at 2111/22-24 Jane Bell Lane, Melbourne', width: 1448, height: 1086 },
      { url: '/2111-22-24-jane-bell-lane/9.jpeg', alt: 'Building at 22-24 Jane Bell Lane, Melbourne', width: 1536, height: 1024 },
      { url: '/2111-22-24-jane-bell-lane/10.jpeg', alt: 'Building at 22-24 Jane Bell Lane, Melbourne', width: 1529, height: 1029 },
      { url: '/2111-22-24-jane-bell-lane/1.png', alt: 'Floorplan for 2111/22-24 Jane Bell Lane, Melbourne', width: 1067, height: 1474 },
    ],
    agent: {
      name: 'Eamon Chau',
      phone: '+61 413 889 388',
      email: 'admin@touchwoodasset.com',
    },
    category: 'properties',
  },
  {
    id: '3',
    slug: 'carpark-211-powlett-st-east-melbourne',
    title: 'Secure Car Park at Tribeca, East Melbourne (lot. 31)',
    summary: 'Secure car park space — leased',
    type: 'ANCILLARY',
    status: 'LEASED',
    address: '31/211 Powlett Street',
    suburb: 'East Melbourne',
    state: 'VIC',
    postcode: '3002',
    heroImageUrl: '/carparks/211-powlett-st-east-melbourne/bay-31/1.jpeg',
    gallery: [
      {
        url: '/carparks/211-powlett-st-east-melbourne/bay-31/1.jpeg',
        alt: 'Car park lot 31 at Tribeca, 211 Powlett Street, East Melbourne',
        width: 1448,
        height: 1086,
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
    heroImageUrl: '/1316-lonsdale/Living%20room.jpg',
    gallery: [
      {
        url: '/1316-lonsdale/Living%20room.jpg',
        alt: 'Living area at 1316/39 Lonsdale Street, Melbourne',
        width: 1536,
        height: 1024,
      },
      {
        url: '/1316-lonsdale/Kitchen%20shot.jpg',
        alt: 'Kitchen at 1316/39 Lonsdale Street, Melbourne',
        width: 1536,
        height: 1024,
      },
      {
        url: '/1316-lonsdale/Bedroom%201.jpg',
        alt: 'Bedroom 1 at 1316/39 Lonsdale Street, Melbourne',
        width: 1620,
        height: 1080,
      },
      {
        url: '/1316-lonsdale/Bedroom%202.jpg',
        alt: 'Bedroom 2 at 1316/39 Lonsdale Street, Melbourne',
        width: 1620,
        height: 1080,
      },
      {
        url: '/1316-lonsdale/Bathroom%20shot.jpg',
        alt: 'Bathroom at 1316/39 Lonsdale Street, Melbourne',
        width: 1620,
        height: 1080,
      },
      {
        url: '/1316-lonsdale/Building%20shot.jpg',
        alt: 'Building exterior at 39 Lonsdale Street, Melbourne',
        width: 2000,
        height: 1204,
      },
      {
        url: '/1316-lonsdale/1316.39%20(floorplan).jpg',
        alt: 'Floorplan for 1316/39 Lonsdale Street, Melbourne',
        width: 750,
        height: 1080,
      },
    ],
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
    price: 240,
    pricePeriod: 'per_month',
    address: '593/11 Daly Street',
    suburb: 'South Yarra',
    state: 'VIC',
    postcode: '3141',
    heroImageUrl: '/carparks/11-daly-st-south-yarra/bay-593/1.jpeg',
    gallery: [
      {
        url: '/carparks/11-daly-st-south-yarra/bay-593/1.jpeg',
        alt: 'Car park bay 593 at 11 Daly Street, South Yarra',
        width: 1448,
        height: 1086,
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
    id: 'carpark-592-11-daly-st-south-yarra',
    slug: 'carpark-592-11-daly-st-south-yarra',
    title: 'Car Park – 592/11 Daly Street, South Yarra',
    summary: 'Secure car park space in South Yarra — leased',
    type: 'ANCILLARY',
    status: 'LEASED',
    address: '592/11 Daly Street',
    suburb: 'South Yarra',
    state: 'VIC',
    postcode: '3141',
    heroImageUrl: '/carparks/11-daly-st-south-yarra/bay-592/1.jpeg',
    gallery: [
      {
        url: '/carparks/11-daly-st-south-yarra/bay-592/1.jpeg',
        alt: 'Car park bay 592 at 11 Daly Street, South Yarra',
        width: 1448,
        height: 1086,
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
    id: 'carpark-863-58-franklin-st-melbourne',
    slug: 'carpark-863-58-franklin-st-melbourne',
    title: 'Car Park – 863/58 Franklin Street, Melbourne',
    summary: 'Secure car park space in Melbourne CBD — leased',
    type: 'ANCILLARY',
    status: 'LEASED',
    price: 240,
    pricePeriod: 'per_month',
    address: '863/58 Franklin Street',
    suburb: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    heroImageUrl: '/carparks/58-franklin-st-melbourne/bay-863/1.jpeg',
    gallery: [
      {
        url: '/carparks/58-franklin-st-melbourne/bay-863/1.jpeg',
        alt: 'Car park bay 863 at 58 Franklin Street, Melbourne',
        width: 1448,
        height: 1086,
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
    id: 'carpark-501-118-high-st-kew',
    slug: 'carpark-501-118-high-st-kew',
    title: 'Car Park – 501/118 High Street, Kew',
    summary: 'Secure car park space in Kew — leased',
    type: 'ANCILLARY',
    status: 'LEASED',
    price: 290,
    pricePeriod: 'per_month',
    address: '501/118 High Street',
    suburb: 'Kew',
    state: 'VIC',
    postcode: '3101',
    heroImageUrl: '/carparks/118-high-st-kew/bay-501/1.jpeg',
    gallery: [
      {
        url: '/carparks/118-high-st-kew/bay-501/1.jpeg',
        alt: 'Car park bay 501 at 118 High Street, Kew',
        width: 1448,
        height: 1086,
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
    id: 'carpark-273-135-fitzroy-st-st-kilda',
    slug: 'carpark-273-135-fitzroy-st-st-kilda',
    title: 'Car Park – 273/135 Fitzroy Street, St Kilda',
    summary: 'Secure car park space in St Kilda — leased',
    type: 'ANCILLARY',
    status: 'LEASED',
    price: 220,
    pricePeriod: 'per_month',
    address: '273/135 Fitzroy Street',
    suburb: 'St Kilda',
    state: 'VIC',
    postcode: '3182',
    heroImageUrl: '/carparks/135-fitzroy-st-st-kilda/bay-273/1.jpeg',
    gallery: [
      {
        url: '/carparks/135-fitzroy-st-st-kilda/bay-273/1.jpeg',
        alt: 'Car park bay 273 at 135 Fitzroy Street, St Kilda',
        width: 1448,
        height: 1086,
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
