import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SettingsForm from './settings-form'
import { Card, CardDescription, CardHeader } from '@/components/ui/card'

export default async function Settings() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col w-full p-10">
      <h1 className="text-primary-blue font-semibold text-2xl mb-5 text-left">
        Settings
      </h1>

      <Tabs defaultValue="settings" className="w-[500px]">
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
