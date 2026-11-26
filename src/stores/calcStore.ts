import { create } from 'zustand'

interface CalcStore {
  result: string | undefined
  setResult: (result: string | undefined) => void

  $operation: HTMLInputElement | undefined
  set$Operation: ($operation: HTMLInputElement | undefined) => void
}

export const useCalcStore = create<CalcStore>((set) => ({
  result: undefined,
  setResult: (result) => set({ result }),

  $operation: undefined,
  set$Operation: ($operation) => set({ $operation })
}))
