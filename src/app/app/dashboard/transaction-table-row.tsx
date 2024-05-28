import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'

import { SettingsProps, TransactionsProps } from '@/types'

import { currencyFormatHelper } from '@/utils/currency-format-helpers'

interface TransactionTableRowProps {
  transaction: TransactionsProps
  settings: SettingsProps
}

export default function TransactionTableRow({
  transaction,
  settings,
}: TransactionTableRowProps) {
  const amountStyle = {
    income: 'text-primary-green',
    expense: 'text-primary-red',
    transfer: 'text-secondary-button',
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

      <TableCell className="text-right">...</TableCell>
    </TableRow>
  )
}
