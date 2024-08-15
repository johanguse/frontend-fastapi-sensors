import { notFound } from 'next/navigation'

import { MyChart } from '@/components/chart'

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

  const sensorResponse = await fetch(
    `http://127.0.0.1:8000/api/v1/sensor-data?equipment_id=${id}&limit=50&offset=0`
  )

  if (!sensorResponse.ok) {
    notFound()
  }

  const sensorData: { items: SensorData[] } = await sensorResponse.json()

  return (
    <div>
      <a href="/" className="text-blue-500">
        Back to home page
      </a>
      <div className="my-4">
        <h2>Sensor Data</h2>
        <MyChart data={sensorData.items} />
      </div>
    </div>
  )
}
