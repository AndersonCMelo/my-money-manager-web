'use client'
import { useEffect, useState } from 'react'
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
// import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'

// import { cn } from '@/lib/utils'

import { CategoriesProps } from '@/types'

import { useDashboardPage } from './dashboard.hooks'

type FilterByCategoryProps = {
  token: string
  preSelectedCategory?: string | null
  onSelectCategory: (categoryId: string | null) => void
}

export function FilterByCategory({
  token,
  preSelectedCategory,
  onSelectCategory,
}: FilterByCategoryProps) {
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] =
    useState<CategoriesProps | null>(null)

  const { categories } = useDashboardPage({ token })

  useEffect(() => {
    if (preSelectedCategory) {
      setSelectedCategory(
        categories.filter((item) => item.id === preSelectedCategory)[0],
      )
    }
  }, [categories, preSelectedCategory])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
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

      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setSelectedCategory(null)
                  onSelectCategory(null)
                  setOpen(false)
                }}
                className="text-slate-400"
              >
                <Check className="opacity-0 mr-2 w-4 h-4" />
                All categories
              </CommandItem>
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
