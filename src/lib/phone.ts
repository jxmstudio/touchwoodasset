/**
 * Australian mobile number handling, shared by the browser (form validation)
 * and the server (re-validation before an SMS is sent or a lead is recorded).
 *
 * The mobile number IS the lead — a bad number means an unreachable lead and
 * an unbillable one. Everything here is deliberately strict.
 */

/**
 * Normalise whatever the visitor typed (spaces, dashes, parens, +61, 0011 61,
 * missing leading 0) into ten local digits `04xxxxxxxx`, or null if it isn't
 * a plausible AU mobile.
 */
export function auMobileDigits(value: string): string | null {
  let digits = (value ?? '').replace(/\D/g, '')
  if (digits.startsWith('0011')) digits = digits.slice(4) // 0011 61 4…
  if (digits.startsWith('61')) digits = `0${digits.slice(2)}` // +61 4…
  if (digits.length === 9 && digits.startsWith('4')) digits = `0${digits}` // 4…
  if (!/^04\d{8}$/.test(digits)) return null
  // Keyboard-mash junk: 0400 000 000, 0411 111 111 and friends.
  if (/^(\d)\1{7}$/.test(digits.slice(2))) return null
  // Runs and ladders that no carrier issues: 0412 345 678, 0498 765 432.
  if (/^(0123456789|1234567890|9876543210|0987654321)$/.test(digits.slice(2)))
    return null
  return digits
}

/** `0413 889 388` — the call-ready display form used in lead emails/sheets. */
export function formatAuMobile(value: string): string | null {
  const digits = auMobileDigits(value)
  if (!digits) return null
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`
}

/** `+61413889388` — what the SMS provider needs. */
export function auMobileToE164(value: string): string | null {
  const digits = auMobileDigits(value)
  if (!digits) return null
  return `+61${digits.slice(1)}`
}

/** Back-compat alias for the original ReviewForm helper. */
export const normaliseAuMobile = formatAuMobile

/**
 * A "full name" for billing purposes: at least two words (first + last), each
 * of at least two letters, letters/apostrophes/hyphens only. Rejects digits,
 * single names and keyboard mash like "asdf asdf" is left to the humans —
 * there's no reliable automated test for that.
 */
export function isFullName(value: string): boolean {
  const words = (value ?? '').trim().split(/\s+/).filter(Boolean)
  if (words.length < 2) return false
  return words.every((w) => /^[\p{L}][\p{L}'’\-.]{1,}$/u.test(w))
}
