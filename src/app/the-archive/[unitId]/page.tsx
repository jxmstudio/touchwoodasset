import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { StorageUnitDetailClient } from './StorageUnitDetailClient'
import { storageUnits } from '@/data/storage-units'

interface StorageUnitDetailPageProps {
  params: {
    unitId: string
  }
}

export async function generateMetadata({
  params,
}: StorageUnitDetailPageProps): Promise<Metadata> {
  const { unitId } = await params
  const unit = storageUnits.find((u) => u.id === unitId)

  if (!unit) {
    return {
      title: 'Storage Unit Not Found - The Archive',
    }
  }

  return {
    title: `${unit.unitNumber} - ${unit.size}sqm Storage | The Archive`,
    description: unit.description,
    openGraph: {
      title: `${unit.unitNumber} - ${unit.size}sqm Storage at The Archive`,
      description: unit.description,
      images: unit.images,
    },
  }
}

export default async function StorageUnitDetailPage({
  params,
}: StorageUnitDetailPageProps) {
  const { unitId } = await params
  const unit = storageUnits.find((u) => u.id === unitId)

  if (!unit) {
    notFound()
  }

  return <StorageUnitDetailClient unit={unit} />
}
