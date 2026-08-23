'use client'

import { useEffect, useRef, useState } from 'react'

// Trust bar. All three are Touchwood's established claims, used sitewide
// and in the live ad creatives.
const trustStats: Array<[string, string]> = [
  ['220+', 'Properties under management'],
  ['260+', 'Owners served'],
  ['25+', 'Years combined experience'],
]

// Counts from 0 up to the target once `started` flips true. Before that (and
// with JS disabled) the real value renders, so SEO and no-JS visitors never
// see a zero.
function CountUp({ value, started }: { value: string; started: boolean }) {
  const target = parseInt(value, 10)
  const suffix = value.slice(String(target).length)
  const [display, setDisplay] = useState<number | null>(null)

  useEffect(() => {
    if (!started) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(target)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const duration = 1200
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, target])

  return (
    <>
      {display ?? target}
      {suffix}
    </>
  )
}

export function TrustStats() {
  const ref = useRef<HTMLDListElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <dl
      ref={ref}
      className="mt-8 grid grid-cols-3 gap-4 border-y border-gray-200 py-5"
    >
      {trustStats.map(([value, label]) => (
        /* justify-end packs col-reverse content to the TOP of the cell, so
           every number sits on the same line regardless of how many lines
           its label wraps to. */
        <div key={label} className="flex flex-col-reverse justify-end">
          <dt className="text-xs text-gray-600 sm:text-sm">{label}</dt>
          {/* tabular-nums keeps the width steady while the number counts */}
          <dd className="text-xl font-bold tabular-nums text-gray-900 sm:text-3xl">
            <CountUp value={value} started={started} />
          </dd>
        </div>
      ))}
    </dl>
  )
}
