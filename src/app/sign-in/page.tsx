import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { BackgroundImage } from './background-image'
import { Form } from './form'

export default async function SignIn() {
  const session = await getServerSession(authOptions)

  if (session && session.user) {
    redirect('/app/dashboard')
  }

  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <BackgroundImage />

      <div className="relative flex flex-col items-center justify-center">
        <div className="flex w-[380px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold mb-1 text-primary-green">
              Hello
            </h2>

            <p className="text-sm text-muted-foreground">
              Enter the information to access the platform.
            </p>
          </div>

          <Form />
        </div>
      </div>
    </div>
  )
}
