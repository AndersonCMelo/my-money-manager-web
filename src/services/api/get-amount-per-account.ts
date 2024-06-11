import { api } from '@/lib/axios'

export interface GetAmountPerAccountParams {
  query: string
  token: string
}

export type GetAmountPerAccountResponse = {
  accountId: string
  accountName: string
  amount: number
  percentage: number
  totalIncome: number
  percentageIncome: number
  totalExpenses: number
  percentageExpenses: number
  totalTransfers: number
  percentageTransfers: number
}[]

export const getAmountPerAccount = async (
  params: GetAmountPerAccountParams,
) => {
  const response = await api.get<GetAmountPerAccountResponse>(
    `/metrics/amount-per-account/${params?.query}`,
    {
      params,
      headers: {
        Authorization: 'Bearer ' + params?.token,
      },
    },
  )

  return response.data
}
