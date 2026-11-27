import type { ZalkHistory } from '@/types/historyTypes'
import { create } from 'zustand'

interface CalcStore {
  result: string | undefined
  setResult: (result: string | undefined) => void

  $operation: HTMLTextAreaElement | undefined
  set$Operation: ($operation: HTMLTextAreaElement | undefined) => void

  isHistoryVisible: boolean
  setIsHistoryVisible: (isHistoryVisible: boolean) => void

  history: ZalkHistory | undefined
  setHistory: (history: ZalkHistory | undefined) => void
}

export const useCalcStore = create<CalcStore>((set) => ({
  result: undefined,
  setResult: (result) => set({ result }),

  $operation: undefined,
  set$Operation: ($operation) => set({ $operation }),

  isHistoryVisible: false,
  setIsHistoryVisible: (isHistoryVisible) => set({ isHistoryVisible }),

  history: undefined,
  setHistory: (history) => set({ history })
}))
