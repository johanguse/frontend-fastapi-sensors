import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getData } from '@/lib/utils'

import { Company, Equipment } from '@/types'

interface PageProps {
  company: Company
  equipment: Equipment[]
}

export default async function CompanyPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  try {
    const [company, equipmentData] = await Promise.all([
      getData<Company>(`/companies/${id}`),
      getData<{ items: Equipment[] }>('/equipment', {
        company_id: id,
        page: '1',
        size: '10',
      }),
    ])

    return <PageWrapper company={company} equipment={equipmentData.items} />
  } catch (error) {
    console.error('Error in CompanyPage:', error)
    notFound()
  }
}

function PageWrapper({ company, equipment }: PageProps) {
  return (
    <div className="p-4">
      <Link href="/dashboard" className="mb-8 text-sm text-blue-500">
        Back to dashboard
      </Link>

      <div className="mb-12 mt-4">
        <h1 className="mb-2 text-2xl font-bold">{company.name}</h1>
        <p className="text-sm">{company.address}</p>
      </div>
      <div>
        <h2 className="text-xl underline">Equipment list</h2>
        <ul>
          {equipment.map((item) => (
            <li key={item.id} className="my-4">
              <h3>{item.name}</h3>
              <p>ID: {item.equipment_id}</p>
              <Link
                href={`/dashboard/equipment/${item.id}`}
                className="text-indigo-600 dark:text-indigo-400"
              >
                View Sensor Data
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
