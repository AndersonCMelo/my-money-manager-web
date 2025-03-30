import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import { BackgroundImage } from './background-image'
import { Form } from './form'

export default async function SignIn() {
  const session = await getServerSession(authOptions)

  if (session && session.user) {
    redirect('/app/dashboard')
  }

  return (
    <div className="sm:grid sm:grid-cols-2 min-h-screen antialiased flex flex-col">
      <BackgroundImage />

      <div className="relative flex flex-col items-center justify-center bg-white sm:rounded-none rounded-3xl sm:mt-0 -mt-5">
        <div className="flex md:max-w-[380px] max-w-[90vw] w-full flex-col justify-center gap-6 sm:mt-0 mt-4 sm:p-0 p-2">
          <div className="flex flex-col sm:gap-2 gap-0">
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
