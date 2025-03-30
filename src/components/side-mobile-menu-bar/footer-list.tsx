'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { RiLogoutBoxFill } from 'react-icons/ri'
import { MdSettings } from 'react-icons/md'

import { Button } from '@/components/ui/button'

export const FooterList = () => {
  const pathname = usePathname()

  const handleSignOut = () => {
    signOut()
  }
  return (
    <div className="">
      <Button
        asChild
        variant={`${pathname === '/app/settings' ? 'active-' : ''}menu`}
        size="menu"
      >
        <Link href="/app/settings" className="flex flex-col items-center gap-2">
          <MdSettings />
          Settings
        </Link>
      </Button>

      <Button
        variant="menu"
        size="menu"
        className="w-full text-red-400 hover:text-white hover:bg-red-400 flex flex-col"
        onClick={handleSignOut}
      >
        <RiLogoutBoxFill />
        Logout
      </Button>
    </div>
  )
}
