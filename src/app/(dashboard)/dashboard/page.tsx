import Link from 'next/link'

import { CompanyData } from '@/types/company'

import { getData } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  try {
    const data = await getData<CompanyData>('/companies', {
      page: '1',
      size: '10',
    })

    return (
      <main className="flex flex-row items-center justify-between p-24">
        {data.items.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.slug}</p>
            <p>{item.address}</p>
            <Link href={`/dashboard/company/${item.id}`}>View Details</Link>
          </div>
        ))}
      </main>
    )
  } catch (error) {
    console.error('Error fetching companies:', error)
    return <div>Error loading companies. Please try again later.</div>
  }
}
