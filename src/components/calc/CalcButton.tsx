import { Button } from '../ui/Button'
import type { UIColors } from '@/types/uiTypes'
import { Keybinds } from '../Keybinds'
import type { ComponentChildren } from 'preact'
import { useRef, useState } from 'preact/hooks'

interface Props {
  value: string
  label?: () => ComponentChildren
  color?: UIColors
  class?: string
}

export function CalcButton ({ value, label: Label, color, class: className = '' }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isPressed, setIsPressed] = useState(false)
  
  function handleBind (e: KeyboardEvent) {
    if (e.repeat) return
    
    const button = buttonRef.current
    if (!button) return

    button.click()
    setIsPressed(true)
  }

  function handleRelease () {
    const button = buttonRef.current
    if (!button) return

    button.click()
    setIsPressed(false)
  }
  
  return (
    <Button
      uiRef={buttonRef}
      size='xl'
      shape='circle'
      color={color}
      fill={'soft'}
      class={`${className} w-auto h-auto outline-0`}
      selected={isPressed}
    >
      <Keybinds keys={value} onBind={handleBind} onRelease={handleRelease} hidden />
      {Label ? <Label /> : value}
    </Button>
  )
}
