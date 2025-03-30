import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SettingsForm from './settings-form'
import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import { PageTitle } from '@/components/ui/page-title'

export default async function Settings() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col w-full p-4 sm:p-10">
      <PageTitle title="Settings" />

      <Tabs defaultValue="settings" className="w-auto sm:w-[500px]">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="settings">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <SettingsForm token={session?.accessToken ?? ''} />
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardDescription>Action not available yet.</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
