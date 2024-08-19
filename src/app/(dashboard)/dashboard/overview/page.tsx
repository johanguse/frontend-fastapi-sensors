import Link from 'next/link'

import { CompanyData } from '@/types/company'

import { getData } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function OverviewPage() {
  try {
    const data = await getData<CompanyData>('/companies', {
      page: '1',
      size: '10',
    })

    return (
      <main className="flex flex-row items-center justify-between">
        <div className="p-4">
          <h1 className="mb-4 text-2xl font-bold">Sensor Data Dashboard</h1>
          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            {data.items.map((item) => (
              <div
                key={item.id}
                className="relative min-w-40 rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm dark:border-gray-900 dark:bg-[#090E1A]"
              >
                <h2 className="text-xl">{item.name}</h2>
                <p className="mb-6 text-sm">{item.address}</p>
                <Link
                  href={`/dashboard/company/${item.id}`}
                  className="text-indigo-600 dark:text-indigo-400"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  } catch (error) {
    console.error('Error fetching companies:', error)
    return <div>Error loading companies. Please try again later.</div>
  }
}
