/* eslint-disable no-useless-assignment */
import { CalcButton } from './CalcButton'
import type { UIColors } from '@/types/uiTypes'
import type { ComponentChildren } from 'preact'
import { Icon } from '../ui/Icon'
import { IconCross, IconDivide, IconEquals, IconMinus, IconParen, IconPercentage, IconPlus, IconPlusMinus } from '../ui/Icons'

interface Button {
  id: string
  value: string
  binds?: string[]
  label?: () => ComponentChildren
  color?: UIColors
  disabled?: boolean
}

let i = 0
const buttons: Button[] = [
  { id: `${i++}`, value: 'clear', binds: ['c'], label: () => 'C', color: 'secondary' },
  { id: `${i++}`, value: 'paren', binds: ['(', ')'], label: () => <Icon class='size-6'><IconParen /></Icon>, color: 'secondary' },
  { id: `${i++}`, value: '%', label: () => <Icon class='size-6'><IconPercentage /></Icon>, color: 'secondary' },
  { id: `${i++}`, value: '/', label: () => <Icon class='size-6'><IconDivide /></Icon>, color: 'neutral' },
  { id: `${i++}`, value: '7' },
  { id: `${i++}`, value: '8' },
  { id: `${i++}`, value: '9' },
  { id: `${i++}`, value: '*', label: () => <Icon class='size-6'><IconCross /></Icon>, color: 'neutral' },
  { id: `${i++}`, value: '4' },
  { id: `${i++}`, value: '5' },
  { id: `${i++}`, value: '6' },
  { id: `${i++}`, value: '-', label: () => <Icon class='size-6'><IconMinus /></Icon>, color: 'neutral' },
  { id: `${i++}`, value: '1' },
  { id: `${i++}`, value: '2' },
  { id: `${i++}`, value: '3' },
  { id: `${i++}`, value: '+', label: () => <Icon class='size-6'><IconPlus /></Icon>, color: 'neutral' },
  { id: `${i++}`, value: 'sign', label: () => <Icon class='size-6'><IconPlusMinus /></Icon>, disabled: true },
  { id: `${i++}`, value: '0' },
  { id: `${i++}`, value: '.' },
  { id: `${i++}`, value: '=', binds: ['enter'], label: () => <Icon class='size-6'><IconEquals /></Icon>, color: 'accent' }
]

export function CalcButtons () {
  return (
    <div class='h-fit w-full p-4 pb-6'>
      <div class='h-full w-full grid grid-cols-4 grid-rows-5 gap-3 gap-y-2'>
        { buttons.map(({ id, color, value, label, binds, disabled }) => (
          <CalcButton
            key={id}
            class='w-full aspect-square outline outline-white/50'
            color={color}
            value={value}
            label={label}
            binds={binds}

            size='xl'
            shape='circle'
            fill='soft'

            disabled={disabled}
          />
        )) }
      </div>
    </div>
  )
}
