import Link from 'next/link'
import { notFound } from 'next/navigation'

import { apiUrl } from '@/lib/utils'

interface Company {
  name: string
  address: string
  id: number
  created_at: string
  updated_at: string
}

interface Equipment {
  equipment_id: string
  name: string
  id: number
  created_at: string
  updated_at: string
}

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
    const [companyResponse, equipmentResponse] = await Promise.all([
      fetch(apiUrl(`/companies/${id}`)),
      fetch(apiUrl(`/equipment`, { company_id: id, page: '1', size: '10' })),
    ])

    if (!companyResponse.ok || !equipmentResponse.ok) {
      notFound()
    }

    const companyData = (await companyResponse.json()) as Company
    const equipmentData = (await equipmentResponse.json()) as {
      items: Equipment[]
    }

    return <PageWrapper company={companyData} equipment={equipmentData.items} />
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in CompanyPage:', error)
      notFound()
    } else {
      console.error('Unexpected error in CompanyPage:', error)
      notFound()
    }
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
