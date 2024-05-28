'use client'
import { ElementType } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { FaUserFriends } from 'react-icons/fa'
import { MdCategory, MdAccountBalance } from 'react-icons/md'
import { RiDashboardFill } from 'react-icons/ri'
import { BiLineChart } from 'react-icons/bi'

import { Button } from '@/components/ui/button'

interface MenusProps {
  Icon: ElementType
  path: string
  title: string
  active: boolean
}

export const MenusList = () => {
  const pathname = usePathname()

  const menus: MenusProps[] = [
    {
      Icon: RiDashboardFill,
      path: '/app/dashboard',
      title: 'Dashboard',
      active: pathname === '/app/dashboard',
    },
    {
      Icon: MdAccountBalance,
      path: '/app/accounts',
      title: 'Accounts',
      active: pathname === '/app/accounts',
    },
    {
      Icon: MdCategory,
      path: '/app/categories',
      title: 'Categories',
      active: pathname === '/app/categories',
    },
    {
      Icon: BiLineChart,
      path: '/app/statistics',
      title: 'Statistics',
      active: pathname === '/app/statistics',
    },
    {
      Icon: FaUserFriends,
      path: '/app/users',
      title: 'Users',
      active: pathname === '/app/users',
    },
  ]

  return (
    <div className="px-5 pt-4 flex flex-col gap-4">
      {menus.map((menu, index) => (
        <Button
          key={index}
          asChild
          variant={`${menu.active ? 'active-' : ''}menu`}
          size="menu"
        >
          <Link href={menu.path} className="flex items-center gap-2">
            <menu.Icon />
            {menu.title}
          </Link>
        </Button>
      ))}
    </div>
  )
}
