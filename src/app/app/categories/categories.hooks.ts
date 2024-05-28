import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { toast } from 'sonner'

import { getCategories } from '@/services/api/get-categories'

import { updateCategory } from '@/services/api/update-category'
import { createCategory } from '@/services/api/create-category'
import { deleteCategory } from '@/services/api/delete-category'

export const useCategoriesPage = ({ token }: { token: string }) => {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories({ token }),
    staleTime: Infinity,
  })

  return {
    categories: categories ?? [],
  }
}

const categoriesForm = z.object({
  category: z.string(),
  color: z.string(),
})

export type CategoriesFormProps = z.infer<typeof categoriesForm>

interface UseCategoryActionsProps {
  token: string
}

export const useCategoryActions = ({ token }: UseCategoryActionsProps) => {
  const queryClient = useQueryClient()

  const { mutateAsync: updateCategoryFn } = useMutation({
    mutationFn: updateCategory,
    onSuccess() {
      queryClient.invalidateQueries()
    },
  })

  const { mutateAsync: createCategoryFn } = useMutation({
    mutationFn: createCategory,
    onSuccess() {
      queryClient.invalidateQueries()
    },
  })

  const { mutateAsync: deleteCategoryFn } = useMutation({
    mutationFn: deleteCategory,
    onSuccess() {
      queryClient.invalidateQueries()
    },
  })

  async function handleCreateCategory({
    data,
    order,
  }: {
    data: CategoriesFormProps
    order: number
  }) {
    try {
      await createCategoryFn({
        body: {
          category: data.category,
          color: data.color,
          order,
        },
        token,
      })

      toast.success('Category created successfully')
    } catch (error) {
      // @ts-ignore
      if (error.response?.data) {
        // @ts-ignore
        toast.error(error.response.data.message)
      } else {
        toast.error('Something went wrong')
      }
    }
  }

  async function handleUpdateCategory({
    data,
    id,
  }: {
    data: CategoriesFormProps
    id: string
  }) {
    try {
      await updateCategoryFn({
        id,
        body: {
          category: data.category,
          color: data.color,
        },
        token,
      })

      toast.success('Category updated successfully')
    } catch (error) {
      // @ts-ignore
      if (error.response?.data) {
        // @ts-ignore
        toast.error(error.response.data.message)
      } else {
        toast.error('Something went wrong')
      }
    }
  }

  async function handleDeleteCategory(id: string) {
    try {
      await deleteCategoryFn({ id, token })

      toast.success('Category deleted successfully')
    } catch (error) {
      // @ts-ignore
      if (error.response?.data) {
        // @ts-ignore
        toast.error(error.response.data.message)
      } else {
        toast.error('Something went wrong')
      }
    }
  }

  return {
    handleUpdateCategory,
    handleCreateCategory,
    handleDeleteCategory,
  }
}
