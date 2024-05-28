'use client'
import { useState } from 'react'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type MonthSelectorProps = {
  initialMonth?: string
  onChangeMonth: (month: string) => void
}

export function MonthSelector({
  initialMonth,
  onChangeMonth,
}: MonthSelectorProps) {
  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const today = new Date()
  const currentMonth = ('0' + (today.getMonth() + 1)).slice(-2)
  const currentYear = today.getFullYear()

  const [selectedMonth, setSelectedMonth] = useState<string>(
    initialMonth
      ? months[Number(initialMonth.substring(5, 7)) - 1]
      : months[Number(currentMonth) - 1],
  )

  const [selectedYear, setSelectedYear] = useState<number>(
    initialMonth ? Number(initialMonth.substring(0, 4)) : currentYear,
  )

  const previousMonth = () => {
    const currentMonthIndex = months.indexOf(selectedMonth)

    if (currentMonthIndex === 0) {
      setSelectedMonth(months[11])
      setSelectedYear(selectedYear - 1)

      onChangeMonth(`${selectedYear - 1}-12`)
    } else {
      setSelectedMonth(months[currentMonthIndex - 1])

      onChangeMonth(`${selectedYear}-${('0' + currentMonthIndex).slice(-2)}`)
    }
  }

  const nextMonth = () => {
    const currentMonthIndex = months.indexOf(selectedMonth)

    if (currentMonthIndex === 11) {
      setSelectedMonth(months[0])
      setSelectedYear(selectedYear + 1)

      onChangeMonth(`${selectedYear + 1}-01`)
    } else {
      setSelectedMonth(months[currentMonthIndex + 1])

      onChangeMonth(
        `${selectedYear}-${('0' + (currentMonthIndex + 1 + 1)).slice(-2)}`,
      )
    }
  }

  return (
    <div className="w-52 flex items-center justify-between">
      <Button
        variant="outline"
        className="h-7 w-7 p-0 opacity-50 hover:opacity-100"
        onClick={() => previousMonth()}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="mx-4">
        <span className="text-sm font-medium">
          {selectedMonth} {selectedYear}
        </span>
      </div>

      <Button
        variant="outline"
        className="h-7 w-7 p-0 opacity-50 hover:opacity-100"
        onClick={() => nextMonth()}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
