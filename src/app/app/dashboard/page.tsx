import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'

import BalanceSection from './balance-section'

import Transactions from './transactions'
import TransactionsTableFilter from './transactions-table-filters'
import { PageTitle } from '@/components/ui/page-title'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col w-full p-4 sm:p-10">
      <PageTitle title={`Welcome, ${session?.user.name}`} />

      <BalanceSection token={session?.accessToken ?? ''} />

      <TransactionsTableFilter token={session?.accessToken ?? ''} />

      <Transactions token={session?.accessToken ?? ''} />
    </div>
  )
}
