import { api } from '@/lib/axios'

import { SettingsProps } from '@/types'

export interface GetSettingsParams {
  token: string
}

export type GetSettingsResponse = SettingsProps

export const getSettings = async (params: GetSettingsParams) => {
  const response = await api.get<GetSettingsResponse>(`/settings`, {
    params,
    headers: {
      Authorization: 'Bearer ' + params?.token,
    },
  })

  return response.data
}
