import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'

import UsersTable from './users-table'
import { PageTitle } from '@/components/ui/page-title'

export default async function Users() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col w-full p-4 sm:p-10">
      <PageTitle title="Users" />

      <UsersTable token={session?.accessToken ?? ''} />
    </div>
  )
}
