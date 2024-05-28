'use client'
import { Wallet } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { currencyFormatHelper } from '@/utils/currency-format-helpers'

import { useAccountsPage, useAccountsActions } from './accounts.hooks'
import AccountsForm from './accounts-form'

export default function AccountsCards({ token }: { token: string }) {
  const { accounts, settings, users } = useAccountsPage({ token })
  const { handleDeleteAccount } = useAccountsActions({
    token,
  })

  return (
    <div className="grid grid-cols-3 gap-5">
      <Card className="border-dashed hover:border-primary-blue">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="py-8 flex flex-col items-center justify-center h-full w-full bg-transparent hover:bg-transparent hover:opacity-80">
              <Wallet className="text-primary-blue mb-1 w-5 h-5" />
              <span className="text-primary-blue font-semibold">
                Add new account
              </span>
            </Button>
          </DialogTrigger>

          <AccountsForm token={token} users={users} isEditing={false} />
        </Dialog>
      </Card>

      {accounts.map((account) => (
        <Card key={account.id}>
          <CardHeader className="px-5 pt-5 pb-4 flex items-baseline">
            <CardDescription className="text-slate-500 font-semibold mb-4">
              {account.accountLabel}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-5 pb-3">
            <div className="flex items-baseline">
              <span className="text-primary-blue font-semibold text-[22px]">
                {currencyFormatHelper({
                  currency: settings.currency,
                  value: account.accountBalance!,
                })}
              </span>
              <p className="text-slate-400 text-xs ml-2">Balance</p>
            </div>
            <p className="text-xs mt-2 text-slate-400">{account.owner?.name}</p>
          </CardContent>

          <Separator />

          <CardFooter className="flex items-center gap-4 px-5 py-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" className="px-3 h-8">
                  Edit
                </Button>
              </DialogTrigger>

              <AccountsForm
                token={token}
                users={users}
                isEditing
                account={account}
              />
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="border-primary-red text-primary-red px-3 h-8 hover:bg-primary-red hover:text-white"
                >
                  Delete
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-primary-red hover:bg-primary-red/90"
                    onClick={() => handleDeleteAccount(account.id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
