// type CategoriesListProps = typeof categoriesList
// type TransactionProps = (typeof transactions)[0]

export const completeEstabilishment = (estabilishment: string) => {
  if (estabilishment.includes('UBER')) {
    return 'Uber'
  }

  if (estabilishment.includes('BAZAR ECONOMICO')) {
    return 'BAZAR ECONOMICO'
  }

  if (estabilishment.includes('MOUSUMI RAHMAN')) {
    return 'MOUSUMI RAHMAN'
  }

  if (estabilishment.includes('PINGO DOCE')) {
    return 'Pingo Doce'
  }

  if (estabilishment.includes('MA MORAIS SOARES')) {
    return 'Auchan'
  }

  if (estabilishment.includes('FAHAD FARHAT')) {
    return 'FAHAD FARHAT'
  }

  if (estabilishment.includes('CELEIRO')) {
    return 'CELEIRO'
  }

  return estabilishment
}
