import type { Node } from './index'

export function evaluate (node: Node): string {
  if (node.type === 'number') {
    return node.value
  }

  const { value: symbol, leftNode, rightNode } = node
  if (!leftNode) return ''
  if (!rightNode) return ''

  const left = Number(evaluate(leftNode))
  const right = Number(evaluate(rightNode))

  if (symbol === '*') return `${left * right}`
  if (symbol === '/') return `${left / right}`
  if (symbol === '+') return `${left + right}`
  if (symbol === '-') return `${left - right}`

  return ''
}
