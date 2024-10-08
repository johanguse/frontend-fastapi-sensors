'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { siteConfig } from '@/config/siteConfig'

import { focusRing } from '@/lib/inputsUtils'
import { cn } from '@/lib/utils'

import MobileSidebar from './MobileSidebar'
import { UserProfileDesktop, UserProfileMobile } from './UserProfile'
import {
  RiDatabaseLine,
  RiHome2Line,
  RiLinkM,
  RiSettings5Line,
} from '@remixicon/react'

const navigation = [
  { name: 'Overview', href: siteConfig.baseLinks.overview, icon: RiHome2Line },
  {
    name: 'Add data',
    href: siteConfig.baseLinks.addData,
    icon: RiDatabaseLine,
  },
  {
    name: 'Settings',
    href: siteConfig.baseLinks.settings,
    icon: RiSettings5Line,
  },
] as const

const shortcuts = [
  {
    name: 'Github repo (frontend)',
    href: 'https://github.com/johanguse/frontend-fastapi-sensors',
    target: '_blank',
    icon: RiLinkM,
  },
  {
    name: 'Github repo (backend)',
    href: 'https://github.com/johanguse/backend-fastapi-sensors',
    target: '_blank',
    icon: RiLinkM,
  },
] as const

export function Sidebar() {
  const pathname = usePathname()
  const isActive = (itemHref: string) => {
    return pathname === itemHref || pathname.startsWith(itemHref)
  }
  return (
    <>
      {/* sidebar (lg+) */}
      <nav className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <aside className="flex grow flex-col gap-y-6 overflow-y-auto border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <h1>{siteConfig.name}</h1>
          <nav
            aria-label="core navigation links"
            className="flex flex-1 flex-col space-y-10"
          >
            <ul role="list" className="space-y-0.5">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      isActive(item.href)
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50',
                      'flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900',
                      focusRing
                    )}
                  >
                    <item.icon className="size-4 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <span className="text-xs font-medium leading-6 text-gray-500">
                Shortcuts
              </span>
              <ul aria-label="shortcuts" role="list" className="space-y-0.5">
                {shortcuts.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      target={item.target}
                      className={cn(
                        pathname === item.href || pathname.startsWith(item.href)
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50',
                        'flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900',
                        focusRing
                      )}
                    >
                      <item.icon
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="mt-auto">
            <UserProfileDesktop />
          </div>
        </aside>
      </nav>
      {/* top navbar (xs-lg) */}
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-2 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:gap-x-6 sm:px-4 lg:hidden">
        <h1>{siteConfig.name}</h1>
        <div className="flex items-center gap-1 sm:gap-2">
          <UserProfileMobile />
          <MobileSidebar />
        </div>
      </div>
    </>
  )
}
