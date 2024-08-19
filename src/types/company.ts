export interface Company {
  name: string
  address: string
  id: number
  created_at: string
  updated_at: string
}

export interface CompanyItem {
  id: number
  name: string
  slug: string
  address: string
}

export interface CompanyData {
  items: CompanyItem[]
  total: number
  page: number
  size: number
  pages: number
}
