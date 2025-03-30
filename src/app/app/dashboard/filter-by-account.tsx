'use client'
import { useState, useEffect } from 'react'
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
import { AccountsProps } from '@/types'

import { useDashboardPage } from './dashboard.hooks'

type FilterByAccountProps = {
  token: string
  preSelectedAccount?: string | null
  onSelectAccount: (accountId: string | null) => void
}

export function FilterByAccount({
  token,
  preSelectedAccount,
  onSelectAccount,
}: FilterByAccountProps) {
  const [open, setOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<AccountsProps | null>(
    null,
  )

  const { accounts } = useDashboardPage({
    token,
  })

  useEffect(() => {
    if (preSelectedAccount) {
      setSelectedAccount(
        accounts.filter((item) => item.id === preSelectedAccount)[0],
      )
    }
  }, [accounts, preSelectedAccount])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          {selectedAccount ? (
            <>{selectedAccount.accountLabel}</>
          ) : (
            <>
              Select bank account{' '}
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
                  setSelectedAccount(null)
                  onSelectAccount(null)
                  setOpen(false)
                }}
                className="text-slate-400"
              >
                <Check className="opacity-0 mr-2 w-4 h-4" />
                All accounts
              </CommandItem>
              {accounts.map((account: AccountsProps) => (
                <CommandItem
                  key={account.id}
                  value={account.accountLabel}
                  onSelect={(value) => {
                    setSelectedAccount(
                      accounts.find(
                        (priority) => priority.accountLabel === value,
                      ) || null,
                    )
                    onSelectAccount(account.id)
                    setOpen(false)
                  }}
                  className={
                    selectedAccount?.id === account.id ? 'bg-accent' : ''
                  }
                >
                  <Check
                    className={
                      selectedAccount?.id === account.id
                        ? 'opacity-100 mr-2 w-4 h-4'
                        : 'opacity-0 mr-2 w-4 h-4'
                    }
                  />
                  {account.accountLabel}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
