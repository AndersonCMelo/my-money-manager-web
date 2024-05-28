import { api } from '@/lib/axios'

import { EstabilishmentsProps } from '@/types'
import { requestHandler } from '@/utils/request-handler'

export interface GetEstabilishmentsParams {
  token: string
}

export type GetEstabilishmentsResponse = EstabilishmentsProps[]

export const getEstabilishments = requestHandler<
  GetEstabilishmentsParams,
  GetEstabilishmentsResponse
>((params) =>
  api.get<GetEstabilishmentsResponse>(`/estabilishments`, {
    params,
    headers: {
      Authorization: 'Bearer ' + params?.token,
    },
  }),
)
