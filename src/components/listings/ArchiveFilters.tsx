'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Filter, X, CalendarIcon } from 'lucide-react'

interface ArchiveFiltersProps {
  filters: {
    storageSize: string
    leaseDuration: string
    minPrice: string
    maxPrice: string
    availabilityDate: string
  }
  onFilterChange: (key: string, value: string) => void
  onApplyFilters: () => void
  onClearFilters: () => void
}

export function ArchiveFilters({
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
}: ArchiveFiltersProps) {
  return (
    <Card className="sticky top-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Filter className="h-5 w-5" />
          <span>Filter Storage Units</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Storage Size Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Storage Size</label>
          <Select
            value={filters.storageSize}
            onValueChange={(value) => onFilterChange('storageSize', value)}
          >
            <SelectTrigger className="bg-gray-100 hover:bg-gray-200">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              <SelectItem value="2sqm">2 sqm</SelectItem>
              <SelectItem value="3sqm">3 sqm</SelectItem>
              <SelectItem value="4sqm">4 sqm</SelectItem>
              <SelectItem value="5sqm">5 sqm</SelectItem>
              <SelectItem value="6sqm">6 sqm</SelectItem>
              <SelectItem value="7sqm">7 sqm</SelectItem>
              <SelectItem value="8sqm">8 sqm</SelectItem>
              <SelectItem value="9sqm">9 sqm</SelectItem>
              <SelectItem value="10sqm">10 sqm</SelectItem>
              <SelectItem value="10sqm+">10+ sqm</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lease Duration Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Lease Duration</label>
          <Select
            value={filters.leaseDuration}
            onValueChange={(value) => onFilterChange('leaseDuration', value)}
          >
            <SelectTrigger className="bg-gray-100 hover:bg-gray-200">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Durations</SelectItem>
              <SelectItem value="short">Short-Term (1-3 months)</SelectItem>
              <SelectItem value="medium">Medium (3-12 months)</SelectItem>
              <SelectItem value="long">Long-Term (12+ months)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Inputs */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range (per month)</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
              className="bg-gray-100"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              className="bg-gray-100"
            />
          </div>
        </div>

        {/* Availability Date Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Available From</label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="date"
              value={filters.availabilityDate}
              onChange={(e) =>
                onFilterChange('availabilityDate', e.target.value)
              }
              className="bg-gray-100 pl-10"
            />
          </div>
        </div>

        {/* Apply and Clear Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button onClick={onApplyFilters} className="flex-1">
            <Filter className="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
          <Button variant="outline" onClick={onClearFilters}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
