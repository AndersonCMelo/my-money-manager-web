'use client'
import { ElementType, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { FaUserFriends } from 'react-icons/fa'
import { MdCategory, MdAccountBalance } from 'react-icons/md'
import { RiDashboardFill } from 'react-icons/ri'
import { BiLineChart } from 'react-icons/bi'
import { FiMoreHorizontal } from 'react-icons/fi'
// import { LuGoal } from 'react-icons/lu'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'

import { FooterList } from './footer-list'

interface MenusProps {
  Icon: ElementType
  path: string
  title: string
  active: boolean
}

export const MenusList = () => {
  const pathname = usePathname()
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  const limitToShow = 3

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
      Icon: BiLineChart,
      path: '/app/statistics',
      title: 'Statistics',
      active: pathname === '/app/statistics',
    },
    {
      Icon: MdCategory,
      path: '/app/categories',
      title: 'Categories',
      active: pathname === '/app/categories',
    },
    /* {
      Icon: LuGoal,
      path: '/app/goals',
      title: 'Goals',
      active: pathname === '/app/goals',
    }, */
    {
      Icon: FaUserFriends,
      path: '/app/users',
      title: 'Users',
      active: pathname === '/app/users',
    },
  ]

  return (
    <div className="grid grid-cols-4 justify-between w-full">
      {menus.slice(0, limitToShow).map((menu, index) => (
        <Button
          key={index}
          asChild
          variant={`${menu.active ? 'active-' : ''}menu`}
          size="menu"
          className="box-border rounded-none"
        >
          <Link
            href={menu.path}
            className="flex flex-col items-center justify-center gap-2"
          >
            <menu.Icon />
            <span className="text-xs">{menu.title}</span>
          </Link>
        </Button>
      ))}

      <DropdownMenu onOpenChange={setIsMoreOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            asChild
            variant={`${isMoreOpen ? 'active-' : ''}menu`}
            size="menu"
            className="box-border rounded-none"
          >
            <div className="flex flex-col items-center justify-center gap-2 h-full">
              <FiMoreHorizontal />
              <span className="text-xs">More</span>
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <div className="flex flex-col">
            {menus.slice(limitToShow, menus.length).map((menu, index) => (
              <Button
                key={index}
                asChild
                variant={`${menu.active ? 'active-' : ''}menu`}
                size="menu"
                className="box-border rounded-none"
              >
                <Link
                  href={menu.path}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <menu.Icon />
                  <span className="text-xs">{menu.title}</span>
                </Link>
              </Button>
            ))}

            <FooterList />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
