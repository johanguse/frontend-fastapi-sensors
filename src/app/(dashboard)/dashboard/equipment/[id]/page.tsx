import Link from 'next/link'
import { notFound } from 'next/navigation'

import { apiUrl } from '@/lib/utils'

import SensorDataDashboard from '@/components/ui/chart/SensorDataDashboard'

interface SensorData {
  equipment_id: number
  timestamp: string
  value: number
  id: number
}

export default async function EquipmentPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  try {
    const sensorResponse = await fetch(
      apiUrl(`/sensor-data`, { equipment_id: id, limit: '50', offset: '0' })
    )

    if (!sensorResponse.ok) {
      notFound()
    }

    const sensorData: { items: SensorData[] } = await sensorResponse.json()

    return (
      <div className="container mx-auto">
        <Link href="/" className="text-blue-500">
          Back to home page
        </Link>
        <div>
          <SensorDataDashboard sensorData={sensorData.items} />
        </div>
      </div>
    )
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in EquipmentPage:', error)
      notFound()
    } else {
      console.error('Unexpected error in EquipmentPage:', error)
      notFound()
    }
  }
}
