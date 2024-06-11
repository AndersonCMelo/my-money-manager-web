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

import { TransactionsProps } from '@/types'

import { SelectCategory } from './select-category'
import { SelectAccount } from './select-account'
import { DatePicker } from './date-picker'

import {
  TransactionsFormProps,
  useInputMask,
  useTransactionsActions,
} from './dashboard.hooks'
import { completeTransactionFormHelper } from '@/utils/complete-transaction-form-helper'

// import objects from './transactions.json'
// import { completeEstabilishment } from '@/utils/complete-estabilishment'

interface ComponentProps {
  token: string
  isEditing: boolean
  transaction?: TransactionsProps
}

interface TypesArrayProps {
  title: string
  value: 'income' | 'transfer' | 'expense'
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

  const [transactionType, setTransactionType] = useState<
    'income' | 'transfer' | 'expense'
  >('expense')

  const [opened, setOpened] = useState<boolean>(false)
  const [closeWhenCreate, setCloseWhenCreate] = useState<boolean>(true)

  const types: TypesArrayProps[] = [
    {
      title: 'Income',
      Icon: <FiArrowUpCircle className="mr-1" />,
      value: 'income',
      color: 'bg-primary-green',
    },
    {
      title: 'Transfer',
      Icon: <BiTransferAlt className="border-[1px] rounded-full mr-1" />,
      value: 'transfer',
      color: 'bg-secondary-button',
    },
    {
      title: 'Expense',
      Icon: <FiArrowDownCircle className="mr-1" />,
      value: 'expense',
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

  // Estado para rastrear o índice atual
  // const [currentIndex, setCurrentIndex] = useState(0)

  /* useEffect(() => {
    setTransactionType(
      objects[currentIndex].tipo as 'income' | 'expense' | 'transfer',
    )

    const description = objects[currentIndex].descricao
      .replace('COMPRA 5099 ', '')
      .replace(' CONTACTLESS', '')

    setValue('description', description)

    const amountValue = (objects[currentIndex].valor! * 100).toString()

    const floatValue = parseFloat(amountValue) / 100
    const floatValueFixed = floatValue.toFixed(2)

    setValue('amount', floatValueFixed)

    if (objects[currentIndex].categoryId !== null) {
      setValue('categoryId', objects[currentIndex].categoryId!)
    }

    setValue('estabilishment', completeEstabilishment(description))

    setValue('date', objects[currentIndex].data_de_registro)

    if (objects[currentIndex].tipo === 'transfer') {
      setValue(
        'destinationBankAccountId',
        '1cac373c-a7c4-4af2-ad97-82cd3faaee5c',
      )

      setValue('estabilishment', '-')
    } else {
      setValue('bankAccountId', '1cac373c-a7c4-4af2-ad97-82cd3faaee5c')
    }
  }, [currentIndex, setValue]) */

  /* const handleButtonClick = () => {
    // Execute a ação desejada no objeto atual (por exemplo, exibir uma mensagem)
    console.log('Ação executada no:', objects[currentIndex])

    // Avance para o próximo objeto, mas não ultrapasse o último objeto
    if (currentIndex < objects.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      console.log('Todos os objetos foram processados.')
    }
  } */

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger asChild>
        <Button variant="default" className="">
          <Plus className="w-4 h-4 mr-2" />
          Create transaction
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit' : 'Create'} transaction</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-2 mb-4">
            {types.map((type) => (
              <Button
                key={type.title}
                type="button"
                className={`w-full ${type.color} hover:${type.color}/80 ${transactionType === type.value ? 'opacity-100' : 'opacity-40'}`}
                onClick={() => {
                  if (type.value === 'transfer') {
                    setValue(
                      'categoryId',
                      'd05eb0bb-64e3-4e1d-9d67-23e6e5333d56',
                    )
                    setValue('estabilishment', '-')
                  }
                  setTransactionType(type.value)
                }}
              >
                {type.Icon}
                {type.title}
              </Button>
            ))}
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

          <div className="grid grid-cols-2 gap-4 py-4">
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
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex items-center gap-2 opacity-60">
                <Label>Close when finish</Label>
                <Switch
                  checked={closeWhenCreate}
                  onCheckedChange={setCloseWhenCreate}
                />
              </div>

              <div className="flex items-center gap-2">
                <Button type="submit" disabled={isSubmitting}>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>

                <DialogTrigger asChild>
                  <Button variant="outline" type="button">
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
