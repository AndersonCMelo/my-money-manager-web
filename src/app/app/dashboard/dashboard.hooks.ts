import { useMemo, ChangeEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { toast } from 'sonner'

import { getTransactions } from '@/services/api/get-transactions'
import { getSettings } from '@/services/api/get-settings'
import { getAccounts } from '@/services/api/get-accounts'
import { getCategories } from '@/services/api/get-categories'
import { createTransaction } from '@/services/api/create-transaction'
import { deleteTransaction } from '@/services/api/delete-transaction'
import { getCreditCards } from '@/services/api/get-credit-cards'

// import { categorizedTransactions } from '@/utils/complete-with-ia'

export const useDashboardPage = ({ token }: { token: string }) => {
  const searchParams = useSearchParams()
  const [isMobile, setIsMobile] = useState(false)

  const today = new Date()
  const currentMonth = ('0' + (today.getMonth() + 1)).slice(-2)
  const currentYear = today.getFullYear()

  const month = searchParams.get('month') ?? `${currentYear}-${currentMonth}`

  const { data: transactions } = useQuery({
    queryKey: ['transactions', month],
    queryFn: () => getTransactions({ query: month, token }),
  })

  useEffect(() => {
    function isMobile() {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }

    isMobile()
  }, [])

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

  const { data: creditCards } = useQuery({
    queryKey: ['credit_cards'],
    queryFn: () => getCreditCards({ token }),
  })

  let balance = 0

  if (accounts) {
    const initialValue = 0
    const sumWithInitial = accounts.reduce(
      (accumulator, currentValue) =>
        accumulator + Number(currentValue.accountBalance!),
      initialValue,
    )
    balance = sumWithInitial
  }

  const selectedCategory = searchParams.get('category') ?? null
  const selectedAccount = searchParams.get('account') ?? null
  const selectedCreditCard = searchParams.get('credit-card') ?? null

  const visibleTransactions = useMemo(() => {
    if (transactions) {
      if (!selectedCategory && !selectedAccount && !selectedCreditCard) {
        return transactions
      } else if (selectedCategory && !selectedAccount && !selectedCreditCard) {
        const filteredTransactions = transactions.filter(
          (transaction) => transaction.categoryId === selectedCategory,
        )

        return filteredTransactions
      } else if (!selectedCategory && selectedAccount && !selectedCreditCard) {
        const filteredTransactions = transactions.filter(
          (transaction) => transaction.bankAccountId === selectedAccount,
        )

        return filteredTransactions
      } else if (!selectedCategory && !selectedAccount && selectedCreditCard) {
        const filteredTransactions = transactions.filter(
          (transaction) =>
            transaction.creditCardId === selectedCreditCard &&
            transaction.type === 'credit_expense',
        )

        return filteredTransactions
      } else if (selectedCategory && selectedAccount && !selectedCreditCard) {
        const filteredTransactions = transactions.filter(
          (transaction) =>
            transaction.categoryId === selectedCategory &&
            transaction.bankAccountId === selectedAccount,
        )

        return filteredTransactions
      } else if (selectedCategory && !selectedAccount && selectedCreditCard) {
        const filteredTransactions = transactions.filter(
          (transaction) =>
            transaction.categoryId === selectedCategory &&
            transaction.creditCardId === selectedCreditCard,
        )

        return filteredTransactions
      } else if (!selectedCategory && selectedAccount && selectedCreditCard) {
        const filteredTransactions = transactions.filter(
          (transaction) =>
            transaction.bankAccountId === selectedAccount &&
            transaction.creditCardId === selectedCreditCard,
        )

        return filteredTransactions
      } else if (selectedCategory && selectedAccount && selectedCreditCard) {
        const filteredTransactions = transactions.filter(
          (transaction) =>
            transaction.categoryId === selectedCategory &&
            transaction.bankAccountId === selectedAccount &&
            transaction.creditCardId === selectedCreditCard,
        )

        return filteredTransactions
      }
    } else {
      return []
    }
  }, [transactions, selectedCategory, selectedAccount, selectedCreditCard])

  const monthlyIncome = useMemo(() => {
    if (transactions) {
      const initialValue = 0
      const sumWithInitial = transactions.reduce(
        (accumulator, currentValue) =>
          accumulator +
          (currentValue.type === 'income' ? Number(currentValue.amount!) : 0),
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
          (currentValue.type === 'expense' ? Number(currentValue.amount!) : 0) +
          (currentValue.type === 'credit_payment'
            ? Number(currentValue.amount!)
            : 0),
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
        (accumulator, currentValue) =>
          accumulator + Number(currentValue.amount!),
        initialValue,
      )

      return sumWithInitial
    } else {
      return 0
    }
  }, [visibleTransactions])

  // const test = categorizedTransactions

  return {
    isMobile,
    transactions: transactions ?? [],
    settings: settings ?? settingsPlaceholder,
    accounts: accounts ?? [],
    creditCards: creditCards ?? [],
    categories: categories ?? [],
    balance,
    monthlyIncome,
    monthlyExpenses,
    visibleTransactions: visibleTransactions ?? [],
    categoryAmountInMonth,
  }
}

export const useInputMask = () => {
  const handleInputMask = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, '')

    if (inputValue) {
      const floatValue = parseFloat(inputValue) / 100
      const floatValueFixed = floatValue.toFixed(2)

      return floatValueFixed
    } else {
      return '0'
    }
  }

  return { handleInputMask }
}

/* enum TransactionType {
  Income = 'income',
  Expense = 'expense',
  Transfer = 'transfer',
  CreditExpense = 'credit_expense',
  CreditPayment = 'credit_payment',
} */

/* const transactionsForm = z.object({
  description: z.string().nullable(),
  amount: z.string(),
  estabilishment: z.string().nullable(),
  type: z.enum([
    TransactionType.Income,
    TransactionType.Expense,
    TransactionType.Transfer,
  ]),
  essencial: z.boolean().default(true),
  date: z.string(),
  categoryId: z.string(),
  bankAccountId: z.string(),
  destinationBankAccountId: z.string().nullable(),
})

export type TransactionsFormProps = z.infer<typeof transactionsForm> */

/* const baseFields = z.object({
  description: z.string().nullable(),
  amount: z.string(),
  estabilishment: z.string().nullable(),
  essencial: z.boolean().default(true),
  date: z.string(),
  categoryId: z.string(),
  bankAccountId: z.string().nullable(),
  destinationBankAccountId: z.string().nullable(),
  creditCardId: z.string().nullable(),
  totalInstallments: z.string().nullable(),
}) */

/* const incomeSchema = baseFields.extend({
  type: z.literal(TransactionType.Income),
  bankAccountId: z.string(),
  destinationBankAccountId: z.string().nullable(),
}) */

/* const expenseSchema = baseFields.extend({
  type: z.literal(TransactionType.Expense),
  bankAccountId: z.string(),
  destinationBankAccountId: z.string().nullable(),
}) */

/* const transferSchema = baseFields.extend({
  type: z.literal(TransactionType.Transfer),
  bankAccountId: z.string(),
  destinationBankAccountId: z.string(),
}) */

/* const creditExpenseSchema = baseFields.extend({
  type: z.literal(TransactionType.CreditExpense),

  // new required fields
  creditCardId: z.string(),
  totalInstallments: z.string(),
}) */

const transactionsForm = z.object({
  description: z.string().nullable(),
  amount: z.string(),
  estabilishment: z.string().nullable(),
  essencial: z.boolean().default(true),
  date: z.string(),
  categoryId: z.string(),
  bankAccountId: z.string().nullable(),
  destinationBankAccountId: z.string().nullable(),
  creditCardId: z.string().nullable(),
  totalInstallments: z.string().nullable(),
})

export type TransactionsFormProps = z.infer<typeof transactionsForm>

interface UseTransactionsActionsProps {
  token: string
}

export const useTransactionsActions = ({
  token,
}: UseTransactionsActionsProps) => {
  const queryClient = useQueryClient()

  const { mutateAsync: createTransactionFn } = useMutation({
    mutationFn: createTransaction,
    onSuccess() {
      queryClient.invalidateQueries()
    },
  })

  const { mutateAsync: deleteTransactionFn, isPending: isDeleting } =
    useMutation({
      mutationFn: deleteTransaction,
      onSuccess() {
        queryClient.invalidateQueries()
      },
    })

  async function handleCreateTransaction({
    data,
    type,
  }: {
    data: TransactionsFormProps
    type:
      | 'income'
      | 'transfer'
      | 'expense'
      | 'credit_expense'
      | 'credit_payment'
  }) {
    try {
      await createTransactionFn({
        body: {
          description: data.description,
          amount: Number(data.amount) * 100,
          estabilishment: data.estabilishment,
          type,
          essencial: data.essencial,
          date: data.date,
          categoryId: data.categoryId,
          bankAccountId: data.bankAccountId ?? null,
          destinationBankAccountId: data.destinationBankAccountId ?? null,
          creditCardId: data.creditCardId ?? null,
          totalInstallments: data.totalInstallments
            ? Number(data.totalInstallments)
            : null,
        },
        token,
      })

      toast.success('Transaction created successfully')
    } catch (error) {
      // @ts-ignore
      if (error.response?.data) {
        // @ts-ignore
        toast.error(error.response.data.message)
      } else {
        toast.error('Something went wrong')
      }
    }
  }

  async function handleDeleteTransaction(id: string) {
    try {
      await deleteTransactionFn({ id, token })
    } catch (error) {
      // @ts-ignore
      if (error.response?.data) {
        // @ts-ignore
        toast.error(error.response.data.message)
      } else {
        toast.error('Something went wrong')
      }
    }
  }

  return {
    handleCreateTransaction,
    handleDeleteTransaction,
    isDeleting,
  }
}
