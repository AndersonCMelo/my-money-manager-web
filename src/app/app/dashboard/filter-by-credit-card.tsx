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
import { CreditCardsProps } from '@/types'

import { useDashboardPage } from './dashboard.hooks'

type FilterByCreditCardProps = {
  token: string
  preSelectedCreditCard?: string | null
  onSelectCreditCard: (creditCardId: string | null) => void
}

export function FilterByCreditCard({
  token,
  preSelectedCreditCard,
  onSelectCreditCard,
}: FilterByCreditCardProps) {
  const [open, setOpen] = useState(false)
  const [selectedCreditCard, setSelectedCreditCard] =
    useState<CreditCardsProps | null>(null)

  const { creditCards } = useDashboardPage({
    token,
  })

  useEffect(() => {
    if (preSelectedCreditCard) {
      setSelectedCreditCard(
        creditCards.filter((item) => item.id === preSelectedCreditCard)[0],
      )
    }
  }, [creditCards, preSelectedCreditCard])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          {selectedCreditCard ? (
            <>{selectedCreditCard.name}</>
          ) : (
            <>
              Select credit card{' '}
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
                  setSelectedCreditCard(null)
                  onSelectCreditCard(null)
                  setOpen(false)
                }}
                className="text-slate-400"
              >
                <Check className="opacity-0 mr-2 w-4 h-4" />
                All accounts
              </CommandItem>
              {creditCards.map((account: CreditCardsProps) => (
                <CommandItem
                  key={account.id}
                  value={account.name}
                  onSelect={(value) => {
                    setSelectedCreditCard(
                      creditCards.find((priority) => priority.name === value) ||
                        null,
                    )
                    onSelectCreditCard(account.id)
                    setOpen(false)
                  }}
                  className={
                    selectedCreditCard?.id === account.id ? 'bg-accent' : ''
                  }
                >
                  <Check
                    className={
                      selectedCreditCard?.id === account.id
                        ? 'opacity-100 mr-2 w-4 h-4'
                        : 'opacity-0 mr-2 w-4 h-4'
                    }
                  />
                  {account.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
