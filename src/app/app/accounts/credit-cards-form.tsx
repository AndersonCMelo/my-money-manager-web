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
import { CreditCardsProps, UsersProps } from '@/types'
import { Send } from 'lucide-react'

import {
  useAccountsActions,
  CreditCardsFormProps,
  useInputMask,
} from './accounts.hooks'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface ComponentProps {
  token: string
  users: UsersProps[]
  isEditing: boolean
  creditCard?: CreditCardsProps
}

export function CreditCardsForm({
  token,
  users,
  isEditing = false,
  creditCard,
}: ComponentProps) {
  const { handleCreateCreditCard } = useAccountsActions({
    token,
  })

  const { handleInputMask } = useInputMask()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
    setValue,
  } = useForm<CreditCardsFormProps>()

  async function onSubmit(data: CreditCardsFormProps) {
    if (isEditing && creditCard) {
      // await handleUpdateAccount({ id: creditCard!.id, data })
    } else {
      await handleCreateCreditCard(data)
    }
  }

  const handleChange = ({
    e,
    field,
  }: {
    e: ChangeEvent<HTMLInputElement>
    field: 'limit'
  }) => {
    const value = handleInputMask(e)

    setValue(field, value)
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader className="flex flex-row items-center justify-start">
        <DialogTitle>{isEditing ? 'Edit' : 'Create'} credit card</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bankName" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={
                isEditing && creditCard ? creditCard.name : undefined
              }
              className="col-span-3"
              {...register('name', { required: true })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="accountLabel" className="text-right">
              Limit
            </Label>
            <Input
              id="limit"
              defaultValue={
                isEditing && creditCard ? creditCard.limit : undefined
              }
              className="col-span-3"
              {...register('limit', { required: false })}
              onChange={(e) => handleChange({ e, field: 'limit' })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="accountBalance" className="text-right">
              Closing Day
            </Label>
            <Input
              id="closingDay"
              type="text"
              defaultValue={
                isEditing && creditCard
                  ? (creditCard.closingDay! / 100).toFixed(2)
                  : undefined
              }
              className="col-span-3"
              {...register('closingDay', { required: false })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="accountBalance" className="text-right">
              Due Day
            </Label>
            <Input
              id="dueDay"
              type="text"
              defaultValue={
                isEditing && creditCard
                  ? (creditCard.dueDay! / 100).toFixed(2)
                  : undefined
              }
              className="col-span-3"
              {...register('dueDay', { required: false })}
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
              defaultValue={
                isEditing && creditCard ? creditCard.ownerId : undefined
              }
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
