import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TableCell, TableRow } from '@/components/ui/table'

import { UsersProps } from '@/types'

interface UserTableRowProps {
  user: UsersProps
}

export default function UserTableRow({ user }: UserTableRowProps) {
  const permissionText = {
    admin: 'Administrator',
    editor: 'Editor',
    reader: 'Reader',
  }

  function nameOfAvatar(name: string) {
    const separetedName = name.split(' ')

    if (separetedName.length === 1) {
      const firstName = separetedName[0] as string

      return `${firstName[0]}`
    } else if (separetedName.length > 1) {
      const firstName = separetedName[0] as string
      const lastName = separetedName[separetedName.length - 1] as string

      return `${firstName[0]}${lastName[0]}` as string
    } else {
      return ''
    }
  }

  return (
    <TableRow>
      <TableCell className="text-right py-2 pr-0">
        <Avatar className="w-8 h-8">
          <AvatarImage src="" alt="" />
          <AvatarFallback className="text-xs font-semibold">
            {nameOfAvatar(user.name)}
          </AvatarFallback>
        </Avatar>
      </TableCell>

      <TableCell variant="transactions">{user.name}</TableCell>

      <TableCell className="" variant="transactions">
        {user.email}
      </TableCell>

      <TableCell className="text-center" variant="transactions">
        {user.permission ? permissionText[user.permission] : ''}
      </TableCell>

      <TableCell className="text-right" variant="transactions">
        {user.created_at.substring(0, 10).split('-').reverse().join('/')}
      </TableCell>

      <TableCell className="text-right">...</TableCell>
    </TableRow>
  )
}
