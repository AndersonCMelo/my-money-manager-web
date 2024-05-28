'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { login } from '@/services/api/login'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SignInFormProps = z.infer<typeof signInForm>

export function Form() {
  const searchParams = useSearchParams()

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormProps>()

  async function handleSignIn(data: SignInFormProps) {
    const response = await login({
      body: {
        email: data.email,
        password: data.password,
      },
    })

    if (response.code === 'error') {
      if (response.error.response?.data) {
        // @ts-ignore
        toast.error(response.error.response.data.message)
      } else {
        toast.error('Something went wrong')
      }
    } else {
      await signIn('credentials', {
        id: response.data.user.id,
        email: response.data.user.email,
        name: response.data.user.name,
        permission: response.data.user.permission,
        token: response.data.token,
        callbackUrl: searchParams.get('callbackUrl') ?? '/app/dashboard',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>

        <Input
          id="email"
          type="email"
          placeholder="E-mail"
          {...register('email', { required: true })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Password</Label>

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            id="password"
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            {...register('password', { required: true })}
          />
          <Button
            variant="ghost"
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {!passwordVisible ? <Eye /> : <EyeOff />}
          </Button>
        </div>
      </div>

      <Button
        disabled={isSubmitting}
        className="w-full bg-primary-button hover:bg-secondary-button"
        type="submit"
      >
        Login
      </Button>
    </form>
  )
}
