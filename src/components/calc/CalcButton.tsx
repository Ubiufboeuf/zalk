import { Button } from '../ui/Button'
import type { UIColors } from '@/types/uiTypes'
import { Keybinds } from '../Keybinds'
import type { ComponentChildren } from 'preact'
import { useRef, useState } from 'preact/hooks'
import { useCalcStore } from '@/stores/useCalcStore'
import { isSymbolNotParen } from '@/calc'

interface Props {
  value: string
  label?: () => ComponentChildren
  binds?: string[]
  color?: UIColors
  class?: string
}

export function CalcButton ({ value, label: Label, color, binds, class: className = '' }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const releasingRef = useRef(false)

  const [isPressed, setIsPressed] = useState(false)
  const operation = useCalcStore((state) => state.operation)
  const setOperation = useCalcStore((state) => state.setOperation)
  
  function handleBind (e: KeyboardEvent) {
    if (e.repeat) return
    
    const button = buttonRef.current
    if (!button) return

    try {
      button.click()
    } catch {/* empty */}
    setIsPressed(true)
  }

  function handleRelease () {
    const button = buttonRef.current
    if (!button) return

    releasingRef.current = true
    try {
      button.click()
    } catch {/* empty */}
    releasingRef.current = false
    setIsPressed(false)
  }

  function handleClick () {
    if (releasingRef.current) return

    if (!operation) {
      setOperation(value)
      return
    }
    
    const cursor = operation.length

    const valueLeftPart = operation.slice(0, cursor)
    const valueRightPart = operation.slice(cursor)

    if (isSymbolNotParen(value) && isSymbolNotParen(valueLeftPart.at(-1))) {
      console.warn('No se pueden usar dos símbolos seguidos sin paréntesis o números en medio')
      return
    }

    const newValue = `${valueLeftPart}${value}${valueRightPart}`

    setOperation(newValue)
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
      onClick={handleClick}
    >
      { binds
        ? binds.map((b, i) => <Keybinds key={`${i}-bind-${b}`} keys={b} onBind={handleBind} onRelease={handleRelease} relax='any-special' hidden />)
        : <Keybinds keys={value} onBind={handleBind} onRelease={handleRelease} relax='any-special' hidden />
      }
      {Label ? <Label /> : value}
    </Button>
  )
}
