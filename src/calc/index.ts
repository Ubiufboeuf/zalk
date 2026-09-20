/* eslint-disable @typescript-eslint/no-explicit-any */
import { evaluate } from './evaluate'
import { parser } from './parser'
import { preprocess } from './preprocess'
import { tokenize } from './tokenize'

const symbols = ['+', '-', '*', '/', '(', ')', '%'] as const
const symbolsNotParen = ['+', '-', '*', '/', '%'] as const
export type Symbol = typeof symbols[number]
export type SymbolNotParen = typeof symbols[number]

export interface PercentageNode {
  type: 'percentage'
  value: Node
}

export interface NumberNode {
  type: 'number'
  value: string
}

export interface UnaryNode {
  type: 'unary'
  node: Node | undefined
  value: Symbol | undefined
}

export interface SymbolNode {
  type: 'symbol'
  leftNode: Node | undefined
  rightNode: Node | undefined
  value: Symbol | undefined
}

export type Node = NumberNode | UnaryNode | SymbolNode | PercentageNode

export const isNumber = (str: string | number | undefined) => !isNaN(Number(str))
export const isSymbol = (str: any): str is Symbol => symbols.includes(str)
export const isSymbolNotParen = (str: any): str is SymbolNotParen => symbolsNotParen.includes(str)
export function calc (operation: string): string {
  const preparedOperation = preprocess(operation)
  const tokens = tokenize(preparedOperation)
  const tree = parser(tokens)
  const result = evaluate(tree)

  return result
}
