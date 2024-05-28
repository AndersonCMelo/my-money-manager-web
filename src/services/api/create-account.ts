import { api } from '@/lib/axios'

import { AccountsProps } from '@/types'

export interface CreateAccountParams {
  body: {
    bankName: string
    accountLabel: string | null
    openingBalance: number | null
    accountBalance: number
    type: string
    ownerId: string
  }
  token: string
}

export type CreateAccountResponse = AccountsProps

export const createAccount = async (params: CreateAccountParams) => {
  const response = await api.post<CreateAccountResponse>(
    `/bank-accounts`,
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
