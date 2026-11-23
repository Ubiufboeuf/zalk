import { useCalcStore } from '@/stores/calcStore'
import { calc } from '@mangufaf/zalk'
import type { TargetedInputEvent } from 'preact'

export function Screen () {
  const setResult = useCalcStore((state) => state.setResult)
  
  function handleInput (event: TargetedInputEvent<HTMLInputElement>) {
    const input = event.currentTarget
    if (!input) return

    const { value } = input
    const result = calc(value)
    setResult(result)
  }
  
  return (
    <div class='w-full h-12 mb-12'>
      <input
        id='screen'
        class='input h-full w-full text-end text-3xl outline-0 border-0 shadow-none p-0'
        onInput={handleInput}
      />
    </div>
  )
}
