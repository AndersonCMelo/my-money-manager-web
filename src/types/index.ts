export interface UsersProps {
  id: string
  name: string
  email: string
  permission?: 'admin' | 'editor' | 'reader' | null
  created_at: string
  updated_at: string
}

export interface AccountsProps {
  id: string
  openingBalance: number
  accountBalance?: number
  bankName: string
  accountLabel?: string
  type?: string
  ownerId: string
  owner?: UsersProps
  created_at: Date
  updated_at: Date
}

export interface CategoriesProps {
  id: string
  category: string
  color: string
  order: number
}

export interface EstabilishmentsProps {
  id: string
  estabilishment: string
}

export interface TransactionsProps {
  id: string
  description: string
  amount: number
  category: CategoriesProps
  categoryId?: string
  estabilishment: string
  type: 'income' | 'expense' | 'transfer'
  essencial?: boolean
  date: string
  bankAccount: AccountsProps
  bankAccountId?: string
  destinationBankAccountId?: string
  created_at: Date
  updated_at: Date
}

export interface BalanceProps {
  isEmpty: boolean
  current_balance: number
}

export interface ChartProps {
  transactions: TransactionsProps[]
  // settings: any
  settings: unknown
  categories: CategoriesProps[]
}

export interface SettingsProps {
  id: string
  currency: string
  language: string
}
