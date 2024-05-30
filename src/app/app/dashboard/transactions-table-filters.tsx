'use client'
import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { MonthSelector } from '@/components/month-selector'

import { Card } from '@/components/ui/card'

import { currencyFormatHelper } from '@/utils/currency-format-helpers'

import { FilterByCategory } from './filter-by-category'
import { FilterByAccount } from './filter-by-account'
import { useDashboardPage } from './dashboard.hooks'

export default function TransactionsTableFilter({ token }: { token: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

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

  const selectedCategory = searchParams.get('category') ?? null
  const selectedAccount = searchParams.get('account') ?? null

  return (
    <Card className="my-5 p-4">
      <div className="flex items-center gap-2">
        <MonthSelector onChangeMonth={(month) => handleChangeMonth(month)} />

        <span className="text-sm font-semibold ml-4">Filters:</span>
        <FilterByCategory
          token={token}
          onSelectCategory={(categoryId) => handleSelectCategory(categoryId)}
        />

        <FilterByAccount
          token={token}
          onSelectAccount={(accountId) => handleSelectAccount(accountId)}
        />

        {(selectedCategory || selectedAccount) && (
          <>
            <span className="text-sm  text-slate-500">Filtered amount: </span>
            <span className="text-sm font-semibold text-slate-500">
              {currencyFormatHelper({
                currency: settings.currency,
                value: categoryAmountInMonth,
              })}
            </span>
          </>
        )}
      </div>
    </Card>
  )
}
