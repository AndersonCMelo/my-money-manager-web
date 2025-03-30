'use client'
import { BarChartBig } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { currencyFormatHelper } from '@/utils/currency-format-helpers'

import { useStatisticsPage } from '../statistics/statistics.hooks'

export function AmountPerAccount({ token }: { token: string }) {
  const { amountPerAccount, settings } = useStatisticsPage({
    token,
  })

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Bank account movements
          </CardTitle>
          <BarChartBig className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent>
        <Accordion type="multiple" className="w-full">
          {amountPerAccount.map(
            (data, index) =>
              data.amount > 0 && (
                <AccordionItem key={data.accountId} value={`item-${index + 1}`}>
                  <AccordionTrigger>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-center text-slate-500">
                        {data.accountName}:
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">
                          {currencyFormatHelper({
                            currency: settings.currency,
                            value: data.amount,
                          })}
                        </span>

                        <Badge variant="secondary">{data.percentage}%</Badge>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-center text-slate-500">
                        Income:
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-primary-green">
                          {currencyFormatHelper({
                            currency: settings.currency,
                            value: data.totalIncome,
                          })}
                        </span>

                        <Badge variant="outline">
                          {data.percentageIncome}%
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-center text-slate-500">
                        Expenses:
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-primary-red">
                          {currencyFormatHelper({
                            currency: settings.currency,
                            value: data.totalExpenses,
                          })}
                        </span>

                        <Badge variant="outline">
                          {data.percentageExpenses}%
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-center text-slate-500">
                        Transfers:
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-secondary-button">
                          {currencyFormatHelper({
                            currency: settings.currency,
                            value: data.totalTransfers,
                          })}
                        </span>

                        <Badge variant="outline">
                          {data.percentageTransfers}%
                        </Badge>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ),
          )}
        </Accordion>
      </CardContent>
    </Card>
  )
}
