import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'

import AccountsCards from './accounts-cards'
import BalanceCard from './balance-card'
import { AccountsFilter } from './accounts-filter'

export default async function Accounts() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col w-full p-10">
      <div className="grid grid-cols-3 gap-5 items-center mb-5">
        <h1 className="text-primary-blue font-semibold text-2xl text-left col-span-2">
          Accounts
        </h1>

        <BalanceCard token={session?.accessToken ?? ''} />
      </div>

      <AccountsFilter token={session?.accessToken ?? ''} />

      <AccountsCards token={session?.accessToken ?? ''} />
    </div>
  )
}
