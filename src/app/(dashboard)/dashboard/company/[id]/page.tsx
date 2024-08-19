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
    <div>
      <Link href="/" className="text-blue-500">
        Back to home page
      </Link>
      <div className="my-4">
        <h1>{company.name}</h1>
        <p>{company.address}</p>
        <p>ID: {company.id}</p>
        <p>Created At: {company.created_at}</p>
        <p>Updated At: {company.updated_at}</p>
      </div>
      <div>
        <h2>Equipment</h2>
        <ul>
          {equipment.map((item) => (
            <li key={item.id} className="my-4">
              <h3>{item.name}</h3>
              <p>ID: {item.equipment_id}</p>
              <p>Created At: {item.created_at}</p>
              <p>Updated At: {item.updated_at}</p>
              <Link
                href={`/dashboard/equipment/${item.id}`}
                className="text-blue-500"
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
