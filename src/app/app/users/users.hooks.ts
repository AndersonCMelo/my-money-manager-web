import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { toast } from 'sonner'

import { getUsers } from '@/services/api/get-users'
import { createUser } from '@/services/api/create-user'

export const useUsersPage = ({ token }: { token: string }) => {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers({ token }),
  })

  return {
    users: users ?? [],
  }
}

const usersForm = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6).optional(),
  permission: z.string().optional(),
})

export type UsersFormProps = z.infer<typeof usersForm>

interface UseUserActionsProps {
  token: string
}

export const useUserActions = ({ token }: UseUserActionsProps) => {
  const queryClient = useQueryClient()

  const { mutateAsync: createUserFn } = useMutation({
    mutationFn: createUser,
    onSuccess() {
      queryClient.invalidateQueries()
    },
  })

  async function handleCreateUser({ data }: { data: UsersFormProps }) {
    try {
      await createUserFn({
        body: {
          name: data.name,
          email: data.email,
          permission: data.permission,
        },
        token,
      })

      toast.success('User created successfully')
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
    handleCreateUser,
  }
}
