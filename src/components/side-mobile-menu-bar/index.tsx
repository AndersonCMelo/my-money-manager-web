import { MenusList } from './menus-list'

export function SideMobileMenuBar() {
  return (
    <div className="h-16 w-full flex justify-between bg-white border-t-[1px] border-secondary-blue">
      <MenusList />
    </div>
  )
}
