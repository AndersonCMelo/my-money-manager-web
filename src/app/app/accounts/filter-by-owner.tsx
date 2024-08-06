'use client'
import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
// import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'

// import { cn } from '@/lib/utils'
import { UsersProps } from '@/types'

import { useAccountsPage } from './accounts.hooks'

type FilterByAccountProps = {
  token: string
  onSelectOwner: (ownerId: string | null) => void
}

export function FilterByOwner({ token, onSelectOwner }: FilterByAccountProps) {
  const [open, setOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UsersProps | null>(null)

  const { users } = useAccountsPage({
    token,
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          {selectedUser ? (
            <>{selectedUser.name}</>
          ) : (
            <>
              Select owner{' '}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search account..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setSelectedUser(null)
                  onSelectOwner(null)
                  setOpen(false)
                }}
                className="text-slate-400"
              >
                <Check className="opacity-0 mr-2 w-4 h-4" />
                All users
              </CommandItem>
              {users.map((user: UsersProps) => (
                <CommandItem
                  key={user.id}
                  value={user.name}
                  onSelect={(value) => {
                    setSelectedUser(
                      users.find((priority) => priority.name === value) || null,
                    )
                    onSelectOwner(user.id)
                    setOpen(false)
                  }}
                  className={selectedUser?.id === user.id ? 'bg-accent' : ''}
                >
                  <Check
                    className={
                      selectedUser?.id === user.id
                        ? 'opacity-100 mr-2 w-4 h-4'
                        : 'opacity-0 mr-2 w-4 h-4'
                    }
                  />
                  {user.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
