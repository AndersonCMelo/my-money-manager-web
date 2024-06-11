'use client'
import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { MonthSelector } from '@/components/month-selector'
import { Card } from '@/components/ui/card'

export function MetricsFilter() {
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

  function handleChangeMonth(month: string) {
    router.push(pathname + '?' + createQueryString('month', month))
  }

  return (
    <Card className="mb-5 p-4">
      <MonthSelector onChangeMonth={(month) => handleChangeMonth(month)} />
    </Card>
  )
}
