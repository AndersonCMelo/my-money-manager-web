interface FormatCurrencyProps {
  value: number
  currency: string
}

export const currencyFormatHelper = ({
  value = 0,
  currency,
}: FormatCurrencyProps) => {
  return (value / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: !currency || currency === '' ? 'USD' : currency,
  })
}
