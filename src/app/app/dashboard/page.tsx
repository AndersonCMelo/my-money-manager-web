import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'

import BalanceSection from './balance-section'

import Transactions from './transactions'
import TransactionsTableFilter from './transactions-table-filters'
import { PageTitle } from '@/components/ui/page-title'
import { useEffect } from 'react'

declare global {
  interface Window {
    EuroconsumersAI: any;
  }
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  useEffect(() => {
    function loadEcaiWidget(language = 'nl') {
      const script = document.createElement("script");
      script.src = "https://nice-glacier-096cae503.2.azurestaticapps.net/ecai.widget.js";
      script.async = true;

      script.onload = () => {
        if (window.EuroconsumersAI) {
          window.EuroconsumersAI.init({ language });
        }
      };

      document.body.appendChild(script);
    }

    loadEcaiWidget('fr');
  }, [])

  return (
    <div className="flex flex-col w-full p-4 sm:p-10">
      <PageTitle title={`Welcome, ${session?.user.name}`} />

      <BalanceSection token={session?.accessToken ?? ''} />

      <TransactionsTableFilter token={session?.accessToken ?? ''} />

      <Transactions token={session?.accessToken ?? ''} />
    </div>
  )
}
