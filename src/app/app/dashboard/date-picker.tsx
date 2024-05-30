'use client'
import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type DatePickerProps = {
  date: Date | string
  error?: boolean
  onSelectDate: (date: string) => void
}

export function DatePicker({
  date,
  error = false,
  onSelectDate,
}: DatePickerProps) {
  const formatedDate = new Date(date)

  const [opened, setOpened] = useState<boolean>(false)

  function handleSelectDate(date: Date | undefined) {
    if (date) {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')

      onSelectDate(`${year}-${month}-${day}`)
      setOpened(false)
    }
  }

  return (
    <Popover open={opened} onOpenChange={setOpened}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            error && 'border-primary-red',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex w-auto flex-col p-0 space-y-2">
        <Calendar
          mode="single"
          selected={formatedDate}
          onSelect={handleSelectDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
