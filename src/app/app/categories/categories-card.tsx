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

import { useCategoriesPage } from './categories.hooks'
import { EditCategoryForm } from './edit-category-form'
import { CreateCategoryForm } from './create-category-form'

export function CategoriesCard({ token }: { token: string }) {
  const { categories } = useCategoriesPage({ token })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b-[1px]">
        <CardTitle className="text-lg">Categories</CardTitle>

        <CreateCategoryForm token={token} currentQuantity={categories.length} />
      </CardHeader>

      <CardContent className="flex flex-col p-4">
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-primary-blue w-[30px] px-3">
                  #
                </TableHead>

                <TableHead className="text-primary-blue px-3">
                  Category
                </TableHead>

                <TableHead className="text-primary-blue text-right px-3">
                  Color
                </TableHead>

                <TableHead className="text-primary-blue w-[52px] text-right px-3" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id} className="py-2">
                  <TableCell className="text-slate-500 py-2 px-3">
                    {category.order + 1}
                  </TableCell>

                  <TableCell className="text-slate-500 py-2 px-3">
                    {category.category}
                  </TableCell>

                  <TableCell className="flex justify-end items-center text-slate-500 text-right text-xs py-2 px-3">
                    <div
                      className={`w-2 h-2 rounded-full mr-2`}
                      style={{ backgroundColor: category.color }}
                    />
                    {category.color}
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

                      <EditCategoryForm category={category} token={token} />
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
