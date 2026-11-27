import { useCalcStore } from '@/stores/calcStore'

export function toggleHistory () {
  useCalcStore.setState(({ isHistoryVisible }) => ({
    isHistoryVisible: !isHistoryVisible
  }))
}

export function backspace () {
  const { $operation } = useCalcStore.getState()
  if (!$operation) return

  $operation.focus()
  document.execCommand('delete')
}
