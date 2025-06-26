import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'

import { MetricsFilter } from './metrics-filter'
// import { MonthlyPercentage } from './monthly-percentage'
import { MonthlyRadialPercentage } from './monthly-radial-percentage'
import { AmountPerCategory } from './amount-per-category'
import { AmountPerAccount } from './amount-per-account'
import { PageTitle } from '@/components/ui/page-title'

export default async function Statistics() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col w-full p-4 sm:p-10">
      <PageTitle title="Statistics" />

      <MetricsFilter />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* <MonthlyPercentage token={session?.accessToken ?? ''} /> */}
        <MonthlyRadialPercentage token={session?.accessToken ?? ''} />

        <AmountPerCategory token={session?.accessToken ?? ''} />

        <AmountPerAccount token={session?.accessToken ?? ''} />
      </div>
    </div>
  )
}
