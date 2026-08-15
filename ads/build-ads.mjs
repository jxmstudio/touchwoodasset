// Builds Touchwood Meta static ad creatives (1080x1350, 4:5 feed).
// Run: node ads/build-ads.mjs
//
// Photos are the real portfolio shots from /public. Each already carries a
// Touchwood watermark in one corner, so every crop below is chosen to exclude
// it — the creative supplies its own logo lockup instead.

import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'ads', 'out')

const W = 1080
const H = 1350
const M = 64 // safe margin
const PHOTO_H = 772

const RED = '#E1262B'
const RED_DARK = '#B11B20'
const INK = '#0F172A'
const GRAY = '#4B5563'
const FONT = 'Arial, Helvetica, sans-serif'

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Rough Arial advance-width estimate. Good enough to auto-fit headlines and
// size buttons; output is eyeballed after render.
const textW = (s, size, { bold = false, tracking = 0 } = {}) => {
  const factor = bold ? 0.575 : 0.525
  const caps = (s.match(/[A-Z]/g) || []).length / Math.max(s.length, 1)
  return s.length * size * (factor + caps * 0.055) + s.length * tracking
}

/** Shrink font size until the longest line fits the content width. */
const fitSize = (lines, start, min, maxW, opts) => {
  let size = start
  while (size > min && lines.some((l) => textW(l, size, opts) > maxW)) size -= 1
  return size
}

const CONTENT_W = W - M * 2

const ads = [
  {
    file: '01-landlords-500-switch.png',
    // Deliberately NO property photo. Every residential interior in /public
    // belongs to a SOLD or LEASED listing, and using one on a service ad can
    // imply the property is still available. Typographic offer hero instead.
    heroStyle: 'offer',
    offer: {
      amount: '$500',
      lines: ['when you switch your property', 'management to Touchwood.'],
      kicker: '+ $100 for every storage unit or car park you bring across.',
    },
    badge: 'LIMITED-TIME OFFER',
    eyebrow: 'MELBOURNE PROPERTY MANAGEMENT',
    headline: ['Switch your property', 'manager, get $500.'],
    sub: [
      'Transfer your management to Touchwood and we',
      'credit you $500 — plus $100 per storage or car park.',
    ],
    cta: 'Book a free appraisal',
    fineprint: '*Terms apply. Limited-time offer.',
  },
  {
    file: '02-storage-from-80.png',
    photo: 'public/F83.601/F83.601 (8sqm internal+furniture).jpg',
    // Watermark bottom-right from x~1090; keep the left 1080px.
    crop: { left: 0, top: 60, width: 1080, height: 780 },
    badge: 'AVAILABLE NOW',
    eyebrow: 'THE ARCHIVE · 601 LITTLE COLLINS ST',
    headline: ['CBD storage from', '$80 a month.'],
    sub: [
      'Units from 2 to 10 sqm in the heart of Melbourne.',
      '24/7 access, climate controlled, lift to your door.',
    ],
    cta: 'View available units',
    fineprint: 'Individual lock and key · Monitored security · No lock-in',
  },
  {
    file: '03-carparks-from-220.png',
    photo: 'public/carparks/255-drummond-st-carlton/bay-136/1.jpeg',
    // Watermark bottom-left; start the crop at x=400.
    crop: { left: 400, top: 200, width: 920, height: 664 },
    badge: 'BAYS AVAILABLE',
    eyebrow: 'CARLTON · CBD · DOCKLANDS · ST KILDA · KEW',
    headline: ['Secure car parking', 'from $220 a month.'],
    sub: [
      'Private, well-lit bays with 24/7 secure access across',
      'Melbourne. Month-to-month — no long lock-in.',
    ],
    cta: 'See available bays',
    fineprint: 'Price varies by building and bay size.',
  },
  {
    file: '04-brand-trust.png',
    // 401 Docklands Drive — bays 430/537/538 are currently AVAILABLE, so this
    // is a live managed asset. (Previously 1316/39 Lonsdale, which is LEASED.)
    photo: 'public/carparks/401-docklands-drive-docklands/bay-430/1.jpeg',
    // Watermark bottom-right from x~1060; keep the left 1040px.
    crop: { left: 0, top: 40, width: 1040, height: 751 },
    badge: 'MELBOURNE & VICTORIA',
    eyebrow: 'ONE TEAM. EVERY ASSET YOU OWN.',
    headline: ['220+ Melbourne assets', 'under management.'],
    sub: ['Apartments, car parks and storage — one point of contact.'],
    cta: 'Talk to Touchwood',
    statsLine: '220+ assets managed  ·  260+ clients  ·  25+ years experience',
  },
]

async function build(ad) {
  const photo = ad.photo
    ? await sharp(path.join(ROOT, ad.photo))
        .extract(ad.crop)
        .resize(W, PHOTO_H, { fit: 'cover' })
        .toBuffer()
    : null

  const logo = await sharp(path.join(ROOT, 'public/logo-touchwood.png'))
    .resize({ width: 250 })
    .toBuffer()
  const logoMeta = await sharp(logo).metadata()

  // ---- layout -------------------------------------------------------------
  const badgeFS = 26
  const badgeW = textW(ad.badge, badgeFS, { bold: true, tracking: 2 }) + 56

  const eyebrowY = 852
  const headFS = fitSize(ad.headline, 62, 40, CONTENT_W, { bold: true })
  const headLead = Math.round(headFS * 1.18)
  const headY = 920

  const subY = headY + (ad.headline.length - 1) * headLead + 52
  const subFS = 29
  const subLead = 41
  const subEnd = subY + (ad.sub.length - 1) * subLead

  // Optional stats line sits between the sub copy and the CTA.
  const statsY = ad.statsLine ? subEnd + subLead + 8 : subEnd

  const ctaFS = 32
  const ctaH = 88
  const ctaW = Math.round(textW(ad.cta, ctaFS, { bold: true }) + 76)
  const ctaY = statsY + 40

  const footerH = 76
  const footerY = H - footerH

  const parts = []
  const isOffer = ad.heroStyle === 'offer'

  if (isOffer) {
    // Solid brand-red hero carrying the offer typographically.
    const o = ad.offer
    parts.push(
      `<rect x="0" y="0" width="${W}" height="${PHOTO_H}" fill="${RED}"/>`,
      // badge: inverted (white pill, red text) so it reads on the red field
      `<rect x="${M}" y="${M}" width="${badgeW}" height="56" rx="28" fill="#ffffff"/>`,
      `<text x="${M + 28}" y="${M + 38}" font-family="${FONT}" font-size="${badgeFS}" font-weight="700" letter-spacing="2" fill="${RED}">${esc(ad.badge)}</text>`,
      `<text x="${M}" y="420" font-family="${FONT}" font-size="230" font-weight="700" fill="#ffffff">${esc(o.amount)}</text>`,
      `<rect x="${M}" y="480" width="140" height="8" fill="#ffffff" opacity="0.65"/>`
    )
    o.lines.forEach((line, i) => {
      parts.push(
        `<text x="${M}" y="${548 + i * 52}" font-family="${FONT}" font-size="42" font-weight="700" fill="#ffffff">${esc(line)}</text>`
      )
    })
    parts.push(
      `<text x="${M}" y="678" font-family="${FONT}" font-size="28" fill="#ffffff" opacity="0.88">${esc(o.kicker)}</text>`
    )
  } else {
    // photo badge
    parts.push(
      `<rect x="${M}" y="${M}" width="${badgeW}" height="56" rx="28" fill="${RED}"/>`,
      `<text x="${M + 28}" y="${M + 38}" font-family="${FONT}" font-size="${badgeFS}" font-weight="700" letter-spacing="2" fill="#fff">${esc(ad.badge)}</text>`
    )
  }

  // white panel + red rule
  parts.push(
    `<rect x="0" y="${PHOTO_H}" width="${W}" height="${H - PHOTO_H}" fill="#ffffff"/>`,
    // darker rule on the offer ad so it reads against the red hero
    `<rect x="0" y="${PHOTO_H}" width="${W}" height="10" fill="${isOffer ? RED_DARK : RED}"/>`
  )

  // eyebrow
  parts.push(
    `<text x="${M}" y="${eyebrowY}" font-family="${FONT}" font-size="25" font-weight="700" letter-spacing="2.5" fill="${RED}">${esc(ad.eyebrow)}</text>`
  )

  // headline
  ad.headline.forEach((line, i) => {
    parts.push(
      `<text x="${M}" y="${headY + i * headLead}" font-family="${FONT}" font-size="${headFS}" font-weight="700" fill="${INK}">${esc(line)}</text>`
    )
  })

  // sub
  ad.sub.forEach((line, i) => {
    parts.push(
      `<text x="${M}" y="${subY + i * subLead}" font-family="${FONT}" font-size="${subFS}" fill="${GRAY}">${esc(line)}</text>`
    )
  })

  // CTA button
  parts.push(
    `<rect x="${M}" y="${ctaY}" width="${ctaW}" height="${ctaH}" rx="14" fill="${RED}"/>`,
    `<text x="${M + ctaW / 2}" y="${ctaY + ctaH / 2 + 11}" text-anchor="middle" font-family="${FONT}" font-size="${ctaFS}" font-weight="700" fill="#fff">${esc(ad.cta)}</text>`
  )

  if (ad.statsLine) {
    parts.push(
      `<text x="${M}" y="${statsY}" font-family="${FONT}" font-size="27" font-weight="700" fill="${INK}">${esc(ad.statsLine)}</text>`
    )
  }

  if (ad.fineprint) {
    parts.push(
      `<text x="${M}" y="${ctaY + ctaH + 30}" font-family="${FONT}" font-size="21" fill="#94a3b8">${esc(ad.fineprint)}</text>`
    )
  }

  // footer bar
  parts.push(
    `<rect x="0" y="${footerY}" width="${W}" height="${footerH}" fill="${INK}"/>`,
    `<rect x="0" y="${footerY}" width="${W}" height="4" fill="${RED_DARK}"/>`,
    `<text x="${W / 2}" y="${footerY + 49}" text-anchor="middle" font-family="${FONT}" font-size="27" font-weight="700" letter-spacing="1" fill="#fff">touchwoodasset.com   ·   +61 413 889 388</text>`
  )

  const svg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${parts.join('')}</svg>`
  )

  const logoY = ctaY - 4
  const logoX = W - M - logoMeta.width

  await mkdir(OUT, { recursive: true })
  const composed = sharp({
    create: { width: W, height: H, channels: 3, background: '#ffffff' },
  }).composite([
    ...(photo ? [{ input: photo, top: 0, left: 0 }] : []),
    { input: svg, top: 0, left: 0 },
    { input: logo, top: Math.round(logoY), left: Math.round(logoX) },
  ])

  await composed.clone().png().toFile(path.join(OUT, ad.file))
  // JPEG is what actually gets uploaded to Ads Manager — same pixels, ~4x smaller.
  await composed
    .clone()
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toFile(path.join(OUT, ad.file.replace(/\.png$/, '.jpg')))

  console.log('✓', ad.file, `head:${headFS} cta:${ctaW}`)
}

for (const ad of ads) await build(ad)
