// One-off generator: scans public/*.601 folders and emits src/data/storage-units.ts
// Run: node scripts/gen-storage-units.mjs
import fs from 'node:fs'
import path from 'node:path'

const PUBLIC = path.resolve('public')
const OUT = path.resolve('src/data/storage-units.ts')

// Floor by unit letter prefix (matches existing data: D=L3, E=L4, F=L5, G=L6, H=L7)
const FLOOR = { D: 'Level 3', E: 'Level 4', F: 'Level 5', G: 'Level 6', H: 'Level 7' }

// Size fallback (sqm) for units whose filenames don't encode a size
const SIZE_FALLBACK = {
  D71: 3.2, D74: 2.2, E105: 2.4, E106: 2.2, E132: 6, E46: 2.2, F5: 10, F76: 3.2,
}

// Price overrides to preserve existing live prices (otherwise derived from size)
const PRICE_OVERRIDE = {
  D21: 270, D5: 90, F132: 120, H42: 350,
}

// Per-unit YouTube video + authoritative status, derived from the client's
// playlist (PLC7m8CVmXqwpISbE_9IfEuXTCzXuzTF6d). Titles encode unit/status/size.
// Map: { UNIT: { video, status } } — see src/data/archive-video-map.json
const VIDEO_MAP = JSON.parse(
  fs.readFileSync(path.resolve('src/data/archive-video-map.json'), 'utf8')
)
function videoFor(unit) {
  const e = VIDEO_MAP[unit]
  return e ? `https://youtu.be/${e.video}` : undefined
}
// ── Client status update (latest, takes precedence over video titles) ──────
// Units the client asked to take down entirely.
const REMOVE = new Set(['D56B', 'D115', 'G46'])

// Explicit status from the client's latest list (overrides video-derived status).
// Note: client's "D32a" maps to our unit "D32".
const STATUS_OVERRIDE = {
  D5: 'LEASED', D10A: 'LEASED', D32: 'LEASED', D32B: 'LEASED', D71: 'LEASED',
  D74: 'LEASED', D75: 'LEASED', D82: 'LEASED', D101: 'LEASED', E3: 'LEASED',
  E21: 'LEASED', E46: 'LEASED', E86: 'LEASED', E87: 'LEASED', E106: 'LEASED',
  F37: 'LEASED', F76: 'LEASED', H39: 'LEASED',
}

// Units with an upcoming availability date (currently tenanted until then).
const AVAILABLE_FROM = {
  D71: '2026-07-12', // "with current renter, avail on July 12"
}

// Display-label corrections (folder token differs from the client's label).
// Client confirmed the D32.601 unit is "D32a" (D32b is a separate unit).
const LABEL_OVERRIDE = {
  D32: 'D32A',
}

// Status priority: client override → playlist title → fallback.
function statusFor(unit, fallback = 'AVAILABLE') {
  if (STATUS_OVERRIDE[unit]) return STATUS_OVERRIDE[unit]
  const e = VIDEO_MAP[unit]
  return e && (e.status === 'LEASED' || e.status === 'AVAILABLE') ? e.status : fallback
}

const SHARED_FEATURES = [
  '24/7 Monitored Security',
  'Individual Lock & Key',
  'Climate Controlled Environment',
  'Goods Lift Access',
  '7 Days a Week Access',
]

function priceForSize(sqm) {
  if (sqm <= 2.5) return 80
  if (sqm <= 3.5) return 110
  if (sqm <= 4.5) return 150
  if (sqm <= 5.5) return 180
  if (sqm <= 6.5) return 200
  if (sqm <= 8.5) return 250
  if (sqm <= 9.5) return 300
  return 400
}

function sizeCategory(sqm) {
  if (sqm <= 2.5) return '2sqm'
  if (sqm <= 3.5) return '3sqm'
  if (sqm <= 4.5) return '4sqm'
  if (sqm <= 5.5) return '5sqm'
  if (sqm <= 6.5) return '6sqm'
  if (sqm <= 7.5) return '7sqm'
  if (sqm <= 8.5) return '8sqm'
  if (sqm <= 9.5) return '9sqm'
  return '10sqm+'
}

function descFor(sqm) {
  if (sqm <= 2.5) return 'Entry-level storage unit at The Archive, 601 Little Collins Street. Available now.'
  if (sqm <= 4.5) return 'Secure storage unit at The Archive, 601 Little Collins Street. Available now.'
  if (sqm <= 6.5) return 'Mid-size storage unit at The Archive, 601 Little Collins Street. Available now.'
  return 'Large storage unit at The Archive, 601 Little Collins Street. Ideal for business inventory or large furniture. Available now.'
}

const folders = fs.readdirSync(PUBLIC)
  .filter((f) => f.endsWith('.601') && fs.statSync(path.join(PUBLIC, f)).isDirectory())
  .sort()

const units = []

for (const folder of folders) {
  const token = folder.replace(/\.601$/, '')      // e.g. "D101", "D56b", "H42"
  const unitNumber = token.toUpperCase()           // display: D56B, H42
  if (REMOVE.has(unitNumber)) continue             // client asked to take these down
  const letter = token[0].toUpperCase()
  const files = fs.readdirSync(path.join(PUBLIC, folder))

  // Only keep this unit's own photos (filters out mislabeled stray files) + the shared Loading photo
  const own = files.filter(
    (f) => f.toLowerCase().startsWith(token.toLowerCase()) || /loading/i.test(f)
  )

  // Order: FURNISHED first (client wants it as the hero), then clean internal,
  // then external/marketing, then Loading & Lift (shared facility photo, last)
  const loading = own.filter((f) => /loading/i.test(f))
  const rest = own.filter((f) => !/loading/i.test(f))
  const cleanInternal = rest.filter((f) => /internal/i.test(f) && !/furnitur/i.test(f) && !/external|marketing/i.test(f))
  const furniture = rest.filter((f) => /furnitur/i.test(f))
  const extra = rest.filter((f) => /external|marketing/i.test(f))
  const orderedNames = [...furniture, ...cleanInternal, ...extra, ...loading]
  const images = orderedNames.map((f) => `/${folder}/${f}`)

  // Infer size: first "Xsqm" or "X.Xsqm" found in any filename, else fallback
  let sqm = null
  for (const f of files) {
    const m = f.match(/(\d+(?:\.\d+)?)\s*sqm/i)
    if (m) { sqm = parseFloat(m[1]); break }
  }
  if (sqm == null) sqm = SIZE_FALLBACK[unitNumber] ?? SIZE_FALLBACK[token] ?? 2.2

  const price = PRICE_OVERRIDE[unitNumber] ?? priceForSize(sqm)

  units.push({
    id: `archive-unit-${token.toLowerCase()}`,
    unitNumber: LABEL_OVERRIDE[unitNumber] ?? unitNumber,
    size: sqm,
    sizeCategory: sizeCategory(sqm),
    price,
    status: statusFor(unitNumber),
    availableFrom: AVAILABLE_FROM[unitNumber],
    images,
    videoUrl: videoFor(unitNumber),
    description: descFor(sqm),
    features: SHARED_FEATURES,
    floor: FLOOR[letter] ?? 'Level 3',
  })
}

// Units that are listed but have no photos yet — keep on placeholder until photos arrive
const PLACEHOLDER_UNITS = [
  { unitNumber: 'F73', size: 2.4, price: 80,  floor: 'Level 5' },
  { unitNumber: 'G46', size: 6,   price: 200, floor: 'Level 6' },
]
for (const p of PLACEHOLDER_UNITS) {
  if (REMOVE.has(p.unitNumber)) continue
  units.push({
    id: `archive-unit-${p.unitNumber.toLowerCase()}`,
    unitNumber: p.unitNumber,
    size: p.size,
    sizeCategory: sizeCategory(p.size),
    price: p.price,
    status: statusFor(p.unitNumber),
    availableFrom: AVAILABLE_FROM[p.unitNumber],
    images: ['/F5.jpg'],
    videoUrl: videoFor(p.unitNumber),
    description: descFor(p.size),
    features: SHARED_FEATURES,
    floor: p.floor,
  })
}

// Sort: keep a stable display order — by floor then unit number
units.sort((a, b) => a.floor.localeCompare(b.floor) || a.unitNumber.localeCompare(b.unitNumber, undefined, { numeric: true }))

const body = units.map((u) => {
  const lines = [
    '  {',
    `    id: ${JSON.stringify(u.id)},`,
    `    unitNumber: ${JSON.stringify(u.unitNumber)},`,
    `    size: ${u.size},`,
    `    sizeCategory: ${JSON.stringify(u.sizeCategory)},`,
    `    price: ${u.price},`,
    `    status: ${JSON.stringify(u.status)},`,
    `    images: ${JSON.stringify(u.images)},`,
  ]
  if (u.availableFrom) lines.push(`    availableFrom: ${JSON.stringify(u.availableFrom)},`)
  if (u.videoUrl) lines.push(`    videoUrl: ${JSON.stringify(u.videoUrl)},`)
  lines.push(`    description: ${JSON.stringify(u.description)},`)
  lines.push(`    features: SHARED_FEATURES,`)
  lines.push(`    floor: ${JSON.stringify(u.floor)},`)
  lines.push('  },')
  return lines.join('\n')
}).join('\n')

const file = `// Storage units at The Archive - 601 Little Collins St, Melbourne
// NOTE: array generated from public/*.601 photo folders by scripts/gen-storage-units.mjs

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

const SHARED_FEATURES = [
  '24/7 Monitored Security',
  'Individual Lock & Key',
  'Climate Controlled Environment',
  'Goods Lift Access',
  '7 Days a Week Access',
]

// Storage units with individual photos
export const storageUnits: StorageUnit[] = [
${body}
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
  description: \`601 Little Collins Street – Secure 24/7 Storage Facility

Located in the heart of Melbourne's CBD, this modern storage facility offers safe, clean, and convenient storage solutions within 'The Archive' building at 601 Little Collins Street, MELBOURNE. Each unit is individually secured, accessible 7-days a week, and designed for personal or business use — ideal for storing documents, furniture, stock, or personal belongings.

Enjoy 24/7 monitored security, goods-lift access, and a well-maintained environment just moments from Southern Cross Station.\`,
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
`

fs.writeFileSync(OUT, file)
console.log(`Wrote ${units.length} units to ${OUT}`)
// Print a quick review table
let withVideo = 0, leased = 0
for (const u of units) {
  if (u.videoUrl) withVideo++
  if (u.status === 'LEASED') leased++
  console.log(
    `${u.unitNumber.padEnd(6)} ${String(u.size).padStart(4)}sqm  $${String(u.price).padStart(3)}  ${u.status.padEnd(9)} ${u.floor}  ${u.videoUrl ? '▶ video' : '— no video'}  (${u.images.length} img)`
  )
}
console.log(`\n${withVideo}/${units.length} units have a video · ${leased} leased · ${units.length - leased} available`)
const noVideo = units.filter((u) => !u.videoUrl).map((u) => u.unitNumber)
if (noVideo.length) console.log(`No video matched: ${noVideo.join(', ')}`)
