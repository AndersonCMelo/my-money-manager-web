'use client'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useEstabilishmentsPage } from './estabilishments.hooks'
import { EditEstabilishmentForm } from './edit-estabilishment-form'
import { CreateEstabilishmentForm } from './create-estabilishment-form'

export function EstabilishmentsCard({ token }: { token: string }) {
  const { estabilishments } = useEstabilishmentsPage({ token })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b-[1px]">
        <CardTitle className="text-lg">Estabilishments</CardTitle>

        <CreateEstabilishmentForm token={token} />
      </CardHeader>

      <CardContent className="flex flex-col p-4">
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-primary-blue px-3">
                  Estabilishment
                </TableHead>

                <TableHead className="text-primary-blue w-[52px] text-right px-3" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {estabilishments.map((estabilishment) => (
                <TableRow key={estabilishment.id} className="py-2">
                  <TableCell className="text-slate-500 py-2 px-3">
                    {estabilishment.estabilishment}
                  </TableCell>

                  <TableCell className="text-slate-500 text-right py-2 px-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-7 w-7 p-0 rounded-full hover:opacity-80"
                        >
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>

                      <EditEstabilishmentForm
                        estabilishment={estabilishment}
                        token={token}
                      />
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {/* {estabilishments.map((estabilishment) => (
                <Badge
                  key={estabilishment.id}
                  color={estabilishment.color}
                  className="ml-1 mb-1 py-1"
                >
                  {estabilishment.estabilishment}
                </Badge>
              ))} */}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
