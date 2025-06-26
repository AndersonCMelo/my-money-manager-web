type LoadingSpinnerProps = {
  color?: string | null
}

export const LoadingSpinner = ({ color }: LoadingSpinnerProps) => {
  return (
    <div
      className={`w-4 h-4 border-2 ${color || 'border-white'} border-solid border-t-transparent rounded-full animate-spin`}
    ></div>
  )
}
