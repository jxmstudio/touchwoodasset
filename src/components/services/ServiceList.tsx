import React from 'react'
import { CheckCircle } from 'lucide-react'

interface ServiceListProps {
  items: string[]
  className?: string
}

export function ServiceList({ items, className = '' }: ServiceListProps) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <span className="text-gray-700 text-sm md:text-base leading-relaxed">
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}
