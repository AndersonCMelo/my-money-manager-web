import { SideMenu } from '@/components/side-menu'
import { Providers } from '@/utils/providers'
import { Toaster } from 'sonner'

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="relative app-custom-grid bg-light">
      <div>
        <SideMenu />
      </div>

      <div>
        <Providers>{children}</Providers>
      </div>
      <Toaster />
    </main>
  )
}
