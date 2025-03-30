import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import { getSettings } from '@/services/api/get-settings'
import { getTransactions } from '@/services/api/get-transactions'

import dataGoals from './goals.json'

export const useGoalsPage = ({ token }: { token: string }) => {
  const searchParams = useSearchParams()

  const today = new Date()
  const currentMonth = ('0' + (today.getMonth() + 1)).slice(-2)
  const currentYear = today.getFullYear()

  const month = searchParams.get('month') ?? `${currentYear}-${currentMonth}`

  const { data: transactions } = useQuery({
    queryKey: ['transactions', month],
    queryFn: () => getTransactions({ query: month, token }),
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

  const goals = useMemo(() => {
    const data = dataGoals.map((item) => {
      const amountSpent = transactions
        ?.filter((transaction) => transaction.categoryId === item.categoryId)
        .reduce((acumulador, transaction) => acumulador + transaction.amount, 0)

      const percentage = (amountSpent! * 100) / item.monthlyGoal

      return {
        id: item.id,
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        monthlyGoal: item.monthlyGoal,
        amountSpent,
        percentage: Number(percentage.toFixed(1)),
        isRecurrent: item.isRecurrent,
      }
    })

    return data
  }, [transactions])

  return {
    goals: goals ?? [],
    settings: settings ?? settingsPlaceholder,
  }
}
