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
// import { Button } from '@/components/ui/button'

import { TransactionTableRow } from './transaction-table-row'
import { useDashboardPage } from './dashboard.hooks'
import { TransactionsForm } from './transactions-form'

export default function Transactions({ token }: { token: string }) {
  const { visibleTransactions, settings } = useDashboardPage({
    token,
  })

  return (
    <Card>
      <CardHeader className="px-4 py-2">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-baseline">
            <CardTitle className="text-primary-blue text-lg">
              Transactions
            </CardTitle>
            <CardDescription className="text-slate-500 ml-3 text-xs">
              Total: {visibleTransactions.length}{' '}
              {visibleTransactions.length > 1 ? 'transactions' : 'transaction'}
            </CardDescription>
          </div>

          {/* <Button>Populate table</Button> */}
          <div className="block sm:block fixed bottom-10 left-1/2 -translate-x-1/2 z-30 sm:relative sm:bottom-auto sm:left-auto sm:translate-x-0">
            <TransactionsForm token={token} isEditing={false} />
          </div>
        </div>
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
              token={token}
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
