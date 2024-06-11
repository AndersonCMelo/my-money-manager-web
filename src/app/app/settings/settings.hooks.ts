import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { toast } from 'sonner'

import { getSettings } from '@/services/api/get-settings'
import { updateSettings } from '@/services/api/update-settings'

export const useSettingsPage = ({ token }: { token: string }) => {
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: () => getSettings({ token }),
  })

  const settingsPlaceholder = {
    id: '',
    currency: 'EUR',
    language: 'en',
  }

  return {
    settings: settings ?? settingsPlaceholder,
  }
}

const settingsForm = z.object({
  currency: z.string(),
  language: z.string(),
})

export type SettingsFormProps = z.infer<typeof settingsForm>

interface UseSettingsActionsProps {
  token: string
}

export const useSettingsActions = ({ token }: UseSettingsActionsProps) => {
  const queryClient = useQueryClient()

  const { mutateAsync: updateSettingsFn } = useMutation({
    mutationFn: updateSettings,
    onSuccess() {
      queryClient.invalidateQueries()
    },
  })

  async function handleUpdateSettings({
    id,
    data,
  }: {
    id: string
    data: SettingsFormProps
  }) {
    try {
      await updateSettingsFn({
        id,
        body: {
          currency: data.currency,
          language: data.language,
        },
        token,
      })

      toast.success('Settings updated successfully')
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
    handleUpdateSettings,
  }
}
