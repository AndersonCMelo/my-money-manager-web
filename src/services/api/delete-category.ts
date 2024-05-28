import { api } from '@/lib/axios'

import { CategoriesProps } from '@/types'

export interface DeleteCategoryParams {
  id: string
  token: string
}

export type DeleteCategoryResponse = CategoriesProps

export const deleteCategory = async (params: DeleteCategoryParams) => {
  await api.delete<DeleteCategoryResponse>(`/categories/${params?.id}`, {
    params,
    headers: {
      Authorization: 'Bearer ' + params?.token,
    },
  })
}
