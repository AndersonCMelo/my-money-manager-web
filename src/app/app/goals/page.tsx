import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'

// import { MetricsFilter } from './metrics-filter'
import { Goals } from './goals'
// import { MonthlyPercentage } from './monthly-percentage'
// import { AmountPerCategory } from './amount-per-category'
// import { AmountPerAccount } from './amount-per-account'

export default async function Statistics() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col w-full p-10">
      <h1 className="text-primary-blue font-semibold text-2xl mb-5 text-left">
        Goals
      </h1>

      {/* <MetricsFilter /> */}

      <Goals token={session?.accessToken ?? ''} />

      {/* <div className="grid grid-cols-3 gap-4">
        <MonthlyPercentage token={session?.accessToken ?? ''} />

        <AmountPerCategory token={session?.accessToken ?? ''} />
        <AmountPerAccount token={session?.accessToken ?? ''} />
      </div> */}
    </div>
  )
}
