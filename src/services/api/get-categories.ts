import { api } from '@/lib/axios'

import { CategoriesProps } from '@/types'
// import { requestHandler } from '@/utils/request-handler'

export interface GetCategoriesParams {
  token: string
}

export type GetCategoriesResponse = CategoriesProps[]

export const getCategories = async (params: GetCategoriesParams) => {
  const response = await api.get<GetCategoriesResponse>(`/categories`, {
    params,
    headers: {
      Authorization: 'Bearer ' + params?.token,
    },
  })

  return response.data
}
