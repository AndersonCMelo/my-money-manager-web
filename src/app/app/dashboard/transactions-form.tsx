'use client'
import { ChangeEvent, ReactNode, useState /* , useEffect */ } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Plus, Send } from 'lucide-react'
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi'
import { BiTransferAlt } from 'react-icons/bi'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { TransactionsProps } from '@/types'

import { SelectCategory } from './select-category'
import { SelectAccount } from './select-account'
import { SelectCreditCard } from './select-credit-card'
import { DatePicker } from './date-picker'

import {
  TransactionsFormProps,
  useInputMask,
  useTransactionsActions,
} from './dashboard.hooks'
import { completeTransactionFormHelper } from '@/utils/complete-transaction-form-helper'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface ComponentProps {
  token: string
  isEditing: boolean
  transaction?: TransactionsProps
}

interface TypesArrayProps {
  title: string
  value: 'income' | 'transfer' | 'expense' | 'credit_expense' | 'credit_payment'
  Icon?: ReactNode
  color: string
}

export function TransactionsForm({
  token,
  isEditing = false,
  transaction,
}: ComponentProps) {
  const { handleCreateTransaction } = useTransactionsActions({
    token,
  })

  const { handleInputMask } = useInputMask()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
    setValue,
    clearErrors,
    reset,
  } = useForm<TransactionsFormProps>()

  const [transactionType, setTransactionType] =
    useState<TypesArrayProps['value']>('expense')

  const [opened, setOpened] = useState<boolean>(false)
  const [closeWhenCreate, setCloseWhenCreate] = useState<boolean>(true)

  const types: TypesArrayProps[] = [
    {
      title: 'Income',
      Icon: <FiArrowUpCircle className="mr-1 w-6 h-6 sm:w-4 sm:h-4" />,
      value: 'income',
      color: 'bg-primary-green',
    },
    {
      title: 'Transfer',
      Icon: (
        <BiTransferAlt className="border-2 sm:border-[1px] rounded-full mr-1 w-6 h-6 sm:w-4 sm:h-4" />
      ),
      value: 'transfer',
      color: 'bg-secondary-button',
    },
    {
      title: 'Expense',
      Icon: <FiArrowDownCircle className="mr-1 w-6 h-6 sm:w-4 sm:h-4" />,
      value: 'expense',
      color: 'bg-primary-red',
    },
    {
      title: 'Credit Card',
      Icon: <FiArrowDownCircle className="mr-1 w-6 h-6 sm:w-4 sm:h-4" />,
      value: 'credit_expense',
      color: 'bg-primary-red',
    },
    {
      title: 'Credit payment',
      Icon: <FiArrowDownCircle className="mr-1 w-6 h-6 sm:w-4 sm:h-4" />,
      value: 'credit_payment',
      color: 'bg-primary-red',
    },
  ]

  async function onSubmit(data: TransactionsFormProps) {
    if (isEditing && transaction) {
      // await handleUpdateAccount({ id: account!.id, data })
    } else {
      await handleCreateTransaction({ data, type: transactionType })
      setValue('description', '')
      setValue('amount', '')
      setValue('estabilishment', '')

      if (closeWhenCreate) {
        reset()
        setOpened(false)
      }
      // REMOVER
      /* if (currentIndex < objects.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        console.log('Todos os objetos foram processados.')
        reset()
      } */
    }
  }

  function autocompleteForm(e: ChangeEvent<HTMLInputElement>) {
    const description = e.target.value

    if (description !== '') {
      const response = completeTransactionFormHelper({ description })

      if (response) {
        setValue('categoryId', response.category)

        if (response.estabilishment) {
          setValue('estabilishment', response.estabilishment)
        }
      }
    }
  }

  const handleChange = ({
    e,
    field,
  }: {
    e: ChangeEvent<HTMLInputElement>
    field: 'amount'
  }) => {
    const value = handleInputMask(e)

    setValue(field, value)
  }

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="rounded-full sm:rounded-md w-12 h-12 sm:w-auto sm:h-auto"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:flex ml-2">Create transaction</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] sm:max-h-min overflow-auto sm:overflow-visible">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit' : 'Create'} transaction</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-1 mb-4">
            <Tabs
              defaultValue="expense"
              className="w-auto"
              // value={transactionType}
              onValueChange={(value) => {
                if (value === 'transfer') {
                  setValue('categoryId', 'd05eb0bb-64e3-4e1d-9d67-23e6e5333d56')
                  setValue('estabilishment', '-')
                }

                setTransactionType(value as TypesArrayProps['value'])
              }}
            >
              <TabsList>
                {types.map((type, index) => (
                  <TabsTrigger
                    key={index}
                    value={type.value}
                    className="data-[state=active]:bg-primary-blue data-[state=active]:text-white"
                  >
                    {type.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="essencial">Is essencial</Label>
            <Controller
              name="essencial"
              control={control}
              rules={{ required: true }}
              defaultValue={
                isEditing && transaction ? transaction.essencial : true
              }
              render={({ field: { value, onChange } }) => {
                return <Switch checked={value} onCheckedChange={onChange} />
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                defaultValue={
                  isEditing && transaction ? transaction.description : undefined
                }
                className={errors.description && 'border-primary-red'}
                {...register('description', { required: true })}
                onBlur={(e) => autocompleteForm(e)}
              />
            </div>

            {transactionType !== 'credit_payment' && (
              <div className="flex flex-col gap-4">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="text"
                  defaultValue={
                    isEditing && transaction
                      ? (transaction.amount! / 100).toFixed(2)
                      : undefined
                  }
                  className={errors.amount && 'border-primary-red'}
                  {...register('amount', { required: true })}
                  onChange={(e) => handleChange({ e, field: 'amount' })}
                />
              </div>
            )}

            <div className="flex flex-col gap-4">
              <Label htmlFor="categoryId">Category</Label>
              <Controller
                name="categoryId"
                control={control}
                rules={{ required: true }}
                defaultValue={
                  isEditing && transaction ? transaction.categoryId : undefined
                }
                render={({ field: { name, value } }) => {
                  return (
                    <SelectCategory
                      token={token}
                      value={value}
                      error={!!errors.categoryId}
                      onSelectCategory={(categoryId) => {
                        if (categoryId) {
                          setValue(name, categoryId)
                        }
                      }}
                    />
                  )
                }}
              />
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="estabilishment">Estabilishment</Label>
              <Input
                id="estabilishment"
                type="text"
                defaultValue={
                  isEditing && transaction
                    ? transaction.estabilishment!
                    : undefined
                }
                className={errors.estabilishment && 'border-primary-red'}
                {...register('estabilishment', { required: true })}
              />
            </div>

            {(transactionType === 'income' ||
              transactionType === 'expense' ||
              transactionType === 'transfer' ||
              transactionType === 'credit_payment') && (
              <div className="flex flex-col gap-4">
                <Label htmlFor="bankAccountId">
                  {transactionType === 'transfer'
                    ? 'Source account'
                    : 'Bank account'}
                </Label>
                <Controller
                  name="bankAccountId"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={
                    isEditing && transaction
                      ? transaction.bankAccountId
                      : undefined
                  }
                  render={({ field: { name, value } }) => {
                    return (
                      <SelectAccount
                        token={token}
                        value={value}
                        error={!!errors.bankAccountId}
                        onSelectAccount={(bankAccountId) => {
                          if (bankAccountId) {
                            setValue(name, bankAccountId)
                          }
                        }}
                      />
                    )
                  }}
                />
              </div>
            )}

            {transactionType === 'transfer' && (
              <div className="flex flex-col gap-4">
                <Label htmlFor="destinationBankAccountId">
                  Destination account{' '}
                </Label>
                <Controller
                  name="destinationBankAccountId"
                  control={control}
                  rules={{ required: transactionType === 'transfer' }}
                  defaultValue={
                    isEditing && transaction
                      ? transaction.destinationBankAccountId
                      : undefined
                  }
                  render={({ field: { name, value } }) => {
                    return (
                      <SelectAccount
                        token={token}
                        value={value}
                        error={!!errors.destinationBankAccountId}
                        onSelectAccount={(bankAccountId) => {
                          if (bankAccountId) {
                            setValue(name, bankAccountId)
                          }
                        }}
                      />
                    )
                  }}
                />
              </div>
            )}

            {(transactionType === 'credit_expense' ||
              transactionType === 'credit_payment') && (
              <div className="flex flex-col gap-4">
                <Label htmlFor="destinationBankAccountId">Credit card</Label>
                <Controller
                  name="creditCardId"
                  control={control}
                  rules={{ required: transactionType === 'credit_expense' }}
                  defaultValue={
                    isEditing && transaction
                      ? transaction.creditCardId
                      : undefined
                  }
                  render={({ field: { name, value } }) => {
                    return (
                      <SelectCreditCard
                        token={token}
                        value={value}
                        error={!!errors.creditCardId}
                        onSelectCreditCard={(creditCardId) => {
                          if (creditCardId) {
                            setValue(name, creditCardId)
                          }
                        }}
                      />
                    )
                  }}
                />
              </div>
            )}

            {transactionType === 'credit_expense' && (
              <div className="flex flex-col gap-4">
                <Label htmlFor="totalInstallments">Total installments</Label>
                <Input
                  id="totalInstallments"
                  type="number"
                  defaultValue={
                    isEditing && transaction
                      ? transaction.totalInstallments
                      : undefined
                  }
                  className={errors.totalInstallments && 'border-primary-red'}
                  {...register('totalInstallments', { required: true })}
                />
              </div>
            )}

            <div className="flex flex-col gap-4">
              <Label htmlFor="date">Date</Label>
              <Controller
                name="date"
                control={control}
                rules={{ required: true }}
                defaultValue={
                  isEditing && transaction ? transaction.date : undefined
                }
                render={({ field: { value, onChange } }) => {
                  return (
                    <DatePicker
                      date={value}
                      error={!!errors.date}
                      onSelectDate={(date) => {
                        clearErrors('date')
                        onChange(date)
                      }}
                    />
                  )
                }}
              />
            </div>
          </div>

          <DialogFooter>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-0 items-center justify-between w-full">
              <div className="flex items-center justify-start gap-2 opacity-60 w-full sm:w-auto">
                <Label>Close when finish</Label>
                <Switch
                  checked={closeWhenCreate}
                  onCheckedChange={setCloseWhenCreate}
                />
              </div>

              <div className="flex items-center justify-between gap-2 w-full sm:w-auto">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
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
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                </DialogTrigger>
              </div>
            </div>
          </DialogFooter>

          {/* <Button type="button" onClick={handleButtonClick}>
            Pular transação
          </Button> */}
        </form>
      </DialogContent>
    </Dialog>
  )
}
