import { api } from '@/lib/axios'

export interface GetMonthlyPercentageParams {
  query: string
  token: string
}

export type GetMonthlyPercentageResponse = {
  type: string
  amount: number
  percentage: number
}[]

export const getMonthlyPercentage = async (
  params: GetMonthlyPercentageParams,
) => {
  const response = await api.get<GetMonthlyPercentageResponse>(
    `/metrics/monthly-percentage/${params?.query}`,
    {
      params,
      headers: {
        Authorization: 'Bearer ' + params?.token,
      },
    },
  )

  return response.data
}
