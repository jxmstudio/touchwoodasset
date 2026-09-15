'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'

export interface ComparisonImage {
  src: string
  alt: string
}

interface BeforeAfterSliderProps {
  before: ComparisonImage
  after: ComparisonImage
  beforeLabel?: string
  afterLabel?: string
  /** Percentage of the "before" image revealed on first paint (0–100). */
  initialPosition?: number
  priority?: boolean
  className?: string
}

const clamp = (n: number) => Math.min(100, Math.max(0, n))

/**
 * Drag-to-compare image slider. The "after" image sits underneath at full
 * width; the "before" image is clipped to the left of the handle so the two
 * photos stay perfectly registered while the visitor drags.
 *
 * Pointer events drive mouse and touch. A visually hidden range input mirrors
 * the position so the control is keyboard- and screen-reader-operable; its
 * focus ring is drawn on the visible handle via the `peer` class.
 */
export function BeforeAfterSlider({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
  initialPosition = 50,
  priority = false,
  className = '',
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(() => clamp(initialPosition))
  const draggingRef = useRef(false)
  const stageRef = useRef<HTMLDivElement>(null)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = stageRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.width === 0) return
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100))
  }, [])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only the primary button; let right/middle clicks through untouched.
    if (e.pointerType === 'mouse' && e.button !== 0) return
    draggingRef.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromClientX(e.clientX)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    updateFromClientX(e.clientX)
  }

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  const rounded = Math.round(position)

  return (
    <div
      className={`relative select-none overflow-hidden rounded-2xl bg-gray-100 shadow-sm ring-1 ring-black/5 ${className}`}
    >
      {/* touch-pan-y keeps vertical page scrolling alive on phones while the
          slider claims horizontal drags. */}
      <div
        ref={stageRef}
        className="relative aspect-[4/3] w-full cursor-ew-resize touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* After — full width underneath */}
        <Image
          src={after.src}
          alt={after.alt}
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
          priority={priority}
          draggable={false}
        />

        {/* Before — clipped to the left of the handle */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden="true"
        >
          <Image
            src={before.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority={priority}
            draggable={false}
          />
        </div>

        {/* Keyboard / assistive-tech control. Visually hidden; the handle
            below picks up its focus ring through `peer-focus-visible`. */}
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={rounded}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`Compare ${beforeLabel} with ${afterLabel}`}
          aria-valuetext={`${rounded}% ${beforeLabel}`}
          className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0 [pointer-events:none]"
        />

        {/* Divider + handle */}
        <div
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.18)]" />
          <div className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg ring-1 ring-black/10 transition peer-focus-visible:ring-4 peer-focus-visible:ring-primary/60">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6 3 12l6 6" />
              <path d="m15 6 6 6-6 6" />
            </svg>
          </div>
        </div>

        {/* Corner labels — bottom corners so they never collide with the
            "Unfurnished" tag baked into the staged photos' top-left. */}
        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-gray-900/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
          {afterLabel}
        </span>
      </div>
    </div>
  )
}
