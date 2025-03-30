'use client'
import { useCallback, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { RiFilter3Line, RiCloseLine } from 'react-icons/ri'

import { MonthSelector } from '@/components/month-selector'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'

import { currencyFormatHelper } from '@/utils/currency-format-helpers'

import { FilterByCategory } from './filter-by-category'
import { FilterByAccount } from './filter-by-account'
import { useDashboardPage } from './dashboard.hooks'

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

  const selectedCategory = searchParams.get('category') ?? null
  const selectedAccount = searchParams.get('account') ?? null

  return (
    <Card className="my-5 p-4">
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="flex items-center justify-between gap-2 w-full sm:w-auto">
          <MonthSelector onChangeMonth={(month) => handleChangeMonth(month)} />

          <div className="block sm:hidden">
            <DropdownMenu open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
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

        <div className="hidden sm:flex flex-col sm:flex-row items-center gap-2">
          <span className="text-sm font-semibold ml-4">Filters:</span>
          <FilterByCategory
            token={token}
            onSelectCategory={(categoryId) => handleSelectCategory(categoryId)}
          />

          <FilterByAccount
            token={token}
            onSelectAccount={(accountId) => handleSelectAccount(accountId)}
          />
        </div>

        {(selectedCategory || selectedAccount) && (
          <div className="flex items-start sm:items-center gap-2 w-full sm:w-auto">
            <span className="text-sm  text-slate-500">Filtered amount: </span>
            <span className="text-sm font-semibold text-slate-500">
              {currencyFormatHelper({
                currency: settings.currency,
                value: categoryAmountInMonth,
              })}
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}
