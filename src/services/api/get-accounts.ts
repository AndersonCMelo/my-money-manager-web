import { api } from '@/lib/axios'

import { AccountsProps } from '@/types'

export interface GetAccountsParams {
  token: string
}

export type GetAccountsResponse = AccountsProps[]

export const getAccounts = async (params: GetAccountsParams) => {
  const response = await api.get<GetAccountsResponse>(`/bank-accounts`, {
    params,
    headers: {
      Authorization: 'Bearer ' + params?.token,
    },
  })

  return response.data
}
