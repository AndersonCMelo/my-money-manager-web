import { api } from '@/lib/axios'

import { UsersProps } from '@/types'

export interface CreateUserParams {
  body: {
    name: string
    email: string
    password?: string | null
    permission?: string | null
  }
  token: string
}

export type CreateUserResponse = UsersProps

export const createUser = async (params: CreateUserParams) => {
  const response = await api.post<CreateUserResponse>(`/users`, params?.body, {
    params,
    headers: {
      Authorization: 'Bearer ' + params?.token,
    },
  })

  return response.data
}
