/* eslint-disable no-useless-assignment */
import { Icon } from '@/components/ui/Icon'
import { IconClear, IconParen, IconPercentage, IconDivide, IconCross, IconMinus, IconPlus, IconPlusMinus, IconEquals } from '@/components/ui/Icons'
import type { CalcButtonProps } from '@/types/ui/buttonTypes'

let i = 0
export const calcButtons: CalcButtonProps[] = [
  {
    id: `${i++}`,
    value: 'clear',
    content: <Icon class='size-6'><IconClear /></Icon>,
    color: 'secondary',
    binds: ['c', 'escape']
  },
  {
    id: `${i++}`,
    value: 'paren',
    content: <Icon class='size-6'><IconParen /></Icon>,
    color: 'secondary',
    binds: ['(', ')']
  },
  {
    id: `${i++}`,
    value: '%',
    content: <Icon class='size-6'><IconPercentage /></Icon>,
    color: 'secondary'
  },
  {
    id: `${i++}`,
    value: '/',
    content: <Icon class='size-6'><IconDivide /></Icon>,
    color: 'neutral'
  },
  {
    id: `${i++}`,
    value: '7',
    content: '7',
    binds: ['7']
  },
  {
    id: `${i++}`,
    value: '8',
    content: '8',
    binds: ['8']
  },
  {
    id: `${i++}`,
    value: '9',
    content: '9',
    binds: ['9']
  },
  {
    id: `${i++}`,
    value: '*',
    content: <Icon class='size-6'><IconCross /></Icon>,
    color: 'neutral'
  },
  {
    id: `${i++}`,
    value: '4',
    content: '4',
    binds: ['4']
  },
  {
    id: `${i++}`,
    value: '5',
    content: '5',
    binds: ['5']
  },
  {
    id: `${i++}`,
    value: '6',
    content: '6',
    binds: ['6']
  },
  {
    id: `${i++}`,
    value: '-',
    content: <Icon class='size-6'><IconMinus /></Icon>,
    color: 'neutral'
  },
  {
    id: `${i++}`,
    value: '1',
    content: '1',
    binds: ['1']
  },
  {
    id: `${i++}`,
    value: '2',
    content: '2',
    binds: ['2']
  },
  {
    id: `${i++}`,
    value: '3',
    content: '3',
    binds: ['3']
  },
  {
    id: `${i++}`,
    value: '+',
    content: <Icon class='size-6'><IconPlus /></Icon>,
    color: 'neutral'
  },
  {
    id: `${i++}`,
    value: 'sign',
    content: <Icon class='size-6'><IconPlusMinus /></Icon>,
    disabled: true
  },
  {
    id: `${i++}`,
    value: '0',
    content: '0',
    binds: ['0']
  },
  {
    id: `${i++}`,
    value: '.',
    content:'.', 
    binds: ['.']
  },
  {
    id: `${i++}`,
    value: 'equals',
    content: <Icon class='size-6'><IconEquals /></Icon>,
    color: 'accent',
    binds: ['enter']
  }
]

export const keyAliases: Record<string, string> = {
  c: 'clear',
  escape: 'clear',
  enter: 'equals',
  '=': 'equals'
}
