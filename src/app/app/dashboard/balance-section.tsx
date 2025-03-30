'use client'
import { ElementType } from 'react'
import { FaWallet, FaBalanceScale } from 'react-icons/fa'
import { HiTrendingUp, HiTrendingDown } from 'react-icons/hi'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { currencyFormatHelper } from '@/utils/currency-format-helpers'

import { useDashboardPage } from './dashboard.hooks'

interface BalanceProps {
  Icon: ElementType
  description: string
  value: number
  color: string
  background: string
}

export default function BalanceSection({ token }: { token: string }) {
  const { balance, monthlyExpenses, monthlyIncome, settings } =
    useDashboardPage({ token })

  const cards: BalanceProps[] = [
    {
      Icon: FaWallet,
      description: 'Balance',
      value: balance,
      color: 'text-primary-blue',
      background: 'bg-secondary-blue',
    },
    {
      Icon: HiTrendingUp,
      description: 'Monthly income',
      value: monthlyIncome,
      color: 'text-primary-green',
      background: 'bg-secondary-green',
    },
    {
      Icon: HiTrendingDown,
      description: 'Monthly expenses',
      value: monthlyExpenses,
      color: 'text-primary-red',
      background: 'bg-secondary-red',
    },
    {
      Icon: FaBalanceScale,
      description: 'Monthly balance',
      value: monthlyIncome - monthlyExpenses,
      color: 'text-primary-gray',
      background: 'bg-secondary-gray',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-5">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="p-3 sm:p-6">
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full ${card.background}`}
            >
              <card.Icon className={`${card.color}`} />
            </div>
          </CardHeader>

          <CardContent className="p-3 sm:p-6 pt-0 sm:pt-6">
            <CardDescription
              className={`font-semibold text-xs sm:text-sm mb-1 sm:mb-2  ${card.color}`}
            >
              {card.description}
            </CardDescription>

            <CardTitle className={`${card.color} text-xl sm:text-2xl -my-1`}>
              {currencyFormatHelper({
                currency: settings.currency,
                value: card.value,
              })}
            </CardTitle>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
