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
import { LoadingSpinner } from '@/components/ui/loading-spinner'

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

  /* async function handleSignIn(data: SignInFormProps) {
    console.log('handleSignIn')

    const SHEET_ID = '1JrLQc-5FztVIGU3aAGOuiUusGfamJXxTdrq_1QhZXdg' // Pegue da URL da planilha
    const API_KEY = 'AIzaSyDU-2Dz8sUkgC4Nodg7ezRvYNLMQOSmfHw' // Chave gerada no Google Cloud
    const RANGE = 'A1:E10' // Ajuste conforme necessário
    const SHEET_NAME = 'Page1'
    const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data)
        if (data.values) {
          console.log('data.values', data.values)

          // setDados(data.values)
        }
      })
      .catch((error) => console.error('Erro ao buscar dados:', error))
  } */

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

        <div className="flex w-full max-w-sm items-center sm:space-x-2">
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
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <LoadingSpinner />
            Sending
          </div>
        ) : (
          'Login'
        )}
      </Button>
    </form>
  )
}
