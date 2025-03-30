'use client'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

// import { TransactionTableRow } from './transaction-table-row'
import { useGoalsPage } from './goals.hooks'
import { GoalTableRow } from './goal-table-row'
// import { TransactionsForm } from './transactions-form'

export function Goals({ token }: { token: string }) {
  const { goals, settings } = useGoalsPage({
    token,
  })

  return (
    <Card>
      <CardHeader className="px-4 py-2">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-baseline">
            <CardTitle className="text-primary-blue text-lg">
              Monthly goals
            </CardTitle>
          </div>

          {/* <TransactionsForm token={token} isEditing={false} /> */}
        </div>
      </CardHeader>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]" variant="transactions">
              Category
            </TableHead>

            <TableHead className="text-center" variant="transactions">
              Goal
            </TableHead>

            <TableHead className="text-center" variant="transactions">
              Amount spent
            </TableHead>

            <TableHead className="text-center" variant="transactions">
              Progress
            </TableHead>

            <TableHead className="w-[40px] text-right" variant="transactions" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {goals.map((goal) => (
            <GoalTableRow
              token={token}
              key={goal.id}
              goal={goal}
              settings={settings}
            />
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
