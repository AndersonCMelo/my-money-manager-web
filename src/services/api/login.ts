import { api } from '@/lib/axios'

import { UsersProps } from '@/types'
import { requestHandler } from '@/utils/request-handler'

export interface LoginParams {
  body: {
    email: string
    password: string
  }
}

export type LoginResponse = {
  user: UsersProps
  token: string
}

export const login = requestHandler<LoginParams, LoginResponse>((params) =>
  api.post<LoginResponse>(`/login`, params?.body, {
    params,
  }),
)
