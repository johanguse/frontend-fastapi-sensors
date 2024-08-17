import { Sidebar } from '@/components/ui/navigation/sidebar'

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <Sidebar />
      <div className="lg:pl-72">
        <main className="p-4 sm:px-6 sm:py-10 lg:px-10 lg:pt-7">
          {children}
        </main>
      </div>
    </div>
  )
}
