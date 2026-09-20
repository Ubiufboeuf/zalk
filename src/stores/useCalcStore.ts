import { create } from 'zustand'

interface CalcStore {
  operation: string | undefined
  setOperation: (operation: string | undefined) => void
  
  result: string | undefined
  setResult: (result: string | undefined) => void

  cursorIndex: number
  setCursorIndex: (cursorIndex: number) => void
}

export const useCalcStore = create<CalcStore>((set) => ({
  operation: undefined,
  setOperation: (operation) => set({ operation }),
  
  result: undefined,
  setResult: (result) => set({ result }),

  cursorIndex: 0,
  setCursorIndex: (cursorIndex) => set({ cursorIndex })
}))

export const miniStore = {
  canChangeResult: true
}
