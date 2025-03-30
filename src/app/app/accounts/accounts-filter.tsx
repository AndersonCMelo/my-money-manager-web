'use client'
import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Card } from '@/components/ui/card'

import { FilterByOwner } from './filter-by-owner'

export function AccountsFilter({ token }: { token: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

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

  const handleSelectOwner = (ownerId: string | null) => {
    if (ownerId) {
      router.push(pathname + '?' + createQueryString('owner', ownerId))
    } else {
      router.push(pathname + '?' + deleteQueryString('owner'))
    }
  }

  return (
    <Card className="my-3 sm:my-5 px-3 py-2 sm:p-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold ml-0 sm:ml-2">Filters:</span>

        <FilterByOwner
          token={token}
          onSelectOwner={(ownerId) => handleSelectOwner(ownerId)}
        />
      </div>
    </Card>
  )
}
