import { ChangeEvent } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { toast } from 'sonner'

import { getSettings } from '@/services/api/get-settings'
import { getAccounts } from '@/services/api/get-accounts'
import { getUsers } from '@/services/api/get-users'
import { createAccount } from '@/services/api/create-account'
import { updateAccount } from '@/services/api/update-account'
import { deleteAccount } from '@/services/api/delete-account'

export const useAccountsPage = ({ token }: { token: string }) => {
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: () => getSettings({ token }),
  })

  const settingsPlaceholder = {
    id: '',
    currency: 'EUR',
    language: 'en',
  }

  const { data: accounts } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => getAccounts({ token }),
  })

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers({ token }),
  })

  let balance = 0

  if (accounts) {
    const initialValue = 0
    const sumWithInitial = accounts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.accountBalance!,
      initialValue,
    )
    balance = sumWithInitial
  }

  return {
    settings: settings ?? settingsPlaceholder,
    accounts: accounts ?? [],
    users: users ?? [],
    balance,
  }
}

export const useInputMask = () => {
  // Máscara do valor opening_balance
  const handleInputMask = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, '')

    if (inputValue) {
      const floatValue = parseFloat(inputValue) / 100
      const floatValueFixed = floatValue.toFixed(2)

      return floatValueFixed
    } else {
      return '0'
    }
  }

  return { handleInputMask }
}

const accountsForm = z.object({
  bankName: z.string(),
  accountLabel: z.string().nullable(),
  openingBalance: z.number().nullable(),
  accountBalance: z.string(),
  ownerId: z.string(),
  type: z.string(),
})

export type AccountsFormProps = z.infer<typeof accountsForm>

interface UseAccountsActionsProps {
  token: string
}

export const useAccountsActions = ({ token }: UseAccountsActionsProps) => {
  const queryClient = useQueryClient()

  const { mutateAsync: createAccountFn } = useMutation({
    mutationFn: createAccount,
    onSuccess() {
      queryClient.invalidateQueries()
    },
  })

  const { mutateAsync: updateAccountFn } = useMutation({
    mutationFn: updateAccount,
    onSuccess() {
      queryClient.invalidateQueries()
    },
  })

  const { mutateAsync: deleteAccountFn } = useMutation({
    mutationFn: deleteAccount,
    onSuccess() {
      queryClient.invalidateQueries()
    },
  })

  async function handleCreateAccount(data: AccountsFormProps) {
    try {
      await createAccountFn({
        body: {
          bankName: data.bankName,
          accountLabel: data.accountLabel ?? data.bankName,
          accountBalance: Number(data.accountBalance) * 100,
          openingBalance: Number(data.accountBalance) * 100,
          ownerId: data.ownerId,
          type: data.type,
        },
        token,
      })

      toast.success('Account created successfully')
    } catch (error) {
      // @ts-ignore
      if (error.response?.data) {
        // @ts-ignore
        toast.error(error.response.data.message)
      } else {
        toast.error('Something went wrong')
      }
    }
  }

  async function handleUpdateAccount({
    id,
    data,
  }: {
    id: string
    data: AccountsFormProps
  }) {
    try {
      await updateAccountFn({
        id,
        body: {
          bankName: data.bankName,
          accountLabel: data.accountLabel ?? data.bankName,
          accountBalance: Number(data.accountBalance) * 100,
          openingBalance: Number(data.openingBalance) * 100,
          ownerId: data.ownerId,
          type: data.type,
        },
        token,
      })

      toast.success('Account updated successfully')
    } catch (error) {
      // @ts-ignore
      if (error.response?.data) {
        // @ts-ignore
        toast.error(error.response.data.message)
      } else {
        toast.error('Something went wrong')
      }
    }
  }

  async function handleDeleteAccount(id: string) {
    try {
      await deleteAccountFn({ id, token })
    } catch (error) {
      // @ts-ignore
      if (error.response?.data) {
        // @ts-ignore
        toast.error(error.response.data.message)
      } else {
        toast.error('Something went wrong')
      }
    }
  }

  return {
    handleCreateAccount,
    handleUpdateAccount,
    handleDeleteAccount,
  }
}
