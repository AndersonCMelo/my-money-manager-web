import { api } from '@/lib/axios'

import { TransactionsProps } from '@/types'

export interface CreateTransactionParams {
  body: {
    description: string | null
    amount: number
    estabilishment: string | null
    type:
      | 'income'
      | 'expense'
      | 'transfer'
      | 'credit_expense'
      | 'credit_payment'
    essencial: boolean
    date: string
    categoryId: string
    bankAccountId: string | null
    destinationBankAccountId: string | null
    creditCardId: string | null
    totalInstallments: number | null
  }
  token: string
}

export type CreateTransactionResponse = TransactionsProps

export const createTransaction = async (params: CreateTransactionParams) => {
  const response = await api.post<CreateTransactionResponse>(
    `/transactions`,
    params?.body,
    {
      params,
      headers: {
        Authorization: 'Bearer ' + params?.token,
      },
    },
  )

  return response.data
}
