'use client'
import { Controller, useForm } from 'react-hook-form'
import { Send } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

import {
  useSettingsPage,
  SettingsFormProps,
  useSettingsActions,
} from './settings.hooks'

export default function SettingsForm({ token }: { token: string }) {
  const { settings } = useSettingsPage({ token })
  const { handleUpdateSettings } = useSettingsActions({ token })

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<SettingsFormProps>()

  async function onSubmit(data: SettingsFormProps) {
    await handleUpdateSettings({ id: settings.id, data })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-1">Preferences</CardTitle>
        <CardDescription>
          Make changes to your platform settings. Click save when you are done.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="currency">Currency</Label>

            <Controller
              name="currency"
              control={control}
              rules={{ required: true }}
              defaultValue={settings ? settings.currency : undefined}
              render={({ field: { name, onChange, value, disabled } }) => {
                return (
                  <Select
                    name={name}
                    onValueChange={onChange}
                    value={value}
                    disabled={disabled}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">Euro</SelectItem>
                      <SelectItem value="BRL">Brazilian Real</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                )
              }}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="language">Language</Label>

            <Controller
              name="language"
              control={control}
              rules={{ required: true }}
              defaultValue={settings ? settings.language : undefined}
              render={({ field: { name, onChange, value, disabled } }) => {
                return (
                  <Select
                    name={name}
                    onValueChange={onChange}
                    value={value}
                    disabled={disabled}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      {/* <SelectItem value="pt">Portuguese</SelectItem> */}
                    </SelectContent>
                  </Select>
                )
              }}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
