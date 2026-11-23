import { create } from 'zustand'

interface CalcStore {
  result: string | undefined
  setResult: (result: string | undefined) => void
}

export const useCalcStore = create<CalcStore>((set) => ({
  result: undefined,
  setResult: (result) => set({ result })
}))
