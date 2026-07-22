import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CarparkDetailClient } from './CarparkDetailClient'
import { carparkBays } from '@/data/carparks'

interface CarparkDetailPageProps {
  params: {
    bayId: string
  }
}

export async function generateMetadata({
  params,
}: CarparkDetailPageProps): Promise<Metadata> {
  const { bayId } = await params
  const bayItem = carparkBays.find((b) => b.id === bayId)

  if (!bayItem) {
    return {
      title: 'Car Park Not Found',
      description: 'The requested car park could not be found.',
    }
  }

  return {
    title: `Car Park Bay ${bayItem.bayNumber} – ${bayItem.address}, ${bayItem.suburb}`,
    description: bayItem.description,
    alternates: { canonical: `/carparks/${bayItem.id}` },
    openGraph: {
      title: `Car Park Bay ${bayItem.bayNumber} – ${bayItem.address}`,
      description: bayItem.description,
      images: [bayItem.images[0]],
    },
  }
}

export default async function CarparkDetailPage({
  params,
}: CarparkDetailPageProps) {
  const { bayId } = await params
  const bayItem = carparkBays.find((b) => b.id === bayId)

  if (!bayItem) {
    notFound()
  }

  return <CarparkDetailClient bay={bayItem} />
}
