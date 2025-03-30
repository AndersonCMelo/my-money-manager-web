'use client'
import { ChangeEvent } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AccountsProps, UsersProps } from '@/types'
import { Send } from 'lucide-react'

import {
  useAccountsActions,
  AccountsFormProps,
  useInputMask,
} from './accounts.hooks'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface ComponentProps {
  token: string
  users: UsersProps[]
  isEditing: boolean
  account?: AccountsProps
}

export default function AccountsForm({
  token,
  users,
  isEditing = false,
  account,
}: ComponentProps) {
  const { handleCreateAccount, handleUpdateAccount } = useAccountsActions({
    token,
  })

  const { handleInputMask } = useInputMask()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
    setValue,
  } = useForm<AccountsFormProps>()

  async function onSubmit(data: AccountsFormProps) {
    if (isEditing && account) {
      await handleUpdateAccount({ id: account!.id, data })
    } else {
      await handleCreateAccount(data)
    }
  }

  const handleChange = ({
    e,
    field,
  }: {
    e: ChangeEvent<HTMLInputElement>
    field: 'accountBalance' | 'openingBalance'
  }) => {
    const value = handleInputMask(e)

    setValue(field, value)
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader className="flex flex-row items-center justify-start">
        <DialogTitle>{isEditing ? 'Edit' : 'Create'} account</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bankName" className="text-right">
              Bank name
            </Label>
            <Input
              id="bankName"
              defaultValue={isEditing && account ? account.bankName : undefined}
              className="col-span-3"
              {...register('bankName', { required: true })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="accountLabel" className="text-right">
              Account description
            </Label>
            <Input
              id="accountLabel"
              defaultValue={
                isEditing && account ? account.accountLabel : undefined
              }
              className="col-span-3"
              {...register('accountLabel', { required: false })}
            />
          </div>

          {isEditing && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="openingBalance" className="text-right">
                Initial balance
              </Label>
              <Input
                id="openingBalance"
                defaultValue={
                  isEditing && account
                    ? (account.openingBalance! / 100).toFixed(2)
                    : undefined
                }
                className="col-span-3"
                {...register('openingBalance', { required: false })}
                onChange={(e) => handleChange({ e, field: 'openingBalance' })}
              />
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="accountBalance" className="text-right">
              Account balance
            </Label>
            <Input
              id="accountBalance"
              type="text"
              defaultValue={
                isEditing && account
                  ? (account.accountBalance! / 100).toFixed(2)
                  : undefined
              }
              className="col-span-3"
              {...register('accountBalance', { required: false })}
              onChange={(e) => handleChange({ e, field: 'accountBalance' })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ownerId" className="text-right">
              Owner
            </Label>

            <Controller
              name="ownerId"
              control={control}
              rules={{ required: true }}
              defaultValue={isEditing && account ? account.ownerId : undefined}
              render={({ field: { name, onChange, value, disabled } }) => {
                return (
                  <Select
                    name={name}
                    onValueChange={onChange}
                    value={value}
                    disabled={disabled}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select an user" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )
              }}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>

            <Controller
              name="type"
              control={control}
              rules={{ required: true }}
              defaultValue={isEditing && account ? account.type : undefined}
              render={({ field: { name, onChange, value, disabled } }) => {
                return (
                  <Select
                    name={name}
                    onValueChange={onChange}
                    value={value}
                    disabled={disabled}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking_account">
                        Checking account
                      </SelectItem>
                      <SelectItem value="saving_account">
                        Saving account
                      </SelectItem>
                      <SelectItem value="investiments">Investiments</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )
              }}
            />
          </div>
        </div>

        <DialogFooter className="flex flex-row justify-end gap-2 sm:gap-0">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner />
                Sending
              </div>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send
              </>
            )}
          </Button>

          <DialogTrigger asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
