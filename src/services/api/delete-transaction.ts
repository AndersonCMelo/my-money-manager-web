import { api } from '@/lib/axios'

import { TransactionsProps } from '@/types'

export interface DeleteTransactionParams {
  id: string
  token: string
}

export type DeleteTransactionResponse = TransactionsProps

export const deleteTransaction = async (params: DeleteTransactionParams) => {
  await api.delete<DeleteTransactionResponse>(`/transactions/${params.id}`, {
    params,
    headers: {
      Authorization: 'Bearer ' + params?.token,
    },
  })
}
