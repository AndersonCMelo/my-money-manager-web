'use client'
import { MoreHorizontal, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

import ReactGA from 'react-ga4' // TODO: remove

import { SettingsProps, TransactionsProps } from '@/types'

import { currencyFormatHelper } from '@/utils/currency-format-helpers'

import { useTransactionsActions } from './dashboard.hooks'

interface TransactionTableRowProps {
  token: string
  transaction: TransactionsProps
  settings: SettingsProps
}

export function TransactionTableRow({
  token,
  transaction,
  settings,
}: TransactionTableRowProps) {
  const amountStyle = {
    income: 'text-primary-green',
    expense: 'text-primary-red',
    transfer: 'text-secondary-button',
  }

  const { handleDeleteTransaction } = useTransactionsActions({ token })

  async function testGA4(id: string) {
    ReactGA.event({
      category: 'TransactionTableRow',
      action: 'Click on test',
      label: id,
    })
  }

  return (
    <TableRow>
      <TableCell variant="transactions">{transaction.description}</TableCell>

      <TableCell
        className={`text-center font-semibold ${amountStyle[transaction.type]}`}
        variant="transactions"
      >
        {currencyFormatHelper({
          currency: settings.currency,
          value: transaction.amount,
        })}
      </TableCell>

      <TableCell className="text-center" variant="transactions">
        {transaction.estabilishment}
      </TableCell>

      <TableCell className="text-center" variant="transactions">
        <Badge color={transaction.category.color}>
          {transaction.category.category}
        </Badge>
      </TableCell>

      <TableCell className="text-right" variant="transactions">
        {transaction.date.split('-').reverse().join('/')}
      </TableCell>

      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-7 w-7 p-0 rounded-full hover:opacity-80"
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="flex flex-col">
            <Button variant="link" onClick={() => testGA4(transaction.id)}>
              Test GA4
            </Button>

            <Button
              variant="link"
              className="text-primary-red"
              onClick={() => handleDeleteTransaction(transaction.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
