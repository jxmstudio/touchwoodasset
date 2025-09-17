'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home, Car, Package } from 'lucide-react'
import { motion } from 'framer-motion'

const categories = [
  {
    id: 'all',
    label: 'All',
    icon: Home,
    count: 0 // Will be calculated
  },
  {
    id: 'properties',
    label: 'Properties',
    icon: Home,
    count: 0
  },
  {
    id: 'car-park',
    label: 'Car Parks',
    icon: Car,
    count: 0
  },
  {
    id: 'storage-cage',
    label: 'Storage Cages',
    icon: Package,
    count: 0
  }
]

interface CategoryTabsProps {
  totalCounts: {
    all: number
    properties: number
    'car-park': number
    'storage-cage': number
  }
}

export function CategoryTabs({ totalCounts }: CategoryTabsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('all')

  // Update counts
  const categoriesWithCounts = categories.map(cat => ({
    ...cat,
    count: totalCounts[cat.id as keyof typeof totalCounts] || 0
  }))

  useEffect(() => {
    const category = searchParams.get('category')
    setActiveCategory(category || 'all')
  }, [searchParams])

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    
    const params = new URLSearchParams(searchParams.toString())
    if (categoryId === 'all') {
      params.delete('category')
    } else {
      params.set('category', categoryId)
    }
    
    router.push(`/listings?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 sm:gap-4">
        {categoriesWithCounts.map((category) => {
          const Icon = category.icon
          const isActive = activeCategory === category.id
          
          return (
            <Button
              key={category.id}
              variant={isActive ? 'default' : 'outline'}
              onClick={() => handleCategoryChange(category.id)}
              className={`relative px-4 py-2 transition-all duration-200 ${
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              <span>{category.label}</span>
              <motion.span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                  isActive 
                    ? 'bg-primary-foreground/20 text-primary-foreground' 
                    : 'bg-gray-100 text-gray-600'
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {category.count}
              </motion.span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
