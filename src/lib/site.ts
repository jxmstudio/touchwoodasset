/**
 * Canonical site configuration.
 *
 * SITE_URL must be the public production origin. It is deliberately NOT derived
 * from NEXTAUTH_URL: that variable is localhost in development and a per-deploy
 * hostname on preview builds, which would emit wrong canonical/OG URLs.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://touchwoodasset.com'
).replace(/\/$/, '')

export const SITE_NAME = 'Touchwood Asset Management'

export const CONTACT = {
  phone: '+61413889388',
  phoneDisplay: '+61 413 889 388',
  email: 'admin@touchwoodasset.com',
} as const

/** Absolute URL helper for structured data, which requires absolute URLs. */
export function absoluteUrl(path = '/'): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Percent-encode a /public asset path for metadata (og:image, JSON-LD).
 * Dropbox photo names contain spaces, "&" and "+", and a literal "+" in a
 * URL path is served as a space, so the image 404s. Already-encoded paths
 * are decoded first so they are not double-encoded.
 */
export function encodeAssetPath(path: string): string {
  return path
    .split('/')
    .map((segment) => {
      try {
        return encodeURIComponent(decodeURIComponent(segment))
      } catch {
        return encodeURIComponent(segment)
      }
    })
    .join('/')
}

/**
 * Profiles that represent the same business elsewhere. Google uses `sameAs` to
 * reconcile the site with the entity it already knows about, which is one of
 * the stronger local ranking signals available from the codebase.
 *
 * Set the env vars in production — empty entries are filtered out, so an
 * unset profile is simply omitted rather than emitting a broken URL.
 */
export const SAME_AS: string[] = [
  process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL,
  process.env.NEXT_PUBLIC_FACEBOOK_URL,
  process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  process.env.NEXT_PUBLIC_LINKEDIN_URL,
].filter((url): url is string => Boolean(url && url.startsWith('https://')))
