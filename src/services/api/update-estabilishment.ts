import { api } from '@/lib/axios'

import { EstabilishmentsProps } from '@/types'

export interface UpdateEstabilishmentParams {
  id: string
  body: {
    estabilishment: string
  }
  token: string
}

export type UpdateEstabilishmentResponse = EstabilishmentsProps

export const updateEstabilishment = async (
  params: UpdateEstabilishmentParams,
) => {
  await api.patch<UpdateEstabilishmentResponse>(
    `/estabilishments/${params?.id}`,
    params?.body,
    {
      params,
      headers: {
        Authorization: 'Bearer ' + params?.token,
      },
    },
  )
}
