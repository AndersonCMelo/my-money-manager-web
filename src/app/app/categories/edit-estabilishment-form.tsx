'use client'
import { useForm } from 'react-hook-form'
import { Send, Trash2 } from 'lucide-react'

import {
  DropdownMenuContent,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { EstabilishmentsProps } from '@/types'

import {
  useEstabilishmentActions,
  EstabilishmentsFormProps,
} from './estabilishments.hooks'

interface EditEstabilishmentFormProps {
  estabilishment: EstabilishmentsProps
  token: string
}

export function EditEstabilishmentForm({
  estabilishment,
  token,
}: EditEstabilishmentFormProps) {
  const { handleUpdateEstabilishment, handleDeleteEstabilishment, isDeleting } =
    useEstabilishmentActions({ token })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EstabilishmentsFormProps>()

  async function handleEditEstabilishment(data: EstabilishmentsFormProps) {
    await handleUpdateEstabilishment({ data, id: estabilishment.id })
  }

  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Edit estabilishment</DropdownMenuLabel>

      <form
        onSubmit={handleSubmit(handleEditEstabilishment)}
        className="space-y-4"
      >
        <div className="grid gap-4 p-3 max-w-72">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="estabilishment" className="col-span-1">
              Name
            </Label>
            <Input
              id="estabilishment"
              defaultValue={estabilishment.estabilishment}
              className="col-span-3 h-8"
              {...register('estabilishment', { required: true })}
            />
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
              disabled={isDeleting}
              onClick={() => handleDeleteEstabilishment(estabilishment.id)}
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
