import Image from 'next/image'
import { HiMenuAlt2 } from 'react-icons/hi'

import logoImg from '@/assets/images/logo_colors.svg'

import { FooterList } from './footer-list'
import { MenusList } from './menus-list'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function SideMobileMenu() {
  return (
    <div className="fixed top-4 flex flex-col justify-between w-0 bg-red-300">
      <Sheet>
        <SheetTrigger className="w-10 h-10 flex items-center justify-center rounded-tr-full rounded-br-full bg-primary-green">
          <HiMenuAlt2 size={20} color="white" />
        </SheetTrigger>

        <SheetContent side="left" className="w-[180px] p-0">
          <div className="flex flex-col justify-between flex-1 fixed top-0 bottom-0 w-[180px] max-h-dvh">
            <div>
              <div className="px-5 pt-5 pb-4 border-b-[1px] border-secondary-blue">
                <Image src={logoImg} alt="My Money Manager" className="w-4/5" />
              </div>

              <MenusList />
            </div>

            <FooterList />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
