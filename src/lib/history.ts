import { useCalcStore } from '@/stores/useCalcStore'
import { v4 } from 'uuid'

export function saveInHistory (operation: string, result: string) {
  const { setHistory } = useCalcStore.getState()
  const history = JSON.parse(localStorage.getItem('zalk:history') ?? '[]')
  const id = v4()

  const lastOperation = history[0] // Se maneja invertido
  if (lastOperation?.operation === operation) return
  
  history.unshift({ id, operation, result })
  if (history.length > 100) history.length = 100

  localStorage.setItem('zalk:history', JSON.stringify(history))
  setHistory(history)
}

export function loadHistory () {
  const { setHistory } = useCalcStore.getState()
  const storedHistory = localStorage.getItem('zalk:history')
  if (!storedHistory) return

  const history = JSON.parse(storedHistory)
  setHistory(history)
}
