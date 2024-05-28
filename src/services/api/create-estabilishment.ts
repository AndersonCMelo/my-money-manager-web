import { api } from '@/lib/axios'

import { EstabilishmentsProps } from '@/types'

export interface CreateEstabilishmentParams {
  body: {
    estabilishment: string
  }
  token: string
}

export type CreateEstabilishmentResponse = EstabilishmentsProps

export const createEstabilishment = async (
  params: CreateEstabilishmentParams,
) => {
  const response = await api.post<CreateEstabilishmentResponse>(
    `/estabilishments`,
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
