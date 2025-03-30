import Image from 'next/image'

import logoImg from '@/assets/images/logo_white.svg'

export function BackgroundImage() {
  return (
    <div className="flex sm:h-full flex-col justify-center sm:border-r border-foreground/5 sm:p-20 py-6 px-[5vw] pb-10 bg-auth-background bg-cover bg-center">
      <div className="flex flex-col sm:gap-10 gap-2 text-lg font-medium text-foreground">
        <div className="w-2/6">
          <Image src={logoImg} alt="My Money Manager" />
        </div>

        <div>
          <h1 className="font-bold sm:text-8xl text-3xl sm:mb-6 mb-1 text-white text-shadow-lg">
            Manage finances easily
          </h1>
          <p className="sm:text-lg text-sm text-white text-shadow-md">
            Manage incomes and expenses easily and simply.
          </p>
        </div>
      </div>
    </div>
  )
}
