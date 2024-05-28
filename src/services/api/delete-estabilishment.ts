import { api } from '@/lib/axios'

import { EstabilishmentsProps } from '@/types'

export interface DeleteEstabilishmentParams {
  id: string
  token: string
}

export type DeleteEstabilishmentResponse = EstabilishmentsProps

export const deleteEstabilishment = async (
  params: DeleteEstabilishmentParams,
) => {
  await api.delete<DeleteEstabilishmentResponse>(
    `/estabilishments/${params?.id}`,
    {
      params,
      headers: {
        Authorization: 'Bearer ' + params?.token,
      },
    },
  )
}
