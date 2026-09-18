# Phone verification for funnel leads

Added 2026-09-18. Applies to the `/property-review` and `/switch` lead forms
(`src/app/property-review/ReviewForm.tsx`). The contact, valuation,
inspection and listing-enquiry forms are unchanged.

## Why

The agency is paid $50 per submitted lead that has a full name and a real,
reachable mobile number. The client reported leads whose numbers did not
connect. Client-side validation only proves the number *looks* like an AU
mobile; it cannot prove anyone answers it. Every lead now carries a
server-written proof that the visitor held that phone at submission time.

## What agencies use, and what we picked

| Method | Proves | Friction | Cost / lead | Notes |
| --- | --- | --- | --- | --- |
| **SMS one-time code** (chosen) | The visitor has the phone in hand right now | One extra screen, ~15 s | ~A$0.10 (Twilio Verify fee + AU SMS) | Industry standard for pay-per-lead; defensible per lead via a provider record |
| Carrier / line-type lookup (Twilio Lookup, Telnyx) | Number is allocated, is a mobile, which carrier | None | ~A$0.01 | Does not prove the visitor owns it; good as a silent pre-filter, weak as billing evidence |
| Post-submit "reply YES" SMS | Same as OTP but after the fact | None at submit | ~A$0.10 | Lead is recorded before proof exists; many never reply |
| Consent certificates (TrustedForm, Jornaya) | A real browser session filled the form | None | ~US$0.02–0.10 | US TCPA tooling; proves the form fill, not the phone |
| Callback / missed-call ping | Phone rings | Confusing | Varies | Legacy |

OTP is the only one that gives a per-lead artefact (a Twilio verification
SID with a timestamp) that a client cannot argue with. The conversion cost is
real but measurable — see *Measuring the cost* below.

## How it works

```
visitor                      browser (ReviewForm)              server                         Twilio
  │ name + mobile + suburb ──▶ zod: full name, AU mobile ──▶ POST /api/verify/start ──▶ Verifications (SMS)
  │ ◀── "Check your texts" ──  step 2                       rate-limit, honeypot
  │ 6-digit code ────────────▶ auto-submit at 6 digits ───▶ POST /api/lead ───────────▶ VerificationCheck
  │                                                          approved? ──▶ JXM Forms + Google Sheet
  │ ◀── "You're booked in" ──  Lead pixel + CAPI            (stamped Phone verified: YES, VE…)
```

1. **Step 1 — details.** Three fields as before, but *Full name* now requires
   first and last name, and the mobile field says a code will be texted.
   Submit calls `POST /api/verify/start`, which re-validates the number,
   applies a per-IP / per-number rate limit and asks Twilio Verify to send a
   6-digit SMS. Nothing is recorded yet.
2. **Step 2 — code.** The form swaps to a single code box
   (`autocomplete="one-time-code"`, so iOS/Android offer the code from the
   SMS). Six digits auto-submit to `POST /api/lead`. *Resend code* has a 30 s
   cooldown; *Wrong number?* returns to step 1 with the fields intact.
3. **`/api/lead`** checks the code with Twilio in the same request that
   records the lead. On `approved` it posts to JXM Forms (lead of record,
   decides success) and the Google Sheet (ops view, failure logged only)
   with:
   - `phone_verified`: `YES — SMS code confirmed 18 Sep 2026 10:32 AEST (Twilio VE…)`
   - `verified_at`: ISO timestamp
   - `verification_id`: the Twilio verification SID
   - the same stamp appended to `message`, so it shows even where only the
     message column is read.
4. Only then does the browser fire the Meta `Lead` (+ CAPI copy) and show the
   success card. Everything downstream (pixel, sheet, JXM email) therefore
   only ever sees verified leads.

The stamp is written by the server after talking to Twilio. The browser has
no way to mark a lead verified, which is what makes the stamp usable as
billing evidence.

### Failure behaviour

| Situation | Visitor sees | Lead |
| --- | --- | --- |
| Number fails AU-mobile rules (client or server) | Inline error on the Mobile field | not recorded |
| Twilio rejects the number (invalid, landline, blocked) | Inline error on the Mobile field | not recorded |
| Wrong code | Inline error, box cleared, up to 5 tries per code | not recorded |
| Code expired (10 min) | "Tap Resend code" | not recorded |
| 5 codes to one number in 10 min | Wait 10 minutes / call us | not recorded |
| Twilio outage | Toast: try again or call us | not recorded |
| JXM Forms down after the code was approved | Toast: try again or call us | not recorded; the code is consumed, so a retry needs *Resend code* |
| **`TWILIO_*` env vars missing in production** | Normal flow, no SMS step at all | **recorded, stamped `Phone verified: NO — SMS verification is not configured on the server`**, error logged |

The last row is deliberate: a missing env var costs verification, never the
lead. The stamp makes the gap visible on every lead email and sheet row
within the first lead, rather than silently stopping paid traffic from
converting.

## Setup (production)

1. Twilio Console → create an account (or use the existing one). Copy the
   **Account SID** and **Auth Token** from the dashboard.
2. Verify → Services → **Create new** → any friendly name (e.g. `Touchwood
   leads`), SMS channel enabled, code length 6. Copy the **Service SID**
   (`VA…`). No Australian sender-ID registration is needed for Verify; Twilio
   sends from its own pool.
3. Add to the Vercel production environment:
   ```
   TWILIO_ACCOUNT_SID=AC…
   TWILIO_AUTH_TOKEN=…
   TWILIO_VERIFY_SERVICE_SID=VA…
   ```
   and redeploy.
4. Submit the `/switch` form with your own mobile. You should receive a
   6-digit SMS within a few seconds; after entering it, the JXM Forms email
   and the sheet row show `Phone verified: YES … (Twilio VE…)`. Tell the team
   to ignore that lead.
5. Optional: extend the Apps Script with the three extra columns (see
   `GOOGLE_APPS_SCRIPT_SETUP.md`) so the sheet can be filtered on
   `Phone Verified`.

Pricing (Sep 2026, approximate): Twilio Verify US$0.05 per successful
verification plus the AU SMS rate (~US$0.05). At $50 per lead this is
negligible. Twilio's default Verify limits — 5 sends per number per 10 min,
5 code attempts, 10-minute expiry — and Fraud Guard are all on by default.

## Local development

Without `TWILIO_*` set, `/api/verify/start` logs the code instead of sending
it and `/api/lead` accepts `PHONE_VERIFY_DEV_CODE` (default `000000`). The
step-2 card shows a "Dev mode" notice. Set `LEAD_DRY_RUN=1` so verified test
leads are logged rather than posted to JXM Forms (the sheet already falls
back to `data/form-submissions-*.json` when `SHEETS_WEBHOOK` is unset).

## Measuring the cost of the extra step

Three browser events now bracket the form (Meta custom events + GA4):

| Event | Fires when |
| --- | --- |
| `LeadFormStart` / `form_start` | first click or keystroke in the form |
| `LeadCodeSent` / `form_code_sent` | step 1 accepted, SMS sent |
| `Lead` / `generate_lead` | code confirmed, lead recorded |

`LeadCodeSent → Lead` is the drop-off caused by the SMS step. Expect a
10–25 % loss on cold paid traffic; the leads that drop are disproportionately
the ones that would have been unreachable anyway. If the loss is much higher,
check SMS delivery latency in the Twilio console (Verify → Logs) before
touching the form.

## Not done (candidates)

- **Silent line-type lookup before sending the SMS** (Twilio Lookup v2
  `line_type_intelligence`, ~1c): reject landlines/VoIP before spending an
  SMS and record the carrier on the lead. Cheap, no friction, but no proof
  of possession on its own.
- **Recording abandoned attempts** (name + number that never entered a code)
  as a separate, clearly-labelled sheet row so the team can still call them.
  Skipped so the sheet stays one-row-per-lead and every row is billable.
- **Distributed rate limiting**: the in-memory limiter is per serverless
  instance. Twilio's own limits are the real ceiling; a Redis/Upstash counter
  would make ours global too.
- The other enquiry forms (contact, valuation, inspection, listing enquiry)
  still submit unverified. They are not paid-per-lead.
