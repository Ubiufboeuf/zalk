import { useCalcStore } from '@/stores/useCalcStore'

export function toggleHistory () {
  useCalcStore.setState(({ isHistoryVisible }) => ({ isHistoryVisible: !isHistoryVisible }))
}
