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
    <div className="px-5 pb-4">
      <Button
        asChild
        variant={`${pathname === '/app/settings' ? 'active-' : ''}menu`}
        size="menu"
      >
        <Link href="/app/settings" className="flex items-center gap-2">
          <MdSettings />
          Settings
        </Link>
      </Button>
      <Button
        variant="menu"
        size="menu"
        className="w-full text-red-400 hover:text-white hover:bg-red-400"
        onClick={handleSignOut}
      >
        <RiLogoutBoxFill className="mr-2" />
        Logout
      </Button>
    </div>
  )
}
