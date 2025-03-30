type PageTitleProps = {
  title: string
}

export const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <h1 className="text-primary-blue font-semibold text-2xl mb-4 sm:mb-5 text-left">
      {title}
    </h1>
  )
}
