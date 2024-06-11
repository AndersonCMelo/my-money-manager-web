import { categoriesList } from './auto-complete-transactions/categories-list'

const transactions = [
  {
    data_de_lancamento: '2024-03-11',
    data_de_registro: '2024-03-11',
    descricao: 'COMPRA 4762 BAZAR ECONOMICO LISBOA',
    valor: 29.95,
    saldo: 138.43,
  },
  {
    data_de_lancamento: '2024-03-11',
    data_de_registro: '2024-03-09',
    descricao: 'TRF MB WAY DE MARIA FERREIRA',
    valor: 400.0,
    saldo: 538.43,
  },
  {
    data_de_lancamento: '2024-03-11',
    data_de_registro: '2024-03-11',
    descricao: 'COMPRA 4762 METRO ARROIOS LISBOA CONTACTLESS',
    valor: 10.0,
    saldo: 528.43,
  },
  {
    data_de_lancamento: '2024-03-11',
    data_de_registro: '2024-03-11',
    descricao: 'COMPRA 4762 METRO ARROIOS LISBOA CONTACTLESS',
    valor: 10.5,
    saldo: 517.93,
  },
  {
    data_de_lancamento: '2024-03-11',
    data_de_registro: '2024-03-11',
    descricao: 'COMPRA 4762 TABERNA LONDRINA GUIMAR CONTACTLESS',
    valor: 28.15,
    saldo: 489.78,
  },
  {
    data_de_lancamento: '2024-03-11',
    data_de_registro: '2024-03-11',
    descricao: 'COMPRA 4762 CONTINENTE BOM DIA LISB CONTACTLESS',
    valor: 6.24,
    saldo: 483.54,
  },
  {
    data_de_lancamento: '2024-03-11',
    data_de_registro: '2024-03-11',
    descricao: 'PAG SERV 21056/564436003 INSTITUTO GESTAO FINAN',
    valor: 20.0,
    saldo: 463.54,
  },
  {
    data_de_lancamento: '2024-03-11',
    data_de_registro: '2024-03-11',
    descricao: 'COMPRA 4762 METRO ARROIOS LISBOA CONTACTLESS',
    valor: 3.5,
    saldo: 460.04,
  },
  {
    data_de_lancamento: '2024-03-11',
    data_de_registro: '2024-03-11',
    descricao: 'COMPRA 4762 TELHEIRAS LISBOA CONTACTLESS',
    valor: 3.0,
    saldo: 457.04,
  },
  {
    data_de_lancamento: '2024-03-11',
    data_de_registro: '2024-03-11',
    descricao: 'COMPRA 4762 PINGO DOCE LISBOA CONTACTLESS',
    valor: 12.34,
    saldo: 444.7,
  },
  {
    data_de_lancamento: '2024-03-12',
    data_de_registro: '2024-03-12',
    descricao: 'COMPRA 4762 TUZ PRC DO CHILE LISBOA',
    valor: 9.4,
    saldo: 435.3,
  },
  {
    data_de_lancamento: '2024-03-13',
    data_de_registro: '2024-03-13',
    descricao: 'COMPRA 4762 PlayStation Network Hilversum NL',
    valor: 13.99,
    saldo: 421.31,
  },
  {
    data_de_lancamento: '2024-03-13',
    data_de_registro: '2024-03-13',
    descricao: 'LEV ATM 4762 BCP Sintra Cp-Sintra',
    valor: 20.0,
    saldo: 401.31,
  },
  {
    data_de_lancamento: '2024-03-13',
    data_de_registro: '2024-03-13',
    descricao: 'COMPRA 4762 PARQUES DE SINTRA 2710- CONTACTLESS',
    valor: 36.0,
    saldo: 365.31,
  },
  {
    data_de_lancamento: '2024-03-15',
    data_de_registro: '2024-03-15',
    descricao: 'TRF DE Resto ferias',
    valor: 300.0,
    saldo: 665.31,
  },
  {
    data_de_lancamento: '2024-03-18',
    data_de_registro: '2024-03-18',
    descricao: 'COMPRA 4762 MA MORAIS SOARES LISBOA CONTACTLESS',
    valor: 9.98,
    saldo: 655.33,
  },
  {
    data_de_lancamento: '2024-03-18',
    data_de_registro: '2024-03-17',
    descricao: 'TRF MB WAY DE JUAREZ JUNIOR',
    valor: 3.0,
    saldo: 658.33,
  },
  {
    data_de_lancamento: '2024-03-18',
    data_de_registro: '2024-03-18',
    descricao: 'COMPRA 4762 PINGO DOCE LISBOA CONTACTLESS',
    valor: 2.94,
    saldo: 655.39,
  },
  {
    data_de_lancamento: '2024-03-18',
    data_de_registro: '2024-03-18',
    descricao: 'COMPRA 4762 BAZAR ECONOMICO LISBOA',
    valor: 7.95,
    saldo: 647.44,
  },
  {
    data_de_lancamento: '2024-03-18',
    data_de_registro: '2024-03-18',
    descricao: 'PAG SERV 20811/561734440 EMPRESA PORTUGUESA DAS',
    valor: 17.39,
    saldo: 630.05,
  },
  {
    data_de_lancamento: '2024-03-18',
    data_de_registro: '2024-03-18',
    descricao: 'COMPRA 4762 FARMACIA VITALIS LISBOA CONTACTLESS',
    valor: 6.35,
    saldo: 623.7,
  },
  {
    data_de_lancamento: '2024-03-20',
    data_de_registro: '2024-03-20',
    descricao: 'COMPRA 4762 PINGO DOCE LISBOA CONTACTLESS',
    valor: 48.98,
    saldo: 574.72,
  },
  {
    data_de_lancamento: '2024-03-21',
    data_de_registro: '2024-03-21',
    descricao: 'COMPRA 4762 Europcar LISC05 Lisboa Lisboa PT',
    valor: 107.08,
    saldo: 467.64,
  },
  {
    data_de_lancamento: '2024-03-21',
    data_de_registro: '2024-03-21',
    descricao: 'COMPRA 4762 MBWAY - FATURAS 1600-404 LISBOA',
    valor: 50.78,
    saldo: 416.86,
  },
  {
    data_de_lancamento: '2024-03-21',
    data_de_registro: '2024-03-21',
    descricao: 'TRF P/ Resto ferias',
    valor: 300.0,
    saldo: 116.86,
  },
  {
    data_de_lancamento: '2024-03-21',
    data_de_registro: '2024-03-21',
    descricao: 'COMPRA 4762 MBWAY - RECARGAS 1600-404 LISBOA',
    valor: 10.0,
    saldo: 106.86,
  },
  {
    data_de_lancamento: '2024-03-25',
    data_de_registro: '2024-03-25',
    descricao: 'COMPRA 4762 PINGO DOCE LISBOA CONTACTLESS',
    valor: 10.94,
    saldo: 95.92,
  },
  {
    data_de_lancamento: '2024-03-25',
    data_de_registro: '2024-03-25',
    descricao: 'COMPRA 4762 TULIPA LISBOA',
    valor: 25.45,
    saldo: 70.47,
  },
  {
    data_de_lancamento: '2024-03-25',
    data_de_registro: '2024-03-24',
    descricao: 'TRF MB WAY DE MARIA FERREIRA',
    valor: 30.0,
    saldo: 100.47,
  },
  {
    data_de_lancamento: '2024-03-25',
    data_de_registro: '2024-03-25',
    descricao: 'COMPRA 4762 PINGO DOCE LISBOA CONTACTLESS',
    valor: 34.44,
    saldo: 66.03,
  },
  {
    data_de_lancamento: '2024-03-25',
    data_de_registro: '2024-03-24',
    descricao: 'TRF. P/O Anderson Cordeiro de Melo',
    valor: 72.03,
    saldo: 138.06,
  },
  {
    data_de_lancamento: '2024-03-25',
    data_de_registro: '2024-03-25',
    descricao: 'TRF MB WAY P/ *****3600',
    valor: 50.0,
    saldo: 88.06,
  },
  {
    data_de_lancamento: '2024-03-25',
    data_de_registro: '2024-03-25',
    descricao: 'COMPRA 4762 LITTLE CEASARS PIZZALIS CONTACTLESS',
    valor: 5.5,
    saldo: 82.56,
  },
  {
    data_de_lancamento: '2024-03-27',
    data_de_registro: '2024-03-27',
    descricao: 'COMPRA 4762 NETFLIX INTERNATIONAL B.VAmsterdam',
    valor: 7.99,
    saldo: 74.57,
  },
  {
    data_de_lancamento: '2024-03-27',
    data_de_registro: '2024-03-27',
    descricao: 'TRANSFERENCIA - VENCIMENTO',
    valor: 2140.22,
    saldo: 2214.79,
  },
  {
    data_de_lancamento: '2024-03-28',
    data_de_registro: '2024-03-28',
    descricao: 'COMPRA 4762 PLAYSTATIONNETWORK HILVERSUM NL',
    valor: 15.99,
    saldo: 2198.8,
  },
]

type CategoriesListProps = typeof categoriesList
type TransactionProps = (typeof transactions)[0]

const categorizeTransaction = (
  transaction: TransactionProps,
  categories: CategoriesListProps,
) => {
  for (const [categoryName, category] of Object.entries(categories)) {
    for (const keyWord of category.keyWords) {
      if (transaction.descricao.toUpperCase().includes(keyWord.toUpperCase())) {
        return { categoryId: category.id, categoryName }
      }
    }
  }
  return { categoryId: null, categoryName: null }
}

export const categorizedTransactions = transactions.map((transaction) => {
  const category = categorizeTransaction(transaction, categoriesList)
  return {
    ...transaction,
    ...category,
  }
})
