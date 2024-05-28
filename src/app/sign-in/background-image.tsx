import Image from 'next/image'

import logoImg from '@/assets/images/logo_white.svg'

export function BackgroundImage() {
  return (
    <div className="flex h-full flex-col justify-center border-r border-foreground/5 p-20 bg-auth-background bg-cover bg-center">
      <div className="flex flex-col gap-10 text-lg font-medium text-foreground">
        <div className="w-2/6">
          <Image src={logoImg} alt="My Money Manager" />
        </div>

        <div>
          <h1 className="font-bold text-8xl mb-6 text-white text-shadow-lg">
            Manage finances easily
          </h1>
          <p className="text-lg text-white text-shadow-md">
            Manage incomes and expenses easily and simply.
          </p>
        </div>
      </div>
    </div>
  )
}
