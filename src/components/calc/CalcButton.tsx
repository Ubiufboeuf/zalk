import { Button } from '../ui/Button'
import type { UIColors } from '@/types/uiTypes'
import { Keybinds } from '../Keybinds'
import type { ComponentChildren } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { miniStore, useCalcStore } from '@/stores/useCalcStore'
import { calc, isSymbolNotParen } from '@/calc'
import type { ButtonProps } from '@/types/ui/buttonTypes'

interface Props extends Omit<ButtonProps, 'label'> {
  value: string
  label?: () => ComponentChildren
  binds?: string[]
  color?: UIColors
  class?: string
}

export function CalcButton ({
  value, label: Label, color, binds, class: className = '',
  size, shape, fill
}: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const releasingRef = useRef(false)
  const parenOpenRef = useRef(false)

  const [isPressed, setIsPressed] = useState(false)
  const operation = useCalcStore((state) => state.operation)
  const setOperation = useCalcStore((state) => state.setOperation)
  const setResult = useCalcStore((state) => state.setResult)
  const cursorIndex = useCalcStore((state) => state.cursorIndex)
  const setCursorIndex = useCalcStore((state) => state.setCursorIndex)
  
  function handleBind (e: KeyboardEvent) {
    if (e.key.toLowerCase() !== 'backspace' && e.repeat) return
    
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
      if (!isNaN(Number(value)) || value === '.') setOperation(value)
      else setOperation('')
      return
    }

    const cursor = cursorIndex

    const valueLeftPart = operation.slice(0, cursor)
    const valueRightPart = operation.slice(cursor)

    if (value === '=') {
      const result = calc(operation)
      if (isNaN(Number(result))) return
      
      miniStore.canChangeResult = false
      setOperation(result)
      setCursorIndex(result.length)
      return
    }
    
    if (value === 'backspace') {
      const valueLeftPart = operation.slice(0, cursor - 1)
      const newValue = `${valueLeftPart}${valueRightPart}`
      setOperation(newValue)
      
      return
    }
    
    if (value === 'paren') {
      const parenOpen = parenOpenRef.current
      const parenChar = parenOpen ? ')' : '('
      
      const newValue = `${valueLeftPart}${parenChar}${valueRightPart}`
      
      setOperation(newValue)
      setCursorIndex(cursor + 1)
      parenOpenRef.current = !parenOpen
      return
    }
    if (isSymbolNotParen(value) && isSymbolNotParen(valueLeftPart.at(-1))) {
      console.warn('No se pueden usar dos símbolos seguidos sin paréntesis o números en medio')
      return
    }

    const newValue = `${valueLeftPart}${value}${valueRightPart}`

    setOperation(newValue)
    setCursorIndex(cursor + 1)
  }

  useEffect(() => {
    if (!miniStore.canChangeResult) {
      setResult('')
      miniStore.canChangeResult = true
    }
  }, [operation])
  
  return (
    <Button
      uiRef={buttonRef}
      size={size}
      shape={shape}
      color={color}
      fill={fill}
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
