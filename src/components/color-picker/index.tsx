'use client'
import { useState } from 'react'
import { Button } from '../ui/button'

type MonthSelectorProps = {
  initialColor?: string
  onSelectColor: (color: string) => void
}

export function ColorPicker({
  initialColor,
  onSelectColor,
}: MonthSelectorProps) {
  const [color, setColor] = useState<string>(initialColor ?? '#fff')

  const handleChangeColor = (chosenColor: string) => {
    setColor(chosenColor)
    onSelectColor(chosenColor)
  }

  const colors: string[] = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ecd400',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#607d8b',
  ]

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="grid grid-cols-6 gap-2">
        {colors.map((item, index) => (
          <Button
            key={index}
            className="w-7 h-7 rounded-full p-0"
            style={{
              backgroundColor: item === color ? 'white' : item,
              borderWidth: 4,
              borderColor: item,
            }}
            onClick={() => handleChangeColor(item)}
          />
        ))}
      </div>
    </div>
  )
}
