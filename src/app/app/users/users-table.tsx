'use client'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { useUsersPage } from './users.hooks'
import UserTableRow from './user-table-row'
import { CreateUserForm } from './create-user-form'

export default function UsersTable({ token }: { token: string }) {
  const { users } = useUsersPage({ token })

  return (
    <Card>
      <CardHeader className="p-4 flex flex-row items-baseline justify-between border-b-[1px]">
        <div className="flex items-baseline">
          <CardTitle className="text-primary-blue text-lg">
            List of users
          </CardTitle>
          <CardDescription className="text-slate-500 ml-3 text-xs">
            Total: {users.length} {users.length > 1 ? 'users' : 'user'}
          </CardDescription>
        </div>

        <CreateUserForm token={token} />
      </CardHeader>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[48px] text-right" variant="transactions" />

            <TableHead className="w-[30%]" variant="transactions">
              Name
            </TableHead>

            <TableHead variant="transactions">Email</TableHead>

            <TableHead className="text-center" variant="transactions">
              Permission
            </TableHead>

            <TableHead className="text-right" variant="transactions">
              Date of creation
            </TableHead>

            <TableHead className="w-[40px] text-right" variant="transactions" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <UserTableRow key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
