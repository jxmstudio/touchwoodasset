'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StorageUnit } from '@/data/storage-units'
import { MapPin, Maximize2 } from 'lucide-react'

interface ArchiveGridProps {
  units: StorageUnit[]
  isLoading?: boolean
}

export function ArchiveGrid({ units, isLoading = false }: ArchiveGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden animate-pulse">
            <div className="aspect-video bg-gray-200" />
            <CardContent className="p-6 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-8 bg-gray-200 rounded w-1/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (units.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          No Units Available
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          No storage units match your current filters. Try adjusting your search
          criteria or check back later for new availability.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {units.map((unit, index) => (
        <motion.div
          key={unit.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Link href={`/the-archive/${unit.id}`}>
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full">
              {/* Image */}
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <Image
                  src={unit.images[0]}
                  alt={`${unit.unitNumber} - ${unit.size}sqm storage unit`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <Badge
                    className={
                      unit.status === 'AVAILABLE'
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-gray-500 hover:bg-gray-600'
                    }
                  >
                    {unit.status}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-6 space-y-3">
                {/* Unit Number & Size */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {unit.unitNumber}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Maximize2 className="h-4 w-4 mr-1" />
                    <span>{unit.size} sqm</span>
                    <span className="mx-2">•</span>
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{unit.floor}</span>
                  </div>
                </div>

                {/* Description Preview */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {unit.description}
                </p>

                {/* Price */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="text-2xl font-bold text-primary">
                    ${unit.price}
                    <span className="text-sm font-normal text-gray-600 ml-1">
                      / month
                    </span>
                  </div>
                </div>

                {/* Features Preview */}
                <div className="flex flex-wrap gap-1">
                  {unit.features.slice(0, 2).map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {unit.features.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{unit.features.length - 2} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
