'use client'
import { BarChartBig } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { currencyFormatHelper } from '@/utils/currency-format-helpers'

import { useStatisticsPage } from './statistics.hooks'
import { Badge } from '@/components/ui/badge'

export function AmountPerCategory({ token }: { token: string }) {
  const { amountPerCategory, settings } = useStatisticsPage({
    token,
  })

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Amount per category
          </CardTitle>
          <BarChartBig className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent>
        <ul>
          {amountPerCategory.map(
            (data) =>
              data.amount > 0 && (
                <li
                  key={data.categoryName}
                  className="flex items-baseline gap-2"
                >
                  <span className="text-sm text-center text-slate-500">
                    {data.categoryName}:
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
                </li>
              ),
          )}
        </ul>
      </CardContent>
    </Card>
  )
}
