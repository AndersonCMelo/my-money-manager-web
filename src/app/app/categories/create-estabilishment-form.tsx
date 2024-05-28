'use client'
import { useForm } from 'react-hook-form'
import { Send } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
  useEstabilishmentActions,
  EstabilishmentsFormProps,
} from './estabilishments.hooks'

interface CreateEstabilishmentFormProps {
  token: string
}

export function CreateEstabilishmentForm({
  token,
}: CreateEstabilishmentFormProps) {
  const { handleCreateEstabilishment } = useEstabilishmentActions({
    token,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EstabilishmentsFormProps>()

  async function onSubmit(data: EstabilishmentsFormProps) {
    await handleCreateEstabilishment(data)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Create estabilishment</Button>
      </PopoverTrigger>

      <PopoverContent align="end">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="estabilishment">Name</Label>
              <Input
                id="estabilishment"
                className="col-span-3 h-8"
                {...register('estabilishment', { required: true })}
              />
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
