import { api } from '@/lib/axios'

import { AccountsProps } from '@/types'

export interface UpdateAccountParams {
  id: string
  body: {
    bankName: string
    accountLabel: string | null
    openingBalance: number
    accountBalance: number
    type: string
    ownerId: string
  }
  token: string
}

export type UpdateAccountResponse = AccountsProps

export const updateAccount = async (params: UpdateAccountParams) => {
  const response = await api.put<UpdateAccountResponse>(
    `/bank-accounts/${params.id}`,
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
