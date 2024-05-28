import { api } from '@/lib/axios'

import { CategoriesProps } from '@/types'

export interface UpdateCategoryParams {
  id: string
  body: {
    category: string
    color: string
  }
  token: string
}

export type UpdateCategoryResponse = CategoriesProps

export const updateCategory = async (params: UpdateCategoryParams) => {
  await api.put<UpdateCategoryResponse>(
    `/categories/${params?.id}`,
    params?.body,
    {
      params,
      headers: {
        Authorization: 'Bearer ' + params?.token,
      },
    },
  )
}
