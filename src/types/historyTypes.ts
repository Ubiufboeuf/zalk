export interface HistoryEntry {
  id: string
  operation: string
  result: string
}

export type ZalkHistory = HistoryEntry[]
