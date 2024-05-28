'use client'
import { useForm, Controller } from 'react-hook-form'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useUserActions, UsersFormProps } from './users.hooks'

interface ComponentProps {
  token: string
}

export function CreateUserForm({ token }: ComponentProps) {
  const { handleCreateUser } = useUserActions({
    token,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<UsersFormProps>()

  async function onSubmit(data: UsersFormProps) {
    await handleCreateUser({ data })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Create user</Button>
      </PopoverTrigger>

      <PopoverContent align="end">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid grid-cols-6 items-center gap-4">
              <Label className="col-span-2" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-4 h-8"
                {...register('name', { required: true })}
              />
            </div>

            <div className="grid grid-cols-6 items-center gap-4">
              <Label className="col-span-2" htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                className="col-span-4 h-8"
                {...register('email', { required: true })}
              />
            </div>

            <div className="grid grid-cols-6 items-center gap-4">
              <Label className="col-span-2" htmlFor="permission">
                Permission
              </Label>

              <Controller
                name="permission"
                control={control}
                rules={{ required: true }}
                render={({ field: { name, onChange, value, disabled } }) => {
                  return (
                    <Select
                      name={name}
                      onValueChange={onChange}
                      value={value}
                      disabled={disabled}
                    >
                      <SelectTrigger className="col-span-4 h-8">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="reader">Reader</SelectItem>
                      </SelectContent>
                    </Select>
                  )
                }}
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
