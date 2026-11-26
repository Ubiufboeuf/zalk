import { useCalcStore } from '@/stores/calcStore'
import { calc } from '@mangufaf/zalk'
import type { TargetedMouseEvent } from 'preact'

export const specialHandlers: Record<string, ((event: KeyboardEvent, $operation: HTMLInputElement) => void) | true | undefined> = {
  f5: true, home: true, end: true,
  backspace: true, delete: true,
  arrowleft: true, arrowright: true,
  '+': true, '-': true, '/': true, '*': true,
  a: true, z: true, x: true, c: true, v: true, ')': true, '.': true,

  clear: (_, $operation) => {
    $operation.value = ''
    $operation.dispatchEvent(new Event('input', { bubbles: true }))
  },
  'equals': (_, $operation) => {
    const { value } = $operation
    $operation.value = calc(value)
    $operation.dispatchEvent(new Event('input', { bubbles: true }))
  },
  '(': (event, $operation) => {
    const start = $operation.selectionStart
    const end = $operation.selectionEnd
    
    if (start !== null && end !== null && start !== end) {
      event.preventDefault()
      document.execCommand('insertText', false, `(${$operation.value.slice(start, end)})`)
    }
  }
}

export function handleCalcButtonClick (e: TargetedMouseEvent<HTMLButtonElement>) {
  const btn = e.currentTarget
  if (!(btn instanceof HTMLButtonElement)) return

  const btnValue = btn.dataset.value
  const { $operation } = useCalcStore.getState()
  if (!$operation) return
  
  const specialHandler = specialHandlers[btnValue!]
  if (specialHandler) {
    return
  }
}
