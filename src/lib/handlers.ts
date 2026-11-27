import { useCalcStore } from '@/stores/calcStore'
import { calc } from '@mangufaf/zalk'
import type { TargetedMouseEvent } from 'preact'
import { saveInHistory } from './history'

type SpecialHandler = ($operation: HTMLInputElement) => boolean

function insertText (value: string) {
  document.execCommand('insertText', false, value)
}

export const specialHandlers: Record<string, SpecialHandler | true | undefined> = {
  home: true,
  end: true,
  backspace: true,
  delete: true,
  arrowleft: true,
  arrowright: true,

  '+': true,
  '-': true,
  '/': true,
  '*': true,
  '%': true,
  ')': true,
  '.': true,

  clear: ($operation) => {
    $operation.value = ''
    $operation.dispatchEvent(new Event('input', { bubbles: true }))

    return true
  },

  equals: ($operation) => {
    const { value } = $operation

    if (!value.trim()) return true

    const result = calc(value)

    if (result !== value) {
      saveInHistory(value, result)
    }

    $operation.value = result
    $operation.dispatchEvent(new Event('input', { bubbles: true }))

    return true
  },

  '(': ($operation) => {
    const { selectionStart, selectionEnd, value } = $operation

    if (
      selectionStart === null ||
      selectionEnd === null ||
      selectionStart === selectionEnd
    ) return false

    insertText(`(${value.slice(selectionStart, selectionEnd)})`)

    return true
  },

  paren: ($operation) => {
    const { value, selectionStart, selectionEnd } = $operation
    const start = selectionStart ?? value.length
    const end = selectionEnd ?? start

    if (start !== end) {
      insertText(`(${value.slice(start, end)})`)
      return true
    }

    const before = value.slice(0, start)
    const opened = (before.match(/\(/g) ?? []).length
    const closed = (before.match(/\)/g) ?? []).length

    const shouldClose = opened > closed && /[\d.)%]$/.test(before)

    insertText(shouldClose ? ')' : '(')

    return true
  },

  sign: ($operation) => {
    const { value } = $operation
    const start = $operation.selectionStart ?? value.length
    const end = $operation.selectionEnd ?? start

    const hasSelection = start !== end
    const selectedValue = hasSelection ? value.slice(start, end) : value

    if (!selectedValue) {
      insertText('-')
      return true
    }

    let newValue: string

    if (/^-\d*\.?\d+$/.test(selectedValue)) {
      newValue = selectedValue.slice(1)
    } else if (/^\d*\.?\d+$/.test(selectedValue)) {
      newValue = `-${selectedValue}`
    } else {
      newValue = `-(${selectedValue})`
    }

    if (!hasSelection) {
      $operation.select()
    }

    insertText(newValue)

    return true
  }
}

export function handleCalcButtonClick (e: TargetedMouseEvent<HTMLButtonElement>) {
  const value = e.currentTarget.dataset.value
  const { $operation } = useCalcStore.getState()

  if (!$operation || !value) return

  $operation.focus()

  const specialHandler = specialHandlers[value]

  if (typeof specialHandler === 'function') {
    if (specialHandler($operation)) return
  }

  if (value.length === 1) {
    insertText(value)
  }
}
