import Image from 'next/image'

export default function TestImagesPage() {
  const images = [
    { src: '/images/services/residential.png', alt: 'Residential' },
    { src: '/images/services/commercial.png', alt: 'Commercial' },
    { src: '/images/services/ancillary.png', alt: 'Ancillary' }
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Image Test Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div key={index} className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={img.src}
              alt={img.alt}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
            <p className="p-2 text-sm text-center">{img.alt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
