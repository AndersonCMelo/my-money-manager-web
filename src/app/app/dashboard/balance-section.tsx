'use client'
import { ElementType, useEffect } from 'react'
import { FaWallet, FaBalanceScale } from 'react-icons/fa'
import { HiTrendingUp, HiTrendingDown } from 'react-icons/hi'

import ReactGA from 'react-ga4' // TODO: remove

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

  const TRACKING_ID = 'G-LBT1G33BRE'

  // TODO: remove
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID)

    ReactGA.send({
      hitType: 'pageview',
      page: '/app/dashboard',
      title: 'Dashboard Page',
    })
  }, [])

  return (
    <div className="grid grid-cols-4 gap-5">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader>
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${card.background}`}
            >
              <card.Icon className={`${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className={`font-semibold mb-2 ${card.color}`}>
              {card.description}
            </CardDescription>
            <CardTitle className={`${card.color}`}>
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
