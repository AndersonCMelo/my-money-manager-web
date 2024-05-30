interface CompleteTransactionFormProps {
  description: string
}

export function completeTransactionFormHelper({
  description,
}: CompleteTransactionFormProps) {
  const grocery: string[] = ['feira', 'frutas', 'ovos', 'carnes']
  const transporte: string[] = ['cartão', 'metro', 'transporte', 'passe']
  const comunication: string[] = ['internet', 'chip', 'celular', 'plano']
  const entertainment: string[] = ['netflix', 'prime', 'pns', 'cinema', 'jogo']

  const splitedDescription = description.split(' ')

  const isGrocery = splitedDescription.some((word) =>
    grocery.includes(word.toLowerCase()),
  )

  if (isGrocery) {
    return { category: '2c646d70-a10b-461d-9723-fed16445d74e' }
  }

  const isTransport = splitedDescription.some((word) =>
    transporte.includes(word.toLowerCase()),
  )

  if (isTransport) {
    return { category: '58ed0e11-9f78-4e9e-b8c8-7629e0be35b0' }
  }

  const isComunication = splitedDescription.some((word) =>
    comunication.includes(word.toLowerCase()),
  )

  if (isComunication) {
    return { category: '5bf7f992-2612-4bf7-9a23-be03682dc0d8' }
  }

  const isEntertainment = splitedDescription.some((word) =>
    entertainment.includes(word.toLowerCase()),
  )

  if (isEntertainment) {
    return { category: '9dde3700-94c1-4d7c-96fe-d85f6a126dbc' }
  }

  return null
}
