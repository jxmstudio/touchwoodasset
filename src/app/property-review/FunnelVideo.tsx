'use client'

/**
 * Vertical 9:16 b-roll player.
 *
 * The clip has no audio, so there is nothing to unmute and no controls to
 * show — it just autoplays muted and loops behind the pitch. Muted is also
 * what makes autoplay allowed at all.
 */
export function FunnelVideo() {
  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px]">
      <div className="relative overflow-hidden rounded-[2rem] border-[6px] border-gray-900 bg-gray-900 shadow-2xl">
        <video
          className="pointer-events-none block aspect-[9/16] w-full object-cover"
          poster="/videos/property-review-poster.jpg"
          playsInline
          autoPlay
          muted
          loop
          preload="metadata"
          aria-label="Melbourne apartment interior"
        >
          <source src="/videos/property-review.webm" type="video/webm" />
          <source src="/videos/property-review.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
