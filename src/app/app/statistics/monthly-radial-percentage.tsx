'use client'
import { PieChartIcon } from 'lucide-react'
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import { currencyFormatHelper } from '@/utils/currency-format-helpers'

import { useStatisticsPage } from './statistics.hooks'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

type ChatDataProps = {
  income?: { amount: number; percentage: number }
  expenses?: { amount: number; percentage: number }
  transfers?: { amount: number; percentage: number }
}

export function MonthlyRadialPercentage({ token }: { token: string }) {
  const { monthlyPercentage, settings } = useStatisticsPage({
    token,
  })

  const chartData: ChatDataProps[] = [
    monthlyPercentage.reduce<ChatDataProps>(
      (acc, { type, amount, percentage }) => {
        const key = type.toLowerCase() as keyof ChatDataProps
        acc[key] = { amount: amount / 100, percentage }
        return acc
      },
      {},
    ),
  ]

  const totalAmount = monthlyPercentage.reduce(
    (sum, item) => sum + item.amount,
    0,
  )

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
      <CardHeader className="p-3 sm:px-6 sm:pt-6 sm:pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Monthly percentage
          </CardTitle>

          <PieChartIcon className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
        {monthlyPercentage && (
          <>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square w-full max-w-[250px]"
            >
              <RadialBarChart
                data={chartData}
                endAngle={180}
                innerRadius={80}
                outerRadius={130}
              >
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />

                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 16}
                              className="fill-foreground text-xl font-bold"
                            >
                              {currencyFormatHelper({
                                currency: settings.currency,
                                value: totalAmount,
                              })}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 4}
                              className="fill-muted-foreground"
                            >
                              total amount
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </PolarRadiusAxis>

                <RadialBar
                  dataKey="income.amount"
                  stackId="a"
                  cornerRadius={5}
                  fill={COLORS.Income}
                  className="stroke-transparent stroke-2"
                />
                <RadialBar
                  dataKey="expenses.amount"
                  stackId="a"
                  cornerRadius={5}
                  fill={COLORS.Expenses}
                  className="stroke-transparent stroke-2"
                />
                <RadialBar
                  dataKey="transfers.amount"
                  stackId="a"
                  cornerRadius={5}
                  fill={COLORS.Transfers}
                  className="stroke-transparent stroke-2"
                />
              </RadialBarChart>
            </ChartContainer>
          </>
        )}

        <div className="-mt-16 mb-4 sm:mb-5">
          <h3 className="font-semibold text-lg mb-0 sm:mb-2 text-center">
            Percentage
          </h3>

          <div className="grid grid-cols-3">
            {monthlyPercentage.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <p
                  className="text-xl sm:text-2xl font-semibold"
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
          <h3 className="font-semibold text-lg mb-0 sm:mb-2 text-center">
            Value
          </h3>

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
