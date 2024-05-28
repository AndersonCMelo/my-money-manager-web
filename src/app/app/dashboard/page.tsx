import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import BalanceSection from './balance-section'

import Transactions from './transactions'
import TransactionsTableFilter from './transactions-table-filters'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col w-full p-10">
      <h1 className="text-primary-blue font-semibold text-2xl mb-5 text-left">
        Welcome, {session?.user.name}
      </h1>

      <BalanceSection token={session?.accessToken ?? ''} />

      <TransactionsTableFilter token={session?.accessToken ?? ''} />

      <Transactions token={session?.accessToken ?? ''} />
    </div>
  )
}
