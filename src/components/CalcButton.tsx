import type { CalcButtonProps } from '@/types/ui/buttonTypes'
import { Button } from './ui/Button'
import { useCallback, useEffect, useRef } from 'preact/hooks'
import { handleCalcButtonClick } from '@/lib/handlers'

export function CalcButton ({ id, color, value, content, disabled, binds }: CalcButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const isPressedRef = useRef(false)
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!btnRef.current) return

    const key = e.key.toLowerCase()
    const btnKey = JSON.parse(btnRef.current.dataset.binds!)

    if (!btnKey.includes(key)) return
    isPressedRef.current = true

    btnRef.current.click()
    
    window.addEventListener('keyup', handleKeyUp)
    function handleKeyUp () {
      isPressedRef.current = false
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
  
  return (
    <Button
      uiRef={btnRef}
      id={id}
      color={color}
      fill='soft'
      class='flex w-full h-auto aspect-square rounded-full text-xl items-center justify-center align-middle text-center leading-0'
      disabled={disabled}
      onClick={handleCalcButtonClick}
      data-value={value}
      binds={binds ?? []}
    >
      {content}
    </Button>
  )
}
