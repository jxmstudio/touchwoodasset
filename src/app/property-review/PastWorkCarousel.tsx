'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'

export interface PastWorkItem {
  image: string
  alt: string
  badge: 'Sold' | 'Leased'
  title: string
  stat: string
  body: string
}

const ROTATE_INTERVAL_MS = 4500

export function PastWorkCarousel({ items }: { items: PastWorkItem[] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setSelected(api.selectedScrollSnap())
    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)
    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

  // Auto-rotate; hold still while the visitor is hovering or touching so the
  // carousel never pulls a card out from under someone reading it.
  useEffect(() => {
    if (!api || paused) return
    const id = setInterval(() => {
      // Skip ticks in background tabs — otherwise the queued scrolls all
      // replay in a burst when the visitor switches back.
      if (document.visibilityState === 'visible') api.scrollNext()
    }, ROTATE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [api, paused])

  const pause = useCallback(() => setPaused(true), [])
  const resume = useCallback(() => setPaused(false), [])

  return (
    <div
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      <Carousel setApi={setApi} opts={{ loop: true, align: 'start' }}>
        <CarouselContent>
          {items.map((w) => (
            <CarouselItem
              key={w.title}
              className="basis-[86%] sm:basis-1/2 lg:basis-1/3"
            >
              <article className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={w.image}
                    alt={w.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 86vw"
                    className="object-cover"
                  />
                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white ${
                      w.badge === 'Sold' ? 'bg-gray-900' : 'bg-primary'
                    }`}
                  >
                    {w.badge}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold text-primary">{w.stat}</p>
                  <h3 className="mt-1 text-base font-semibold text-gray-900">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {w.body}
                  </p>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controls under the cards — the default absolute-positioned arrows
            would clip against the page container on smaller screens. */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <CarouselPrevious className="static translate-y-0" />
          <div className="flex items-center gap-2">
            {items.map((w, i) => (
              <button
                key={w.title}
                type="button"
                aria-label={`Go to slide ${i + 1}: ${w.title}`}
                onClick={() => api?.scrollTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === selected
                    ? 'w-6 bg-primary'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  )
}
