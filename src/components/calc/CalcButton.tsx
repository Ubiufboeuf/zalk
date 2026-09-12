import type { ComponentChildren } from 'preact'
import { Button } from '../ui/Button'
import type { UIColors } from '@/types/uiTypes'

interface Props {
  color?: UIColors
  class?: string
  children?: ComponentChildren
}

export function CalcButton ({ color, class: className = '', children }: Props) {
  function handleClick () {
    
  }
  
  return (
    <Button
      size='xl'
      shape='circle'
      color={color}
      fill={'soft'}
      class={`${className} w-auto h-auto outline-0`}
      onClick={handleClick}
    >
      {children}
    </Button>
  )
}
