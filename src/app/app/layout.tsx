import { Providers } from '@/utils/providers'
import { Toaster } from 'sonner'
import { SideMenu } from '@/components/side-menu'
import { SideMobileMenuBar } from '@/components/side-mobile-menu-bar'

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="relative sm:app-custom-grid">
      <div className="hidden sm:flex">
        <SideMenu />
      </div>

      <div className="fixed bottom-0 z-20 w-full flex sm:hidden ">
        <SideMobileMenuBar />
      </div>

      <div className="ml-0 sm:ml-[180px] pb-16 sm:pb-0">
        <Providers>{children}</Providers>
      </div>
      <Toaster />
    </main>
  )
}
