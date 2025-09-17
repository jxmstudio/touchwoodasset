'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, TrendingUp, Award, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { serviceFeatures, getFeatureStats } from '@/data/serviceFeatures'

interface ServiceFeatureComparisonProps {
  className?: string
}

export function ServiceFeatureComparison({ className = '' }: ServiceFeatureComparisonProps) {
  const [visibleFeatures, setVisibleFeatures] = useState<number>(0)
  const [isVisible, setIsVisible] = useState(false)
  const stats = getFeatureStats()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setVisibleFeatures(prev => {
        if (prev < serviceFeatures.length) {
          return prev + 1
        }
        return prev
      })
    }, 150)

    return () => clearInterval(interval)
  }, [isVisible])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  }

  const checkmarkVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.3, delay: 0.2 }
    }
  }

  const crossVariants = {
    hidden: { scale: 0, rotate: 180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.3, delay: 0.2 }
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Service Feature Comparison
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          See how Touchwood's comprehensive service offering compares to generic agencies
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stats.touchwoodFeatures}
            </div>
            <div className="text-sm text-gray-600">Touchwood Features</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stats.touchwoodExclusive}
            </div>
            <div className="text-sm text-gray-600">Touchwood Exclusive</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-4">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stats.touchwoodPercentage}%
            </div>
            <div className="text-sm text-gray-600">Feature Coverage</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Comparison Table */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        {/* Table Header */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-white">
          <div className="grid grid-cols-12 gap-4 p-6">
            <div className="col-span-6">
              <h3 className="text-lg font-semibold">SERVICE FEATURE</h3>
            </div>
            <div className="col-span-3 text-center">
              <h3 className="text-lg font-semibold">TOUCHWOOD</h3>
            </div>
            <div className="col-span-3 text-center">
              <h3 className="text-lg font-semibold">GENERIC AGENCY</h3>
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          <AnimatePresence>
            {serviceFeatures.slice(0, visibleFeatures).map((feature, index) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-12 gap-4 p-6 hover:bg-gray-50 transition-colors duration-200"
              >
                {/* Feature Description */}
                <div className="col-span-6">
                  <div className="flex items-start">
                    <span className="text-sm font-medium text-gray-500 mr-3 mt-0.5">
                      {index + 1}.
                    </span>
                    <span className="text-gray-900 leading-relaxed">
                      {feature.feature}
                    </span>
                  </div>
                </div>

                {/* Touchwood Column */}
                <div className="col-span-3 flex justify-center">
                  <motion.div
                    variants={checkmarkVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center justify-center"
                  >
                    {feature.touchwood ? (
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                        <X className="h-5 w-5 text-red-600" />
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Generic Agency Column */}
                <div className="col-span-3 flex justify-center">
                  <motion.div
                    variants={crossVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center justify-center"
                  >
                    {feature.genericAgency ? (
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                        <X className="h-5 w-5 text-red-600" />
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Loading State for Remaining Items */}
        {visibleFeatures < serviceFeatures.length && (
          <div className="p-6 text-center">
            <div className="inline-flex items-center space-x-2 text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span className="text-sm">Loading more features...</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 text-center"
      >
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Why Choose Touchwood?
          </h3>
          <p className="text-gray-700 mb-4">
            Touchwood offers <strong>{stats.touchwoodExclusive} exclusive features</strong> that generic agencies don't provide, 
            giving you a <strong>{stats.touchwoodPercentage}% feature coverage</strong> advantage.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {stats.touchwoodFeatures} Total Features
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {stats.touchwoodExclusive} Exclusive Benefits
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Comprehensive Service
            </Badge>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
