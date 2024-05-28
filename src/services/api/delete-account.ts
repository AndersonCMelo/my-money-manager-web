import { api } from '@/lib/axios'

import { AccountsProps } from '@/types'

export interface DeleteAccountParams {
  id: string
  token: string
}

export type DeleteAccountResponse = AccountsProps

export const deleteAccount = async (params: DeleteAccountParams) => {
  await api.delete<DeleteAccountResponse>(`/bank-accounts/${params.id}`, {
    params,
    headers: {
      Authorization: 'Bearer ' + params?.token,
    },
  })
}
