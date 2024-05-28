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

import TransactionTableRow from './transaction-table-row'
import { useDashboardPage } from './dashboard.hooks'
import { Button } from '@/components/ui/button'

export default function Transactions({ token }: { token: string }) {
  const { visibleTransactions, settings } = useDashboardPage({
    token,
  })

  return (
    <Card>
      <CardHeader className="px-4 py-2 flex flex-row items-baseline justify-between">
        <div className="flex flex-row items-baseline">
          <CardTitle className="text-primary-blue text-lg">
            Transactions
          </CardTitle>
          <CardDescription className="text-slate-500 ml-3 text-xs">
            Total: {visibleTransactions.length}{' '}
            {visibleTransactions.length > 1 ? 'transactions' : 'transaction'}
          </CardDescription>
        </div>

        <Button>Create transaction</Button>
      </CardHeader>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]" variant="transactions">
              Description
            </TableHead>

            <TableHead className="text-center" variant="transactions">
              Amount
            </TableHead>

            <TableHead className="text-center" variant="transactions">
              Estabilishment
            </TableHead>

            <TableHead className="text-center" variant="transactions">
              Category
            </TableHead>

            <TableHead className="w-[120px] text-right" variant="transactions">
              Date
            </TableHead>

            <TableHead className="w-[40px] text-right" variant="transactions" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {visibleTransactions.map((transaction) => (
            <TransactionTableRow
              key={transaction.id}
              transaction={transaction}
              settings={settings}
            />
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
