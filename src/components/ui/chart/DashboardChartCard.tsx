import { cn, formatters } from '@/lib/utils'

import { LineChart } from '@/components/LineChart'

import { formatDate, isWithinInterval } from 'date-fns'
import { DateRange } from 'react-day-picker'

export type CardProps = {
  title: string
  type: 'currency' | 'unit'
  selectedDates: DateRange | undefined
  selectedPeriod: 'no-comparison' | 'year'
  data: { date: Date; value: number }[]
  isThumbnail?: boolean
}

const formattingMap = {
  currency: formatters.currency,
  unit: formatters.unit,
}

export const getBadgeType = (value: number) => {
  if (value > 0) {
    return 'success'
  } else if (value < 0) {
    if (value < -50) {
      return 'warning'
    }
    return 'error'
  } else {
    return 'neutral'
  }
}

export function ChartCard({
  title,
  type,
  selectedDates,
  selectedPeriod,
  data,
  isThumbnail,
}: CardProps) {
  const formatter = formattingMap[type]

  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No data available for the selected period.
      </div>
    )
  }

  const filteredData =
    selectedDates?.from && selectedDates?.to
      ? data.filter((item) =>
          isWithinInterval(item.date, {
            start: selectedDates.from!,
            end: selectedDates.to!,
          })
        )
      : data

  const chartData = filteredData.map((item) => ({
    date: item.date,
    formattedDate: formatDate(item.date, 'dd/MM/yyyy'),
    value: item.value,
  }))

  const value =
    chartData.length > 0
      ? chartData.reduce((acc, item) => acc + item.value, 0) / chartData.length
      : 0

  return (
    <div className={cn('transition')}>
      <div className="flex items-center justify-between gap-x-2">
        <dt className="font-bold text-gray-900 dark:text-gray-50 sm:text-sm">
          {title}
        </dt>
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <dd className="text-xl text-gray-900 dark:text-gray-50">
          {formatter(value)}
        </dd>
      </div>
      {chartData.length > 0 ? (
        <LineChart
          className="mt-6 h-32"
          data={chartData}
          index="formattedDate"
          categories={['value']}
          colors={['indigo']}
          startEndOnly={true}
          valueFormatter={(value) => formatter(value as number)}
          showYAxis={false}
          showLegend={false}
          showTooltip={!isThumbnail}
          autoMinValue
        />
      ) : (
        <div className="mt-6 flex h-32 items-center justify-center text-gray-500">
          No data available for the selected period.
        </div>
      )}
    </div>
  )
}
