'use client'
import { MoreHorizontal, Trash2, Edit } from 'lucide-react'
// import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

import { SettingsProps, GoalsProps } from '@/types'

import { currencyFormatHelper } from '@/utils/currency-format-helpers'

// import { useTransactionsActions } from './goals.hooks'

interface GoalTableRowProps {
  token?: string
  goal: GoalsProps
  settings: SettingsProps
}

export function GoalTableRow({
  /* token,  */ goal,
  settings,
}: GoalTableRowProps) {
  /* const { handleDeleteTransaction } = useTransactionsActions({
    token,
  }) */

  return (
    <TableRow>
      <TableCell variant="transactions">{goal.categoryName}</TableCell>

      <TableCell className={`text-center font-semibold`} variant="transactions">
        {currencyFormatHelper({
          currency: settings.currency,
          value: goal.monthlyGoal,
        })}
      </TableCell>

      <TableCell className={`text-center font-semibold`} variant="transactions">
        {currencyFormatHelper({
          currency: settings.currency,
          value: goal.amountSpent!,
        })}
      </TableCell>

      <TableCell
        className="text-center flex items-center gap-2"
        variant="transactions"
      >
        <Progress value={goal.percentage} className="w-[60%]" />
        <span
          className={
            goal.percentage <= 100 ? 'text-primary-green' : 'text-primary-red'
          }
        >
          {goal.percentage}%
        </span>
      </TableCell>

      {/* <TableCell className="text-center" variant="transactions">
        <Badge color={transaction.category.color}>
          {transaction.category.category}
        </Badge>
      </TableCell> */}

      {/* <TableCell className="text-right" variant="transactions">
        {transaction.date.split('-').reverse().join('/')}
      </TableCell> */}

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

          <DropdownMenuContent
            align="end"
            className="flex flex-col items-start"
          >
            <Button
              variant="link"
              className="text-primary-blue"
              // onClick={() => handleDeleteTransaction(transaction.id)}
              onClick={() => {}}
              disabled
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>

            <Button
              variant="link"
              className="text-primary-red"
              // onClick={() => handleDeleteTransaction(transaction.id)}
              onClick={() => {}}
              disabled
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
