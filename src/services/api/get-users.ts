import { api } from '@/lib/axios'

import { UsersProps } from '@/types'

export interface GetUsersParams {
  token: string
}

export type GetUsersResponse = UsersProps[]

export const getUsers = async (params: GetUsersParams) => {
  const response = await api.get<GetUsersResponse>(`/users`, {
    params,
    headers: {
      Authorization: 'Bearer ' + params?.token,
    },
  })

  return response.data
}
