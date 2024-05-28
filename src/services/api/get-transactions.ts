import { api } from '@/lib/axios'

import { TransactionsProps } from '@/types'

export interface GetTransactionsParams {
  query: string
  token: string
}

export type GetTransactionsResponse = TransactionsProps[]

export const getTransactions = async (params: GetTransactionsParams) => {
  const response = await api.get<GetTransactionsResponse>(
    `/transactions/${params?.query}`,
    {
      params,
      headers: {
        Authorization: 'Bearer ' + params?.token,
      },
    },
  )

  return response.data
}
