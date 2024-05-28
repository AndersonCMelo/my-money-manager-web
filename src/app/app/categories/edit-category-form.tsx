'use client'
import { useForm } from 'react-hook-form'
import { Palette, Send, Trash2 } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { ColorPicker } from '@/components/color-picker'

import { CategoriesProps } from '@/types'

import { useCategoryActions, CategoriesFormProps } from './categories.hooks'

interface EditCategoryFormProps {
  category: CategoriesProps
  token: string
}

export function EditCategoryForm({ category, token }: EditCategoryFormProps) {
  const { handleUpdateCategory, handleDeleteCategory } = useCategoryActions({
    token,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<CategoriesFormProps>()

  async function onSubmit(data: CategoriesFormProps) {
    await handleUpdateCategory({ data, id: category.id })
  }

  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Edit category</DropdownMenuLabel>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 p-3 max-w-72">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="col-span-1">
              Name
            </Label>
            <Input
              id="category"
              defaultValue={category.category}
              className="col-span-3 h-8"
              {...register('category', { required: true })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color">Color</Label>

            <div className="col-span-3 flex items-center gap-2">
              <Input
                id="color"
                defaultValue={category.color}
                className="h-8"
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
                    initialColor={category.color}
                    onSelectColor={(color) => setValue('color', color)}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="submit"
              className="bg-primary-button hover:bg-primary-button/90"
              disabled={isSubmitting}
            >
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={() => handleDeleteCategory(category.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </form>
    </DropdownMenuContent>
  )
}
