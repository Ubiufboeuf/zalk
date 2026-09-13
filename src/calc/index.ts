/* eslint-disable @typescript-eslint/no-explicit-any */
import { evaluate } from './evaluate'
import { parser } from './parser'
import { tokenize } from './tokenize'

const symbols = ['+', '-', '*', '/', '(', ')'] as const
export type Symbol = typeof symbols[number]

export interface NumberNode {
  type: 'number'
  value: string
}

export interface SymbolNode {
  type: 'symbol'
  leftNode: Node | undefined
  rightNode: Node | undefined
  value: Symbol | undefined
}
export type Node = NumberNode | SymbolNode

export const isSymbol = (str: any): str is Symbol => symbols.includes(str)
export function calc (operation: string): string {
  const tokens = tokenize(operation)
  const tree = parser(tokens)
  const result = evaluate(tree)

  return result
}
