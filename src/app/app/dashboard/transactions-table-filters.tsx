'use client'
import { useCallback, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  RiFilter3Line,
  RiCloseLine,
  RiArrowDownLine,
  RiArrowUpLine,
} from 'react-icons/ri'

import { MonthSelector } from '@/components/month-selector'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

import { currencyFormatHelper } from '@/utils/currency-format-helpers'

import { FilterByCategory } from './filter-by-category'
import { FilterByAccount } from './filter-by-account'
import { FilterByCreditCard } from './filter-by-credit-card'
import { useDashboardPage } from './dashboard.hooks'

const transactionTypes = [
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
  { value: 'transfer', label: 'Transfer' },
  { value: 'credit_expense', label: 'Credit expense' },
  { value: 'credit_payment', label: 'Credit payment' },
]

export default function TransactionsTableFilter({ token }: { token: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const { categoryAmountInMonth, settings } = useDashboardPage({
    token,
  })

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const deleteQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(name)

      return params.toString()
    },
    [searchParams],
  )

  const handleChangeMonth = (month: string) => {
    router.push(pathname + '?' + createQueryString('month', month))
  }

  const handleSelectCategory = (categoryId: string | null) => {
    if (categoryId) {
      router.push(pathname + '?' + createQueryString('category', categoryId))
    } else {
      router.push(pathname + '?' + deleteQueryString('category'))
    }
  }

  const handleSelectAccount = (accountId: string | null) => {
    if (accountId) {
      router.push(pathname + '?' + createQueryString('account', accountId))
    } else {
      router.push(pathname + '?' + deleteQueryString('account'))
    }
  }

  const handleSelectCreditCard = (creditCardId: string | null) => {
    if (creditCardId) {
      router.push(
        pathname + '?' + createQueryString('credit-card', creditCardId),
      )
    } else {
      router.push(pathname + '?' + deleteQueryString('credit-card'))
    }
  }

  const updateQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }

      router.push(pathname + '?' + params.toString())
    },
    [searchParams, router, pathname],
  )

  const handleToggleType = (type: string) => {
    const types = selectedTypes.includes(type)
      ? selectedTypes.filter((item) => item !== type)
      : [...selectedTypes, type]

    updateQueryString('type', types.length ? types.join(',') : null)
  }

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    filterKeys.forEach((key) => params.delete(key))

    router.push(pathname + '?' + params.toString())
  }

  const filterKeys = [
    'type',
    'category',
    'account',
    'credit-card',
    'hide-credit-expense',
  ]

  const selectedCategory = searchParams.get('category') ?? null
  const selectedAccount = searchParams.get('account') ?? null
  const selectedCreditCard = searchParams.get('credit-card') ?? null

  const selectedTypes = searchParams.get('type')?.split(',') ?? []
  const hideCreditExpense = searchParams.get('hide-credit-expense') === 'true'

  const hasActiveFilters = filterKeys.some((key) => searchParams.has(key))

  const [showFilters, setShowFilters] = useState(false)

  return (
    <Card className="my-5 p-4">
      <div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-between gap-2 w-full sm:w-auto">
              <MonthSelector
                onChangeMonth={(month) => handleChangeMonth(month)}
              />

              <div className="block sm:hidden">
                <DropdownMenu
                  open={isFiltersOpen}
                  onOpenChange={setIsFiltersOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={
                        isFiltersOpen || selectedCategory || selectedAccount
                          ? 'default'
                          : 'outline'
                      }
                      className="rounded-full w-10 h-10 p-0 relative"
                    >
                      <RiFilter3Line size={20} />
                      {(selectedCategory || selectedAccount) && (
                        <span className="absolute -top-1 -right-1 bg-primary-green rounded-full w-4 h-4 text-[10px] font-bold flex items-center justify-center">
                          {selectedCategory && !selectedAccount && '1'}
                          {!selectedCategory && selectedAccount && '1'}
                          {selectedCategory && selectedAccount && '2'}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="mr-8 p-2">
                    <div className="flex sm:hidden flex-col sm:flex-row items-start gap-2">
                      <span className="text-sm font-semibold">Filters:</span>

                      <FilterByCategory
                        token={token}
                        preSelectedCategory={selectedCategory}
                        onSelectCategory={(categoryId) =>
                          handleSelectCategory(categoryId)
                        }
                      />

                      <FilterByAccount
                        token={token}
                        preSelectedAccount={selectedAccount}
                        onSelectAccount={(accountId) =>
                          handleSelectAccount(accountId)
                        }
                      />

                      <FilterByCreditCard
                        token={token}
                        preSelectedCreditCard={selectedCreditCard}
                        onSelectCreditCard={(creditCardId) =>
                          handleSelectCreditCard(creditCardId)
                        }
                      />

                      <Button
                        variant="link"
                        className="p-1 gap-1 text-gray-500"
                        onClick={() => {
                          if (selectedCategory) {
                            router.push(
                              pathname + '?' + deleteQueryString('category'),
                            )
                          }
                          if (selectedAccount) {
                            router.push(
                              pathname + '?' + deleteQueryString('account'),
                            )
                          }
                          setIsFiltersOpen(false)
                        }}
                      >
                        Clear filters
                        <RiCloseLine size={16} />
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="hide-credit-expense"
                checked={hideCreditExpense}
                onCheckedChange={(checked) =>
                  updateQueryString(
                    'hide-credit-expense',
                    checked ? 'true' : null,
                  )
                }
              />
              <Label htmlFor="hide-credit-expense">
                Hide credit card expenses
              </Label>
            </div>

            {hasActiveFilters && (
              <Button
                variant="link"
                className="p-1 h-6 gap-1 text-gray-500"
                onClick={handleClearFilters}
              >
                Clear filters
                <RiCloseLine size={16} />
              </Button>
            )}

            {hasActiveFilters && (
              <div className="flex items-start sm:items-center gap-2 w-full sm:w-auto">
                <span className="text-sm  text-slate-500">
                  Filtered amount:{' '}
                </span>
                <span className="text-sm font-semibold text-slate-500">
                  {currencyFormatHelper({
                    currency: settings.currency,
                    value: categoryAmountInMonth,
                  })}
                </span>
              </div>
            )}
          </div>

          <Button
            variant={'ghost'}
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="mr-2">
              {showFilters ? 'Hide' : 'Show'} filters
            </span>
            {showFilters ? <RiArrowUpLine /> : <RiArrowDownLine />}
          </Button>
        </div>

        {showFilters && (
          <div className="mt-4">
            <div className="hidden sm:flex flex-col sm:flex-row items-center gap-2">
              <span className="text-sm font-semibold ml-4">Filters:</span>

              <FilterByCategory
                token={token}
                onSelectCategory={(categoryId) =>
                  handleSelectCategory(categoryId)
                }
              />

              <FilterByAccount
                token={token}
                onSelectAccount={(accountId) => handleSelectAccount(accountId)}
              />

              <FilterByCreditCard
                token={token}
                onSelectCreditCard={(creditCardId) =>
                  handleSelectCreditCard(creditCardId)
                }
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-3">
              {transactionTypes.map((type) => {
                const isSelected = selectedTypes.includes(type.value)

                return (
                  <Button
                    key={type.value}
                    variant={isSelected ? 'default' : 'outline'}
                    aria-pressed={isSelected}
                    className="h-8 rounded-full px-3 text-xs"
                    onClick={() => handleToggleType(type.value)}
                  >
                    {type.label}
                  </Button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
