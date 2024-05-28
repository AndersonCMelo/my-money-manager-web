import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { toast } from 'sonner'

import { getEstabilishments } from '@/services/api/get-estabilishments'

import { updateEstabilishment } from '@/services/api/update-estabilishment'
import { createEstabilishment } from '@/services/api/create-estabilishment'
import { deleteEstabilishment } from '@/services/api/delete-estabilishment'

export const useEstabilishmentsPage = ({ token }: { token: string }) => {
  const { data: estabilishments } = useQuery({
    queryKey: ['estabilishments'],
    queryFn: () => getEstabilishments({ token }),
    staleTime: Infinity,
  })

  return {
    estabilishments:
      estabilishments?.code === 'success' ? estabilishments.data : [],
  }
}

const estabilishmentsForm = z.object({
  estabilishment: z.string(),
})

export type EstabilishmentsFormProps = z.infer<typeof estabilishmentsForm>

interface UseEstabilishmentActionsProps {
  token: string
}

export const useEstabilishmentActions = ({
  token,
}: UseEstabilishmentActionsProps) => {
  const queryClient = useQueryClient()

  const { mutateAsync: updateEstabilishmentFn } = useMutation({
    mutationFn: updateEstabilishment,
    onSuccess() {
      queryClient.invalidateQueries()
    },
  })

  const { mutateAsync: createEstabilishmentFn } = useMutation({
    mutationFn: createEstabilishment,
    onSuccess() {
      queryClient.invalidateQueries()
    },
  })

  const { mutateAsync: deleteEstabilishmentFn, isPending: isDeleting } =
    useMutation({
      mutationFn: deleteEstabilishment,
      onSuccess() {
        queryClient.invalidateQueries()
      },
    })

  async function handleCreateEstabilishment(data: EstabilishmentsFormProps) {
    try {
      await createEstabilishmentFn({
        body: {
          estabilishment: data.estabilishment,
        },
        token,
      })

      toast.success('Estabilishment created successfully')
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

  async function handleUpdateEstabilishment({
    data,
    id,
  }: {
    data: EstabilishmentsFormProps
    id: string
  }) {
    try {
      await updateEstabilishmentFn({
        id,
        body: {
          estabilishment: data.estabilishment,
        },
        token,
      })

      toast.success('Estabilishment updated successfully')
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

  async function handleDeleteEstabilishment(id: string) {
    try {
      await deleteEstabilishmentFn({ id, token })

      toast.success('Estabilishment deleted successfully')
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
    handleCreateEstabilishment,
    handleUpdateEstabilishment,
    handleDeleteEstabilishment,
    isDeleting,
  }
}
