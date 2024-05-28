import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'

import UsersTable from './users-table'

export default async function Users() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col w-full p-10">
      <h1 className="text-primary-blue font-semibold text-2xl mb-5 text-left">
        Users
      </h1>

      <UsersTable token={session?.accessToken ?? ''} />
    </div>
  )
}
