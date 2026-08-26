# Funnel audit — /property-review + Meta Pixel tracking

Audited 2026-08-26 on `main` @ `9856bd1` (Mobile-first /property-review: form
above the fold, in-place Lead, sheet path restored).

## Route & form

| Piece | File |
| --- | --- |
| Landing page (server component) | `src/app/property-review/page.tsx` |
| Lead form (client) | `src/app/property-review/ReviewForm.tsx` |
| Sticky mobile CTA | `src/app/property-review/StickyCta.tsx` |
| Trust stats strip (220+ / 260+ / 25+) | `src/app/property-review/TrustStats.tsx` |
| Past-work carousel | `src/app/property-review/PastWorkCarousel.tsx` |
| Thank-you route (legacy fallback) | `src/app/property-review/thank-you/page.tsx` |
| Funnel chrome suppression (no nav/footer) | `src/components/layout/HideOnFunnel.tsx` |

The form takes exactly three fields (name, AU mobile with strict validation +
normalisation, suburb) plus a `_gotcha` honeypot.

### Submit flow (`ReviewForm.tsx` → `onSubmit`)

1. Posts in parallel to:
   - **JXM Forms** (`src/lib/jxm-forms.ts` → `https://jxm-forms.vercel.app/api/submit/touchwood`,
     `_form: 'property-review'`) — the lead of record; decides success/failure.
   - **Google Sheets** (`src/lib/sheets-webhook.ts` → `/api/sheets-webhook` proxy) —
     ops view; failures are logged but never surface to the visitor.
2. The lead `message` embeds suburb + `attributionSummary()` (utm_*, fbclid,
   gclid, landing page) so every lead is traceable to its ad.
3. On JXM success only: `setAdvancedMatching()` (hashed name/phone),
   `trackLead()` fires the pixel `Lead`, and the form swaps to an in-place
   success card. No navigation — the thank-you page load on 4G was dropping
   conversions.

## Meta Pixel

- Loaded by `src/components/analytics/MetaPixel.tsx`, mounted site-wide in
  `src/app/layout.tsx`. **Only mounts when `NEXT_PUBLIC_META_PIXEL_ID` is set**
  (see `.env.example`) — local/preview builds fire nothing.
- Base script fires `PageView`; the component re-fires it on every App Router
  navigation. Init re-hydrates advanced-matching data from `sessionStorage`.
- All conversion helpers live in `src/lib/tracking.ts` and retry for ~5s if
  `fbevents.js` hasn't loaded yet (afterInteractive race). GA4 (`gtag`)
  mirrors every Meta event; both are no-ops when the tag is absent.

### Does `Lead` fire? — YES

`trackLead()` (`src/lib/tracking.ts:155`) fires
`fbq('track', 'Lead', { content_name: <formName>, content_category, suburb })`
**after** the JXM POST resolves successfully — callback-based, in place.
Called from:

- `/property-review` form → `content_name: 'property_review'`
- Contact form, listing enquiry, apply modal, valuation/inspection forms
  (`b897f64` rolled `Lead`/`Schedule` out to all enquiry surfaces).
- `/property-review/thank-you` (`ThankYouTracking.tsx`) — page-view-based
  variant. **Nothing links or redirects to this route any more**, so it does
  not double-fire; it exists as a URL you can point Ads Manager custom
  conversions at if the strategy changes. Do not send form traffic there
  while the in-place `Lead` exists, or leads would count twice.

Other events: `LeadFormStart` (custom) on first form focus, `Contact` on
click-to-call (`CallLink`), `Schedule` on bookings.

### Conversions API / server-side

`src/app/api/meta-capi/route.ts` relays a server-side copy of every `Lead`
to Meta's Graph API. The browser generates one UUID per submission
(`newEventId()` in `src/lib/tracking.ts`) and sends it as `eventID` on the
pixel call and `event_id` on the CAPI call, so Meta dedupes the pair into a
single Lead. Contact details are SHA-256 hashed server-side; the route also
attaches client IP, user agent and the `_fbp`/`_fbc` cookies for matching,
and forwards `event_source_url` captured at submit time (fbevents' own URL
goes stale after client-side navigations — this is why a test Lead once
reported the homepage).

**Requires `META_CAPI_ACCESS_TOKEN` in the production environment** (Events
Manager → Settings → Conversions API → Generate access token). Without it
the route no-ops and only browser events fire.

To tag server events into the Test Events stream, land on the site with
`?test_event_code=TESTxxxx` (the code shown in Events Manager's Test Events
tab) — it persists for the session and is attached to every CAPI event.

## Gaps found in this audit

1. **No `ViewContent`** anywhere — no mid-funnel signal between `PageView`
   and `Lead`. → Fixed in Task 2: `trackViewContent()` +
   `src/components/analytics/ViewContentTracker.tsx`, mounted on
   `/property-review` and `/switch`.
2. **No paid-traffic variant** — `/property-review` leads with the free
   appraisal (right for organic/SEO; its H1, metadata and FAQPage schema must
   not change), while the live Meta ads sell the $500 switch offer. The $500
   only appears in the sticky top strip and the FAQ. → Task 3 builds
   `/switch` (noindex) with offer-first messaging.
3. 91 landing-page views / 0 recorded leads in the last 30 days predates this
   tracking code reaching production — confirm `NEXT_PUBLIC_META_PIXEL_ID` is
   actually set in the production (Vercel) environment, or every event above
   is silently disabled.

## How to verify tracking (after deploy)

1. **Env check first**: production must have `NEXT_PUBLIC_META_PIXEL_ID` set.
   View page source on the live site and search for `fbevents.js` — if absent,
   the env var is missing and nothing below will work.
2. Open Meta **Events Manager → Test events**, copy the test code, and open
   the site as `https://touchwoodasset.com/switch?test_event_code=TESTxxxx`
   (any funnel page works) so server events are tagged into the stream.
   - Expect `PageView` + `ViewContent` (content_name `switch` /
     `property_review`) on load. No `LeadFormStart` yet — it must not fire
     until you click or type in the form (autofill focus no longer counts).
   - Click into a form field or start typing → custom event `LeadFormStart`,
     once.
   - Submit the form with a real-looking AU mobile (e.g. `0413 111 222` —
     note repeated-digit junk like `0411 111 111` is rejected client-side) →
     expect **one** `Lead` row showing **Browser and Server together**, with
     an event ID that is a UUID (not `ob3_…`), the correct page URL, and
     `content_name` = `switch_500` (on `/switch`) or `property_review`. This
     creates a real lead in JXM Forms + the Google Sheet — tell the team to
     ignore it. If the Server column is missing, `META_CAPI_ACCESS_TOKEN`
     isn't set (or the `?test_event_code=` param wasn't on the URL).
3. Alternatively install the **Meta Pixel Helper** Chrome extension and watch
   events fire on the page.
4. In Ads Manager, the ad set's conversion event should be the pixel `Lead`.

## Paid-traffic URL for the ad's website field

```
https://touchwoodasset.com/switch?utm_source=meta&utm_medium=paid&utm_campaign=switch-500
```

UTM params are captured on landing (`AttributionCapture` in the root layout →
`sessionStorage`) and written into every lead's `message` field, so the CRM
row shows `utm_source=meta | utm_medium=paid | utm_campaign=switch-500 |
landing_page=/switch`.

`/switch` is `noindex` and deliberately excluded from `src/app/sitemap.ts`
(static allowlist — it was never added). `robots.txt` does **not** block it:
crawlers must be able to fetch the page to see the noindex meta, and Meta's
link crawler needs it for the ad preview. `/property-review` remains the
indexed, canonical organic page.

Hero screenshots (390×844 and 1440×900) live in `docs/screenshots/`.

## After deploy (manual)

1. Swap the destination URL on both active ads to the `/switch` URL above.
2. Confirm the ad set's conversion event is the pixel `Lead` and that Events
   Manager shows recent `Lead` activity.
3. Give it 7 days / ~100 landing page views before judging.
