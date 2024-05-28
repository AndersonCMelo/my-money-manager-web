import Image from 'next/image'

import logoImg from '@/assets/images/logo_colors.svg'

import { FooterList } from './footer-list'
import { MenusList } from './menus-list'

export function SideMenu() {
  return (
    <div className="fixed w-[180px] min-h-screen border-r-[1px] border-secondary-blue flex flex-col justify-between">
      <div>
        <div className="px-5 pt-5 pb-4 border-b-[1px] border-secondary-blue">
          <Image src={logoImg} alt="My Money Manager" className="w-4/5" />
        </div>

        <MenusList />
      </div>

      <FooterList />
    </div>
  )
}
