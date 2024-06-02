import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'

import { MonthlyPercentage } from './monthly-percentage'
import MetricsFilter from './metrics-filter'

export default async function Statistics() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col w-full p-10">
      <h1 className="text-primary-blue font-semibold text-2xl mb-5 text-left">
        Statistics
      </h1>

      <MetricsFilter />

      <div className="grid grid-cols-3">
        <MonthlyPercentage token={session?.accessToken ?? ''} />
      </div>
    </div>
  )
}
