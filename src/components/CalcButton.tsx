import type { CalcButtonProps } from '@/types/ui/buttonTypes'
import { Button } from './ui/Button'
import { useEffect, useState } from 'preact/hooks'
import { handleCalcButtonClick } from '@/lib/handlers'

export function CalcButton ({ id, color, value, content, disabled, binds }: CalcButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  useEffect(() => {
    if (disabled) return

    const keys = binds ?? [value]
    const pressedKeys = new Set<string>()

    function handleKeyDown (event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey) return

      const key = event.key.toLowerCase()
      if (!keys.includes(key)) return

      pressedKeys.add(key)
      setIsPressed(true)
    }

    function handleKeyUp (event: KeyboardEvent) {
      pressedKeys.delete(event.key.toLowerCase())
      setIsPressed(pressedKeys.size > 0)
    }

    function handleBlur () {
      pressedKeys.clear()
      setIsPressed(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', handleBlur)
    }
  }, [binds, value, disabled])

  return (
    <Button
      id={id}
      color={color}
      fill='soft'
      class='flex w-full h-auto aspect-square rounded-full text-xl items-center justify-center align-middle text-center leading-0'
      disabled={disabled}
      selected={isPressed}
      onMouseDown={(event) => event.preventDefault()}
      onClick={handleCalcButtonClick}
      data-value={value}
      binds={binds ?? [value]}
    >
      {content}
    </Button>
  )
}
