import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'

import AccountsCards from './accounts-cards'
import BalanceCard from './balance-card'
import { AccountsFilter } from './accounts-filter'
import { PageTitle } from '@/components/ui/page-title'

export default async function Accounts() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col w-full p-4 sm:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 items-center mb-0 sm:mb-5">
        <div className="col-span-1 sm:col-span-2 -mb-4 sm:-mb-5">
          <PageTitle title="Accounts" />
        </div>

        <BalanceCard token={session?.accessToken ?? ''} />
      </div>

      <AccountsFilter token={session?.accessToken ?? ''} />

      <AccountsCards token={session?.accessToken ?? ''} />
    </div>
  )
}
