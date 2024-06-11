import { api } from '@/lib/axios'

export interface GetAmountPerCategoryParams {
  query: string
  token: string
}

export type GetAmountPerCategoryResponse = {
  categoryName: string
  categoryColor: string
  amount: number
  percentage: number
}[]

export const getAmountPerCategory = async (
  params: GetAmountPerCategoryParams,
) => {
  const response = await api.get<GetAmountPerCategoryResponse>(
    `/metrics/amount-per-category/${params?.query}`,
    {
      params,
      headers: {
        Authorization: 'Bearer ' + params?.token,
      },
    },
  )

  return response.data
}
