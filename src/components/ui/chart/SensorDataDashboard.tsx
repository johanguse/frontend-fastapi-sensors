'use client'

import { useState } from 'react'

import { ChartCard } from '@/components/ui/chart/DashboardChartCard'
import { Filterbar } from '@/components/ui/chart/DashboardFilterbar'

import { DateRange } from 'react-day-picker'

interface SensorData {
  equipment_id: number
  timestamp: string
  value: number
  id: number
}

interface SensorDataDashboardProps {
  sensorData: SensorData[]
}

export default function SensorDataDashboard({
  sensorData,
}: SensorDataDashboardProps) {
  const [selectedDates, setSelectedDates] = useState<DateRange | undefined>(
    undefined
  )

  const handleDatesChange = (dates: DateRange | undefined) => {
    setSelectedDates(dates)
  }

  const chartData = sensorData
    .map((item) => ({
      date: new Date(item.timestamp),
      value: item.value,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Sensor Data Dashboard</h1>
      <Filterbar
        selectedDates={selectedDates}
        onDatesChange={handleDatesChange}
        maxDate={new Date(Math.max(...chartData.map((d) => d.date.getTime())))}
        minDate={new Date(Math.min(...chartData.map((d) => d.date.getTime())))}
      />
      <div className="mt-4">
        <ChartCard
          title="Sensor average data"
          type="unit"
          selectedDates={selectedDates}
          selectedPeriod="no-comparison"
          data={chartData}
        />
      </div>
    </div>
  )
}
