'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryImage {
  url: string
  alt?: string
  width?: number
  height?: number
  type?: 'image' | 'video'
  videoUrl?: string
}

interface ListingGalleryProps {
  images: GalleryImage[]
  title: string
  videoUrl?: string
}

export function ListingGallery({ images, title, videoUrl }: ListingGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const getEmbedUrl = (url: string) => {
    const videoId = getYouTubeVideoId(url)
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  }

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index)
    setIsLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false)
  }, [])

  const goToPrevious = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isLightboxOpen) return

      switch (event.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'ArrowRight':
          goToNext()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, closeLightbox, goToPrevious, goToNext])

  if ((!images || images.length === 0) && !videoUrl) {
    return (
      <div className="aspect-[4/3] bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No media available</p>
      </div>
    )
  }

  const mainImage = images && images.length > 0 ? images[selectedIndex] : null

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Main Media - Video or Image */}
        <div className="relative aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden group cursor-pointer">
          {showVideo && videoUrl ? (
            <div className="w-full h-full">
              <iframe
                src={getEmbedUrl(videoUrl) || videoUrl}
                title={title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : mainImage ? (
            <>
              <Image
                src={mainImage.url}
                alt={mainImage.alt || title}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                priority
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center'
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Button
                  variant="secondary"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={() => openLightbox(selectedIndex)}
                >
                  <ZoomIn className="h-4 w-4 mr-2" />
                  View Full Size
                </Button>
              </div>

              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">No media available</p>
            </div>
          )}
        </div>

        {/* Media Toggle Buttons */}
        <div className="flex gap-2 mb-4">
          {videoUrl && (
            <Button
              variant={showVideo ? "default" : "outline"}
              size="sm"
              onClick={() => setShowVideo(true)}
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Video
            </Button>
          )}
          {images && images.length > 0 && (
            <Button
              variant={!showVideo ? "default" : "outline"}
              size="sm"
              onClick={() => setShowVideo(false)}
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21,15 16,10 5,21"/>
              </svg>
              Photos
            </Button>
          )}
        </div>

        {/* Thumbnail Grid */}
        {images && images.length > 1 && !showVideo && (
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
                  index === selectedIndex
                    ? 'ring-2 ring-primary ring-offset-2'
                    : 'hover:opacity-80'
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image.url}
                  alt={image.alt || `${title} - Image ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 25vw, 16vw"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center'
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-7xl w-full h-full max-h-[90vh] p-0">
          <DialogHeader className="absolute top-4 left-4 right-4 z-10 flex flex-row items-center justify-between">
            <DialogTitle className="text-white bg-black/50 px-3 py-1 rounded">
              {title} - {selectedIndex + 1} of {images.length}
            </DialogTitle>
            <Button
              variant="secondary"
              size="sm"
              onClick={closeLightbox}
              className="bg-black/50 hover:bg-black/70 text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <div className="relative w-full h-full flex items-center justify-center">
            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Main Lightbox Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={images[selectedIndex].url}
                  alt={images[selectedIndex].alt || title}
                  width={images[selectedIndex].width || 1200}
                  height={images[selectedIndex].height || 800}
                  className="max-w-full max-h-full object-contain"
                  sizes="90vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${
                      index === selectedIndex
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-black/50'
                        : 'hover:opacity-80'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || `${title} - Image ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="64px"
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'center'
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
