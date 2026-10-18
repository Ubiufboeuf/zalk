import type { ZalkHistory } from '@/types/historyTypes'
import { create } from 'zustand'

interface CalcStore {
  operation: string | undefined
  setOperation: (operation: string | undefined) => void
  
  result: string | undefined
  setResult: (result: string | undefined) => void

  cursorIndex: number
  setCursorIndex: (cursorIndex: number) => void

  isHistoryVisible: boolean
  setIsHistoryVisible: (isHistoryVisible: boolean) => void

  history: ZalkHistory | undefined
  setHistory: (history: ZalkHistory | undefined) => void
}

export const useCalcStore = create<CalcStore>((set) => ({
  operation: undefined,
  setOperation: (operation) => set({ operation }),
  
  result: undefined,
  setResult: (result) => set({ result }),

  cursorIndex: 0,
  setCursorIndex: (cursorIndex) => set({ cursorIndex }),

  isHistoryVisible: false,
  setIsHistoryVisible: (isHistoryVisible) => set({ isHistoryVisible }),

  history: undefined,
  setHistory: (history) => set({ history })
}))

export const miniStore = {
  canChangeResult: true
}
