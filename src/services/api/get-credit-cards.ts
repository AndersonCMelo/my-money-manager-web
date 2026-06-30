import { api } from '@/lib/axios'

import { CreditCardsProps } from '@/types'

export interface GetCreditCardsParams {
  token: string
}

export type GetCreditCardsResponse = CreditCardsProps[]

export const getCreditCards = async (params: GetCreditCardsParams) => {
  const response = await api.get<GetCreditCardsResponse>(`/credit-cards`, {
    params,
    headers: {
      Authorization: 'Bearer ' + params?.token,
    },
  })

  return response.data
}
