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

import { CreditCardsProps } from '@/types'

import { useDashboardPage } from './dashboard.hooks'

type FilterByAccountProps = {
  token: string
  value?: string | null
  error?: boolean
  onSelectCreditCard: (creditCardId: string | null) => void
}

export function SelectCreditCard({
  token,
  value,
  error = false,
  onSelectCreditCard,
}: FilterByAccountProps) {
  const [open, setOpen] = useState(false)
  const [selectedCreditCard, setSelectedCreditCard] =
    useState<CreditCardsProps | null>(null)

  const { creditCards } = useDashboardPage({
    token,
  })

  useEffect(() => {
    if (value) {
      const creditCard: CreditCardsProps | undefined = creditCards.find(
        (account) => account.id === value,
      )

      if (creditCard) {
        setSelectedCreditCard(creditCard)
      }
    }
  }, [creditCards, value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-between ${error && 'border-primary-red'}`}
        >
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

      <PopoverContent className="w-fit p-0" align="start">
        <Command>
          <CommandInput placeholder="Search account..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {creditCards.map((creditCard: CreditCardsProps) => (
                <CommandItem
                  key={creditCard.id}
                  value={creditCard.name}
                  onSelect={(value) => {
                    setSelectedCreditCard(
                      creditCards.find((priority) => priority.name === value) ||
                        null,
                    )
                    onSelectCreditCard(creditCard.id)
                    setOpen(false)
                  }}
                  className={
                    selectedCreditCard?.id === creditCard.id ? 'bg-accent' : ''
                  }
                >
                  <Check
                    className={
                      selectedCreditCard?.id === creditCard.id
                        ? 'opacity-100 mr-2 w-4 h-4'
                        : 'opacity-0 mr-2 w-4 h-4'
                    }
                  />
                  {creditCard.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
