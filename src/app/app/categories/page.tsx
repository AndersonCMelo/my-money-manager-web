import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'

import { CategoriesCard } from './categories-card'
import { EstabilishmentsCard } from './estabilishments-card'

export default async function Categories() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col p-10">
      <h1 className="text-primary-blue font-semibold text-2xl mb-5 text-left">
        Categories and Estabilishments
      </h1>

      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-2">
          <CategoriesCard token={session?.accessToken ?? ''} />
        </div>

        <div className="col-span-2">
          <EstabilishmentsCard token={session?.accessToken ?? ''} />
        </div>
      </div>
    </div>
  )
}
