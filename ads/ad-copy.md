# Touchwood — Meta static ads

4 creatives, 1080 × 1350 (4:5 feed/reels-feed). Files in `ads/out/`.
Regenerate or tweak with `node ads/build-ads.mjs`.

All photography is Touchwood's own portfolio imagery from `/public`. Every crop
deliberately excludes the baked-in corner watermark so the logo isn't doubled up.

## Availability audit

Every asset shown was checked against the live data before publishing. Only
currently-available stock appears in the creatives:

| Ad | Asset shown | Source of truth | Status |
| --- | --- | --- | --- |
| 1 | none (typographic) | — | n/a |
| 2 | Unit F83, The Archive | `storage-units.ts` | AVAILABLE |
| 3 | Bay 136, 255 Drummond St Carlton | `carparks.ts` | AVAILABLE |
| 4 | 401 Docklands Drive (bays 430/537/538) | `carparks.ts` | AVAILABLE |

**Rejected during the audit — do not reuse in ads:**

- `/15088/*` — 1508/8 Franklin Street, Melbourne is **SOLD**. Originally used as
  the ad 1 hero; pulled. Showing a sold apartment's interior on a live ad can
  imply it's still available, and it's no longer the vendor's property to promote.
- `/1316-lonsdale/*` — 1316/39 Lonsdale Street is **LEASED**. Originally the ad 4
  hero; swapped for 401 Docklands.
- `/6-1070-sydney-rd-fawkner/*`, `/pork/*`, `/211.jpg`, `/A20-1-Queens-Rd.jpg`,
  `/58.jpg` — all LEASED listings.
- `/john/*` — not referenced anywhere in the codebase, so its status can't be
  confirmed. Treat as unknown until someone verifies it.
- `/hero/*`, `/services/*` — AI/stock imagery, not real portfolio. The
  "residential" one is an American suburban house, wrong for a Melbourne campaign.

Ad 1 carries no property photo at all: every residential interior in `/public`
belongs to a sold or leased listing. A typographic offer hero removes the risk
entirely, and offer-led type tends to perform well for this kind of ad anyway.

---

## 1 — `01-landlords-500-switch.png` · Landlord acquisition
**Angle:** the live $500 management-transfer offer. Highest-intent ad of the set —
put the most budget here.

- **Primary text:** Own an investment property in Melbourne? Switch your management to Touchwood and we'll credit you $500 — plus $100 for every storage unit or car park you bring across. 220+ assets under management, one point of contact, 24/7 support. Free rental appraisal, no obligation.
- **Headline:** Switch your property manager, get $500
- **Description:** Free appraisal · Melbourne & VIC
- **CTA button:** Get quote
- **Landing page:** `/landlords`

## 2 — `02-storage-from-80.png` · Storage
**Angle:** price entry point. Cheapest, most impulse-friendly product.

- **Primary text:** Running out of space in your apartment? The Archive at 601 Little Collins St has secure storage from $80/month — right in the CBD. Units from 2 to 10 sqm, 24/7 access, climate controlled, individual lock and key, goods lift to your door. No long lock-in.
- **Headline:** CBD storage from $80 a month
- **Description:** 601 Little Collins St · Available now
- **CTA button:** Learn more
- **Landing page:** `/the-archive`

## 3 — `03-carparks-from-220.png` · Car parks
**Angle:** scarcity + convenience. Strong for CBD-worker and resident targeting.

- **Primary text:** Sick of circling for a park? Secure private bays from $220/month across Carlton, the CBD, Docklands, St Kilda and Kew. Well-lit, 24/7 secure access, month-to-month — no long lock-in. Bays are limited and go quickly.
- **Headline:** Secure car parking from $220 a month
- **Description:** Month-to-month · Bays available now
- **CTA button:** Learn more
- **Landing page:** `/carparks`

## 4 — `04-brand-trust.png` · Brand / retargeting
**Imagery:** 401 Docklands Drive, a live managed asset with available bays.
**Angle:** credibility. Best used as a retargeting layer over people who hit the
site from ads 1–3, not as cold traffic.

- **Primary text:** Apartments, car parks and storage — managed by one Melbourne team, with one point of contact. 220+ assets under management, 260+ happy clients, 25+ years of combined experience across Melbourne and Victoria.
- **Headline:** 220+ Melbourne assets under management
- **Description:** One team. Every asset you own.
- **CTA button:** Learn more
- **Landing page:** `/` or `/about`

## 5 — `05-switch-500-hook.png` · Landlord acquisition (hook variant)
**Angle:** the "$500 to switch" hook, stated verbatim. Typographic ink-navy hero —
no property photo (same availability reasoning as ad 1). Built with
`node ads/build-switch-ads.mjs`.

- **Primary text:** Own an investment property in Melbourne? Get $500 to switch property managers. Transfer your management to Touchwood, we credit you $500 and handle the entire handover — you don't lift a finger. Plus $100 for every storage unit or car park you bring across. Free rental appraisal, no obligation.
- **Headline:** Get $500 to switch property managers
- **Description:** Free appraisal · Melbourne & VIC
- **CTA button:** Get quote
- **Landing page:** `/property-review`

## 6 — `06-switch-500-compare.png` · Landlord acquisition ($0 vs $500 comparison)
**Angle:** the do-nothing comparison — staying pays $0, switching pays $500.
Typographic red hero, no property photo. Built with `node ads/build-switch-ads.mjs`.

- **Primary text:** Staying with your current property manager pays you $0. Switching to Touchwood pays you $500 — same property, same tenants, and we handle the entire handover. Plus $100 for every storage unit or car park you bring across. Free rental appraisal, no obligation.
- **Headline:** The easiest $500 you'll make this year
- **Description:** $500 credit when you switch · Terms apply
- **CTA button:** Get quote
- **Landing page:** `/property-review`

---

## Before you publish

- **Verify the $500/$100 offer is still live** and that written T&Cs exist somewhere
  linkable. The creative carries "*Terms apply. Limited-time offer." because the
  site does, but a dollar-value offer in a paid ad is worth having the conditions
  documented on the landing page.
- **Prices are pulled from live site data** ($80 storage = the 2.2 sqm units at The
  Archive; $220 car park = 135 Fitzroy St, St Kilda). If inventory moves, the "from"
  price should move with it — that's the one thing on these creatives that can go
  stale and cause complaints.
- **Housing special ad category:** if any of these ever target the US or Canada,
  Meta will force them into the housing category (restricted targeting). Australia-only
  delivery is unaffected, but the property-management ad is the one to watch.
- **Placements:** 4:5 covers Feed, and Meta will letterbox it into Stories/Reels.
  If you want proper 1080×1920 story cuts or 1:1 squares, the build script can
  emit them — just ask.
