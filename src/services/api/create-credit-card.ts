import { api } from '@/lib/axios'

import { CreditCardsProps } from '@/types'

export interface CreateCreditCardParams {
  body: {
    name: string
    limit: number
    closingDay: number
    dueDay: number
    color?: string | null
    ownerId: string
  }
  token: string
}

export type CreateCreditCardResponse = CreditCardsProps

export const createCreditCard = async (params: CreateCreditCardParams) => {
  const response = await api.post<CreateCreditCardResponse>(
    `/credit-cards`,
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
