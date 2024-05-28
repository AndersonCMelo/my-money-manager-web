import { api } from '@/lib/axios'

import { SettingsProps } from '@/types'

export interface UpdateSettingsParams {
  id: string
  body: {
    currency: string
    language: string
  }
  token: string
}

export type UpdateSettingsResponse = SettingsProps

export const updateSettings = async (params: UpdateSettingsParams) => {
  const response = await api.put<UpdateSettingsResponse>(
    `/settings/${params.id}`,
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
