import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { siteConfig } from '@/config/siteConfig'

import { focusRing } from '@/lib/inputsUtils'
import { cn } from '@/lib/utils'

import { Button } from '@/components/Button'
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/Drawer'

import {
  RiDatabaseLine,
  RiHome2Line,
  RiLinkM,
  RiMenuLine,
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

export default function MobileSidebar() {
  const pathname = usePathname()
  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.settings) {
      return pathname.startsWith('/settings')
    }
    return pathname === itemHref || pathname.startsWith(itemHref)
  }
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            aria-label="open sidebar"
            className="group flex items-center rounded-md p-2 text-sm font-medium hover:bg-gray-100 data-[state=open]:bg-gray-100 hover:dark:bg-gray-400/10 dark:data-[state=open]:bg-gray-400/10"
          >
            <RiMenuLine
              className="size-6 shrink-0 sm:size-5"
              aria-hidden="true"
            />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="sm:max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Retail Analytics</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <nav
              aria-label="core mobile navigation links"
              className="flex flex-1 flex-col space-y-10"
            >
              <ul role="list" className="space-y-1.5">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <DrawerClose asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          isActive(item.href)
                            ? 'text-indigo-600 dark:text-indigo-400'
                            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50',
                          'flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-base font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900 sm:text-sm',
                          focusRing
                        )}
                      >
                        <item.icon
                          className="size-5 shrink-0"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </DrawerClose>
                  </li>
                ))}
              </ul>
              <div>
                <span className="text-sm font-medium leading-6 text-gray-500 sm:text-xs">
                  Shortcuts
                </span>
                <ul aria-label="shortcuts" role="list" className="space-y-0.5">
                  {shortcuts.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        target={item.target}
                        className={cn(
                          pathname === item.href || pathname.includes(item.href)
                            ? 'text-indigo-600 dark:text-indigo-400'
                            : 'text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50',
                          'flex items-center gap-x-2.5 rounded-md px-2 py-1.5 font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900 sm:text-sm',
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
