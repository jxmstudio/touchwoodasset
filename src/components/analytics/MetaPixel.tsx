'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

/**
 * Meta (Facebook/Instagram) Pixel.
 *
 * Only mounts when NEXT_PUBLIC_META_PIXEL_ID is set, so local and preview
 * builds never pollute ad reporting or fire phantom conversions.
 *
 * The App Router does not do full page loads on navigation, so the base script
 * fires PageView once and this component fires it again on each route change —
 * without that, Meta only ever sees the landing URL.
 *
 * Init includes any advanced-matching data persisted by setAdvancedMatching
 * (lib/tracking), so match fields survive a full page load between a form
 * submit and the conversion firing on the thank-you page.
 */
export function MetaPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!PIXEL_ID) return
    if (typeof window === 'undefined') return
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq
    if (typeof fbq !== 'function') return
    fbq('track', 'PageView')
  }, [pathname, searchParams])

  if (!PIXEL_ID) return null

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}', function(){var m={};try{m=JSON.parse(sessionStorage.getItem('tw_match'))||{}}catch(e){}return m}());
fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
