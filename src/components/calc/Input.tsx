import { calc } from '@/calc'
import { useCalcStore } from '@/stores/useCalcStore'
import { useRef } from 'preact/hooks'

export function Input () {
  const inputRef = useRef<HTMLInputElement>(null)
  const setResult = useCalcStore((state) => state.setResult)
  
  function handleInput () {
    const input = inputRef.current
    if (!input) return

    const { value } = input
    const result = calc(value)
    setResult(result)
  }
  
  return (
    <label class='w-full h-12 mb-10 px-6 flex items-center'>
      <input
        ref={inputRef}
        onInput={handleInput}
        value={'8+6'}
        class='h-full w-full text-right text-3xl'
      />
    </label>
  )
}
