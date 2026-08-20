// Two additional static creatives for the $500 management-transfer offer.
// Same brand system as build-ads.mjs (1080x1350, 4:5 feed), different layouts:
//   05 — ink-navy offer hero, "Get $500" hook
//   06 — red hero with a $0-vs-$500 comparison card
// Run: node ads/build-switch-ads.mjs

import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'ads', 'out')

const W = 1080
const H = 1350
const M = 64
const HERO_H = 772

const RED = '#E1262B'
const RED_DARK = '#B11B20'
const INK = '#0F172A'
const GRAY = '#4B5563'
const FONT = 'Arial, Helvetica, sans-serif'

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const textW = (s, size, { bold = false, tracking = 0 } = {}) => {
  const factor = bold ? 0.575 : 0.525
  const caps = (s.match(/[A-Z]/g) || []).length / Math.max(s.length, 1)
  return s.length * size * (factor + caps * 0.055) + s.length * tracking
}

const fitSize = (lines, start, min, maxW, opts) => {
  let size = start
  while (size > min && lines.some((l) => textW(l, size, opts) > maxW)) size -= 1
  return size
}

const CONTENT_W = W - M * 2

// ---- shared bottom panel ----------------------------------------------------
// Renders eyebrow / headline / sub / CTA / fineprint / footer exactly like the
// original set so the ads sit together as one campaign.
function panel(parts, ad, ruleColor) {
  const badgeFS = 26
  const eyebrowY = 852
  const headFS = fitSize(ad.headline, 62, 40, CONTENT_W, { bold: true })
  const headLead = Math.round(headFS * 1.18)
  const headY = 920

  const subY = headY + (ad.headline.length - 1) * headLead + 52
  const subFS = 29
  const subLead = 41
  const subEnd = subY + (ad.sub.length - 1) * subLead

  const ctaFS = 32
  const ctaH = 88
  const ctaW = Math.round(textW(ad.cta, ctaFS, { bold: true }) + 76)
  const ctaY = subEnd + 40

  const footerH = 76
  const footerY = H - footerH

  parts.push(
    `<rect x="0" y="${HERO_H}" width="${W}" height="${H - HERO_H}" fill="#ffffff"/>`,
    `<rect x="0" y="${HERO_H}" width="${W}" height="10" fill="${ruleColor}"/>`,
    `<text x="${M}" y="${eyebrowY}" font-family="${FONT}" font-size="25" font-weight="700" letter-spacing="2.5" fill="${RED}">${esc(ad.eyebrow)}</text>`
  )

  ad.headline.forEach((line, i) => {
    parts.push(
      `<text x="${M}" y="${headY + i * headLead}" font-family="${FONT}" font-size="${headFS}" font-weight="700" fill="${INK}">${esc(line)}</text>`
    )
  })

  ad.sub.forEach((line, i) => {
    parts.push(
      `<text x="${M}" y="${subY + i * subLead}" font-family="${FONT}" font-size="${subFS}" fill="${GRAY}">${esc(line)}</text>`
    )
  })

  parts.push(
    `<rect x="${M}" y="${ctaY}" width="${ctaW}" height="${ctaH}" rx="14" fill="${RED}"/>`,
    `<text x="${M + ctaW / 2}" y="${ctaY + ctaH / 2 + 11}" text-anchor="middle" font-family="${FONT}" font-size="${ctaFS}" font-weight="700" fill="#fff">${esc(ad.cta)}</text>`
  )

  if (ad.fineprint) {
    parts.push(
      `<text x="${M}" y="${ctaY + ctaH + 30}" font-family="${FONT}" font-size="21" fill="#94a3b8">${esc(ad.fineprint)}</text>`
    )
  }

  parts.push(
    `<rect x="0" y="${footerY}" width="${W}" height="${footerH}" fill="${INK}"/>`,
    `<rect x="0" y="${footerY}" width="${W}" height="4" fill="${RED_DARK}"/>`,
    `<text x="${W / 2}" y="${footerY + 49}" text-anchor="middle" font-family="${FONT}" font-size="27" font-weight="700" letter-spacing="1" fill="#fff">touchwoodasset.com   ·   +61 413 889 388</text>`
  )

  return ctaY
}

const badgePill = (label, x, y, bg, fg) => {
  const fs = 26
  const w = textW(label, fs, { bold: true, tracking: 2 }) + 76
  return [
    `<rect x="${x}" y="${y}" width="${w}" height="56" rx="28" fill="${bg}"/>`,
    `<text x="${x + 28}" y="${y + 38}" font-family="${FONT}" font-size="${fs}" font-weight="700" letter-spacing="2" fill="${fg}">${esc(label)}</text>`,
  ]
}

// ---- ad 05: ink hero, hook-led ---------------------------------------------
function hero05(parts) {
  parts.push(`<rect x="0" y="0" width="${W}" height="${HERO_H}" fill="${INK}"/>`)
  parts.push(...badgePill('LIMITED-TIME OFFER', M, M, RED, '#ffffff'))
  parts.push(
    `<text x="${M}" y="252" font-family="${FONT}" font-size="66" font-weight="700" fill="#ffffff">Get</text>`,
    `<text x="${M}" y="472" font-family="${FONT}" font-size="230" font-weight="700" fill="${RED}">$500</text>`,
    `<rect x="${M}" y="516" width="140" height="8" fill="${RED}"/>`,
    `<text x="${M}" y="592" font-family="${FONT}" font-size="42" font-weight="700" fill="#ffffff">to switch your property</text>`,
    `<text x="${M}" y="644" font-family="${FONT}" font-size="42" font-weight="700" fill="#ffffff">management to Touchwood.</text>`,
    `<text x="${M}" y="712" font-family="${FONT}" font-size="28" fill="#ffffff" opacity="0.8">We handle the whole handover — you don&#8217;t lift a finger.</text>`
  )
}

// ---- ad 06: red hero, $0 vs $500 comparison --------------------------------
function hero06(parts) {
  parts.push(`<rect x="0" y="0" width="${W}" height="${HERO_H}" fill="${RED}"/>`)
  parts.push(...badgePill('FOR MELBOURNE LANDLORDS', M, M, '#ffffff', RED))

  const cardX = M
  const cardW = W - M * 2
  const cardH = 132
  const y1 = 268
  const y2 = y1 + cardH + 28

  // staying: ghosted card
  parts.push(
    `<rect x="${cardX}" y="${y1}" width="${cardW}" height="${cardH}" rx="18" fill="#ffffff" opacity="0.16"/>`,
    `<text x="${cardX + 44}" y="${y1 + 58}" font-family="${FONT}" font-size="32" font-weight="700" fill="#ffffff">Staying with your</text>`,
    `<text x="${cardX + 44}" y="${y1 + 98}" font-family="${FONT}" font-size="32" font-weight="700" fill="#ffffff">current manager</text>`,
    `<text x="${W - M - 44}" y="${y1 + 90}" text-anchor="end" font-family="${FONT}" font-size="72" font-weight="700" fill="#ffffff" opacity="0.55">$0</text>`
  )

  // switching: solid card
  parts.push(
    `<rect x="${cardX}" y="${y2}" width="${cardW}" height="${cardH}" rx="18" fill="#ffffff"/>`,
    `<text x="${cardX + 44}" y="${y2 + 58}" font-family="${FONT}" font-size="32" font-weight="700" fill="${INK}">Switching to</text>`,
    `<text x="${cardX + 44}" y="${y2 + 98}" font-family="${FONT}" font-size="32" font-weight="700" fill="${INK}">Touchwood</text>`,
    `<text x="${W - M - 44}" y="${y2 + 90}" text-anchor="end" font-family="${FONT}" font-size="72" font-weight="700" fill="${RED}">$500</text>`
  )

  parts.push(
    `<text x="${M}" y="${y2 + cardH + 76}" font-family="${FONT}" font-size="30" font-weight="700" fill="#ffffff">Same property. Same tenants. $500 better off.</text>`
  )
}

const ads = [
  {
    file: '05-switch-500-hook.png',
    hero: hero05,
    rule: RED,
    eyebrow: 'MELBOURNE PROPERTY MANAGEMENT',
    headline: ['Get $500 to switch', 'property managers.'],
    sub: [
      'Transfer your management to Touchwood and we credit',
      'you $500. Free rental appraisal, no obligation.',
    ],
    cta: 'Claim your $500',
    fineprint: '*Terms apply. Limited-time offer. + $100 per storage unit or car park.',
  },
  {
    file: '06-switch-500-compare.png',
    hero: hero06,
    rule: RED_DARK,
    eyebrow: 'MELBOURNE & VICTORIA · PROPERTY MANAGEMENT',
    headline: ['The easiest $500', 'you’ll make this year.'],
    sub: [
      'Switch your property management to Touchwood — we',
      'credit you $500 and handle the entire handover.',
    ],
    cta: 'Book a free appraisal',
    fineprint: '*Terms apply. + $100 for every storage unit or car park you bring across.',
  },
]

async function build(ad) {
  const logo = await sharp(path.join(ROOT, 'public/logo-touchwood.png'))
    .resize({ width: 250 })
    .toBuffer()
  const logoMeta = await sharp(logo).metadata()

  const parts = []
  ad.hero(parts)
  const ctaY = panel(parts, ad, ad.rule)

  const svg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${parts.join('')}</svg>`
  )

  await mkdir(OUT, { recursive: true })
  const composed = sharp({
    create: { width: W, height: H, channels: 3, background: '#ffffff' },
  }).composite([
    { input: svg, top: 0, left: 0 },
    { input: logo, top: Math.round(ctaY - 4), left: Math.round(W - M - logoMeta.width) },
  ])

  await composed.clone().png().toFile(path.join(OUT, ad.file))
  await composed
    .clone()
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toFile(path.join(OUT, ad.file.replace(/\.png$/, '.jpg')))

  console.log('✓', ad.file)
}

for (const ad of ads) await build(ad)
