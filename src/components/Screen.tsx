import { keyAliases } from '@/constants/calcButtons'
import { specialHandlers } from '@/lib/handlers'
import { useCalcStore } from '@/stores/calcStore'
import { calc } from '@mangufaf/zalk'
import type { TargetedInputEvent } from 'preact'
import { useEffect, useRef } from 'preact/hooks'

export function Screen () {
  const inputRef = useRef<HTMLInputElement>(null)
  
  const setResult = useCalcStore((state) => state.setResult)
  const set$Operation = useCalcStore((state) => state.set$Operation)

  function handleKeyDown (event: KeyboardEvent) {
    const key = event.key.toLowerCase()
    const modified = event.ctrlKey || event.metaKey
    const action = modified ? key : (keyAliases[key] ?? key)
    const specialHandler = specialHandlers[action]

    if (
      /^[a-z]$/.test(key) &&
      !modified &&
      typeof specialHandler !== 'function'
    ) {
      event.preventDefault()
      return
    }

    if (Number.isNaN(Number(key)) && !specialHandler) {
      event.preventDefault()
      return
    }

    const { $operation } = useCalcStore.getState()
    if (!$operation) return

    const wasFocused = document.activeElement === $operation

    if (!wasFocused && !event.defaultPrevented) {
      $operation.focus()
    }

    if (typeof specialHandler === 'function') {
      if (action !== key) event.preventDefault()
      specialHandler(event, $operation)
    }

    if (
      !wasFocused &&
      !event.defaultPrevented &&
      key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      event.preventDefault()
      document.execCommand('insertText', false, event.key)
    }
  }
  
  function handleInput (event: TargetedInputEvent<HTMLInputElement>) {
    const input = event.currentTarget
    if (!input) return

    const { value } = input
    const result = calc(value)
    setResult(result)
  }

  function handleBlur () {
    const input = inputRef.current
    if (!input) return

    input.setSelectionRange(input.value.length, input.value.length)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  useEffect(() => {
    if (!inputRef.current) return
    set$Operation(inputRef.current)
  }, [set$Operation])
  
  return (
    <div class='w-full h-12 mb-6'>
      <input
        ref={inputRef}
        id='screen'
        class='input h-full w-full text-end text-3xl outline-0 border-0 shadow-none p-0'
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        onBlur={handleBlur}
      />
    </div>
  )
}
