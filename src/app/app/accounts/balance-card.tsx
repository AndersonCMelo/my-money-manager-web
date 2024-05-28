'use client'
import { FaWallet } from 'react-icons/fa'

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'

import { currencyFormatHelper } from '@/utils/currency-format-helpers'

import { useAccountsPage } from './accounts.hooks'

export default function BalanceCard({ token }: { token: string }) {
  const { balance, settings } = useAccountsPage({ token })

  return (
    <Card className="flex items-center">
      <CardHeader className="p-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary-blue">
          <FaWallet className="text-primary-blue" />
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-between my-0 mx-0 py-0 pl-0 w-full">
        <CardTitle className="text-primary-blue my-0 mx-0">
          {currencyFormatHelper({
            currency: settings.currency,
            value: balance,
          })}
        </CardTitle>
        <CardDescription className="font-semibold text-primary-blue my-0 mx-0">
          Balance
        </CardDescription>
      </CardContent>
    </Card>
  )
}
