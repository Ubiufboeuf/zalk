import { keyAliases } from '@/constants/calcButtons'
import { specialHandlers } from '@/lib/handlers'
import { useCalcStore } from '@/stores/calcStore'
import { calc } from '@mangufaf/zalk'
import type { TargetedInputEvent } from 'preact'
import { useEffect, useRef } from 'preact/hooks'

export function Screen () {
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const setResult = useCalcStore((state) => state.setResult)
  const set$Operation = useCalcStore((state) => state.set$Operation)

  function handleKeyDown (event: KeyboardEvent) {
    if (
      event.defaultPrevented ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      event.isComposing
    ) return

    const { $operation } = useCalcStore.getState()
    if (!$operation) return

    const key = event.key.toLowerCase()
    const action = keyAliases[key] ?? key
    const specialHandler = specialHandlers[action]

    const wasFocused = document.activeElement === $operation
    const isNumber = /^[0-9]$/.test(key)

    if (!isNumber && !specialHandler) {
      if (wasFocused && key.length === 1) {
        event.preventDefault()
      }

      return
    }

    if (!wasFocused) {
      $operation.focus()
    }

    if (typeof specialHandler === 'function') {
      const handled = specialHandler($operation)

      if (handled) {
        event.preventDefault()
        return
      }
    }

    if (wasFocused) return

    if (key === 'backspace' || key === 'delete') {
      event.preventDefault()

      document.execCommand(
        key === 'backspace' ? 'delete' : 'forwardDelete'
      )

      return
    }

    if (key.length === 1) {
      event.preventDefault()
      document.execCommand('insertText', false, event.key)
    }
  }

  function handleInput (event: TargetedInputEvent<HTMLTextAreaElement>) {
    const { value } = event.currentTarget

    localStorage.setItem('zalk:operation', value)
    setResult(calc(value))
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
    set$Operation(inputRef.current ?? undefined)

    if (inputRef.current) {
      const preview = document.querySelector('#preview')
      if (preview) {
        setResult(calc(inputRef.current.value ?? ''))
      }
    }

    return () => set$Operation(undefined)
  }, [set$Operation, setResult])

  return (
    <div class='w-full h-24'>
      <textarea
        ref={inputRef}
        id='screen'
        class='input h-full w-full max-w-full resize-none scrollbar-thin wrap-anywhere text-end text-3xl outline-0 border-0 shadow-none p-0 text-wrap'
        onInput={handleInput}
        onBlur={handleBlur}
      />
    </div>
  )
}
