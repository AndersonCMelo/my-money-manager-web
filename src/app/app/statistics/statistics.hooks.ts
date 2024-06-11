import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import { getSettings } from '@/services/api/get-settings'
import { getMonthlyPercentage } from '@/services/api/get-monthly-percentage'
import { getAmountPerCategory } from '@/services/api/get-amount-per-category'
import { getAmountPerAccount } from '@/services/api/get-amount-per-account'

export const useStatisticsPage = ({ token }: { token: string }) => {
  const searchParams = useSearchParams()

  const today = new Date()
  const currentMonth = ('0' + (today.getMonth() + 1)).slice(-2)
  const currentYear = today.getFullYear()

  const month = searchParams.get('month') ?? `${currentYear}-${currentMonth}`

  const { data: monthlyPercentage } = useQuery({
    queryKey: ['monthlyPercentage', month],
    queryFn: () => getMonthlyPercentage({ query: month, token }),
  })

  const { data: amountPerCategory } = useQuery({
    queryKey: ['amountPerCategory', month],
    queryFn: () => getAmountPerCategory({ query: month, token }),
  })

  const { data: amountPerAccount } = useQuery({
    queryKey: ['amountPerAccount', month],
    queryFn: () => getAmountPerAccount({ query: month, token }),
  })

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: () => getSettings({ token }),
  })

  const settingsPlaceholder = {
    id: '',
    currency: 'EUR',
    language: 'en',
  }

  return {
    monthlyPercentage: monthlyPercentage ?? [],
    amountPerCategory: amountPerCategory ?? [],
    amountPerAccount: amountPerAccount ?? [],
    settings: settings ?? settingsPlaceholder,
  }
}
