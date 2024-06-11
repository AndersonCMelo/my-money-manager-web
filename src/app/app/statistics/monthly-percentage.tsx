'use client'
import { PieChartIcon } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

import { currencyFormatHelper } from '@/utils/currency-format-helpers'

import { useStatisticsPage } from './statistics.hooks'

export function MonthlyPercentage({ token }: { token: string }) {
  const { monthlyPercentage, settings } = useStatisticsPage({
    token,
  })

  interface ColorsProps {
    Income: string
    Expenses: string
    Transfers: string
  }

  const COLORS: ColorsProps = {
    Income: '#3ACBA3',
    Expenses: '#FD666B',
    Transfers: '#5C7CFE',
  }

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Monthly percentage
          </CardTitle>
          <PieChartIcon className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent>
        {monthlyPercentage && (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                data={monthlyPercentage}
                dataKey="percentage"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={84}
                innerRadius={64}
                strokeWidth={8}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  // value,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180
                  const radius = 12 + innerRadius + (outerRadius - innerRadius)
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {monthlyPercentage[index].type.length > 12
                        ? monthlyPercentage[index].type
                            .substring(0, 12)
                            .concat('...')
                        : monthlyPercentage[index].type}{' '}
                    </text>
                  )
                }}
              >
                {monthlyPercentage.map((item, index) => {
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS[item.type as 'Income' | 'Expenses' | 'Transfers']
                      }
                      className="stroke-background hover:opacity-80"
                    />
                  )
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}

        <div className="mt-2 mb-5">
          <h3 className="font-semibold text-lg mb-2 text-center">Percentage</h3>

          <div className="grid grid-cols-3">
            {monthlyPercentage.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <p
                  className="text-2xl font-semibold"
                  style={{
                    color:
                      COLORS[item.type as 'Income' | 'Expenses' | 'Transfers'],
                  }}
                >
                  {item.percentage}%
                </p>
                <span className="text-xs text-slate-500">
                  of {item.type.toLowerCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2">
          <h3 className="font-semibold text-lg mb-2 text-center">Value</h3>

          <div className="grid grid-cols-3">
            {monthlyPercentage.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <p className="text-sm font-semibold">
                  {currencyFormatHelper({
                    currency: settings.currency,
                    value: item.amount,
                  })}
                </p>
                <span className="text-xs text-slate-500">
                  of {item.type.toLowerCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
