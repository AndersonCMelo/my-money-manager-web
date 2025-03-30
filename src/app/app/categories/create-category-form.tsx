'use client'
import { useForm } from 'react-hook-form'
import { Palette, Send } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useCategoryActions, CategoriesFormProps } from './categories.hooks'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ColorPicker } from '@/components/color-picker'

interface CreateCategoryFormProps {
  token: string
  currentQuantity: number
}

export function CreateCategoryForm({
  token,
  currentQuantity,
}: CreateCategoryFormProps) {
  const { handleCreateCategory } = useCategoryActions({
    token,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<CategoriesFormProps>()

  async function onSubmit(data: CategoriesFormProps) {
    await handleCreateCategory({ data, order: currentQuantity })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <span>Create</span>
          <span className="hidden sm:block ml-1">category</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category">Name</Label>
              <Input
                id="category"
                className="col-span-3 h-8"
                {...register('category', { required: true })}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color">Color</Label>

              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="color"
                  className="col-span-3 h-8"
                  {...register('color', { required: true })}
                />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-10 h-8 p-0">
                      <Palette className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="p-2 flex items-center justify-center sm:max-w-[240px]">
                    <ColorPicker
                      onSelectColor={(color) => setValue('color', color)}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-primary-button hover:bg-primary-button/90"
                disabled={isSubmitting}
              >
                <Send className="w-4 h-4 mr-2" />
                Create
              </Button>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
