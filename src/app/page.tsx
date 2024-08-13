import Link from "next/link";

interface CompanyItem {
  name: string;
  slug: string;
  address: string;
  id: number;
  created_at: string;
  updated_at: string;
}

interface CompanyData {
  items: CompanyItem[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

async function getData(): Promise<CompanyData> {
  const res = await fetch(
    "http://127.0.0.1:8000/api/v1/companies?page=1&size=10"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <main className="flex flex-row items-center justify-between p-24">
        {data.items.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.slug}</p>
            <p>{item.address}</p>
            <Link href={`/company/${item.id}`} className="text-blue-500">View Company</Link>
          </div>
        ))}
      </main>
    </>
  );
}
