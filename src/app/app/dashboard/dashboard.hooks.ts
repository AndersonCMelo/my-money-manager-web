import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { getTransactions } from '@/services/api/get-transactions'
import { getSettings } from '@/services/api/get-settings'
import { getAccounts } from '@/services/api/get-accounts'
import { getCategories } from '@/services/api/get-categories'

export const useDashboardPage = ({ token }: { token: string }) => {
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

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories({ token }),
    staleTime: Infinity,
  })

  const { data: accounts } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => getAccounts({ token }),
  })

  let balance = 0

  if (accounts) {
    const initialValue = 0
    const sumWithInitial = accounts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.accountBalance!,
      initialValue,
    )
    balance = sumWithInitial
  }

  const selectedCategory = searchParams.get('category') ?? null
  const selectedAccount = searchParams.get('account') ?? null

  const visibleTransactions = useMemo(() => {
    if (transactions) {
      if (!selectedCategory && !selectedAccount) {
        return transactions
      } else if (selectedCategory && !selectedAccount) {
        const filteredTransactions = transactions.filter(
          (transaction) => transaction.categoryId === selectedCategory,
        )

        return filteredTransactions
      } else if (!selectedCategory && selectedAccount) {
        const filteredTransactions = transactions.filter(
          (transaction) => transaction.bankAccountId === selectedAccount,
        )

        return filteredTransactions
      } else if (selectedCategory && selectedAccount) {
        const filteredTransactions = transactions.filter(
          (transaction) =>
            transaction.categoryId === selectedCategory &&
            transaction.bankAccountId === selectedAccount,
        )

        return filteredTransactions
      }
    } else {
      return []
    }
  }, [transactions, selectedCategory, selectedAccount])

  const monthlyIncome = useMemo(() => {
    if (transactions) {
      const initialValue = 0
      const sumWithInitial = transactions.reduce(
        (accumulator, currentValue) =>
          accumulator +
          (currentValue.type === 'income' ? currentValue.amount! : 0),
        initialValue,
      )

      return sumWithInitial
    } else {
      return 0
    }
  }, [transactions])

  const monthlyExpenses = useMemo(() => {
    if (transactions) {
      const initialValue = 0
      const sumWithInitial = transactions.reduce(
        (accumulator, currentValue) =>
          accumulator +
          (currentValue.type === 'expense' ? currentValue.amount! : 0),
        initialValue,
      )

      return sumWithInitial
    } else {
      return 0
    }
  }, [transactions])

  const categoryAmountInMonth = useMemo(() => {
    if (visibleTransactions) {
      const initialValue = 0
      const sumWithInitial = visibleTransactions.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount!,
        initialValue,
      )

      return sumWithInitial
    } else {
      return 0
    }
  }, [visibleTransactions])

  return {
    transactions: transactions ?? [],
    settings: settings ?? settingsPlaceholder,
    accounts: accounts ?? [],
    categories: categories ?? [],
    balance,
    monthlyIncome,
    monthlyExpenses,
    visibleTransactions: visibleTransactions ?? [],
    categoryAmountInMonth,
  }
}
