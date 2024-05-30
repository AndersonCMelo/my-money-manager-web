'use client'
import { useState, useEffect } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { CategoriesProps } from '@/types'

import { useDashboardPage } from './dashboard.hooks'

type FilterByCategoryProps = {
  token: string
  value?: string
  error?: boolean
  onSelectCategory: (categoryId: string | null) => void
}

export function SelectCategory({
  token,
  value,
  error = false,
  onSelectCategory,
}: FilterByCategoryProps) {
  const { categories } = useDashboardPage({ token })

  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] =
    useState<CategoriesProps | null>(null)

  useEffect(() => {
    if (value) {
      const category: CategoriesProps | undefined = categories.find(
        (category) => category.id === value,
      )

      if (category) {
        setSelectedCategory(category)
      }
    }
  }, [categories, value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-between ${error && 'border-primary-red'}`}
        >
          {selectedCategory ? (
            <>{selectedCategory.category}</>
          ) : (
            <>
              Select category{' '}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex-1 w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category: CategoriesProps) => (
                <CommandItem
                  key={category.id}
                  value={category.category}
                  onSelect={(value) => {
                    setSelectedCategory(
                      categories.find(
                        (priority) => priority.category === value,
                      ) || null,
                    )
                    onSelectCategory(category.id)
                    setOpen(false)
                  }}
                  className={
                    selectedCategory?.id === category.id ? 'bg-accent' : ''
                  }
                >
                  <Check
                    className={
                      selectedCategory?.id === category.id
                        ? 'opacity-100 mr-2 w-4 h-4'
                        : 'opacity-0 mr-2 w-4 h-4'
                    }
                  />
                  {category.category}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
