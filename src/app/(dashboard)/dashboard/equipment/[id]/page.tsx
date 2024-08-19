import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getData } from '@/lib/utils'

import SensorDataDashboard from '@/components/ui/chart/SensorDataDashboard'

import { SensorDataResponse } from '@/types'

export default async function EquipmentPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  try {
    const sensorData = await getData<SensorDataResponse>('/sensor-data', {
      equipment_id: id,
      limit: '50',
      offset: '0',
    })

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
    console.error('Error in EquipmentPage:', error)
    notFound()
  }
}
