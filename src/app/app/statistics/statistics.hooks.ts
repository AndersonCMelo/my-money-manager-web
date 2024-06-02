import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import { getSettings } from '@/services/api/get-settings'
import { getMonthlyPercentage } from '@/services/api/get-monthly-percentage'

export const useStatisticsPage = ({ token }: { token: string }) => {
  const searchParams = useSearchParams()

  const today = new Date('2024-01-15')
  const currentMonth = ('0' + (today.getMonth() + 1)).slice(-2)
  const currentYear = today.getFullYear()

  const month = searchParams.get('month') ?? `${currentYear}-${currentMonth}`

  const { data: monthlyPercentage } = useQuery({
    queryKey: ['transactions', month],
    queryFn: () => getMonthlyPercentage({ query: month, token }),
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
    settings: settings ?? settingsPlaceholder,
  }
}
