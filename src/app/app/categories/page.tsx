import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'

import { CategoriesCard } from './categories-card'
import { EstabilishmentsCard } from './estabilishments-card'
import { PageTitle } from '@/components/ui/page-title'

export default async function Categories() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col p-4 sm:p-10">
      <PageTitle title="Categories and Estabilishments" />

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-5">
        <div className="col-span-1 sm:col-span-2">
          <CategoriesCard token={session?.accessToken ?? ''} />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <EstabilishmentsCard token={session?.accessToken ?? ''} />
        </div>
      </div>
    </div>
  )
}
