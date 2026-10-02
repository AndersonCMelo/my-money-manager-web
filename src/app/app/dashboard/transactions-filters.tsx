'use client'
import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { RiCloseLine } from 'react-icons/ri'

import { MonthSelector } from '@/components/month-selector'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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

const filterKeys = [
  'type',
  'category',
  'account',
  'credit-card',
  'hide-credit-expense',
]

export default function TransactionsFilters({ token }: { token: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { categoryAmountInMonth, settings } = useDashboardPage({ token })

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

  const today = new Date()
  const currentMonth = ('0' + (today.getMonth() + 1)).slice(-2)
  const month =
    searchParams.get('month') ?? `${today.getFullYear()}-${currentMonth}`

  const selectedTypes = searchParams.get('type')?.split(',') ?? []
  const selectedCategory = searchParams.get('category')
  const selectedAccount = searchParams.get('account')
  const selectedCreditCard = searchParams.get('credit-card')
  const hideCreditExpense = searchParams.get('hide-credit-expense') === 'true'

  const hasActiveFilters = filterKeys.some((key) => searchParams.has(key))

  return (
    <Card className="my-5 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <MonthSelector
              key={month}
              initialMonth={month}
              onChangeMonth={(value) => updateQueryString('month', value)}
            />

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
          </div>

          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Filtered amount: </span>
              <span className="text-sm font-semibold text-slate-500">
                {currencyFormatHelper({
                  currency: settings.currency,
                  value: categoryAmountInMonth,
                })}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
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

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <FilterByCategory
            key={selectedCategory ?? 'all'}
            token={token}
            preSelectedCategory={selectedCategory}
            onSelectCategory={(categoryId) =>
              updateQueryString('category', categoryId)
            }
          />

          <FilterByAccount
            key={selectedAccount ?? 'all'}
            token={token}
            preSelectedAccount={selectedAccount}
            onSelectAccount={(accountId) =>
              updateQueryString('account', accountId)
            }
          />

          <FilterByCreditCard
            key={selectedCreditCard ?? 'all'}
            token={token}
            preSelectedCreditCard={selectedCreditCard}
            onSelectCreditCard={(creditCardId) =>
              updateQueryString('credit-card', creditCardId)
            }
          />
        </div>
      </div>
    </Card>
  )
}
