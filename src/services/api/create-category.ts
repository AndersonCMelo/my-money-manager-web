import { api } from '@/lib/axios'

import { CategoriesProps } from '@/types'

export interface CreateCategoryParams {
  body: {
    category: string
    color: string
    order: number
  }
  token: string
}

export type CreateCategoryResponse = CategoriesProps

export const createCategory = async (params: CreateCategoryParams) => {
  const response = await api.post<CreateCategoryResponse>(
    `/categories`,
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
