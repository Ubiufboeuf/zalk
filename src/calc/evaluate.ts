import type { Node } from './index'

export function evaluate (node: Node): string {
  if (node.type === 'number') {
    return node.value
  }

  const { value: symbol, leftNode, rightNode } = node
  if (!rightNode) return ''

  const right = Number(evaluate(rightNode))
  
  if (!leftNode) {
    if (symbol === '+') return `${right}`
    if (symbol === '-') return `${-1 * right}`
    return ''
  }

  const left = Number(evaluate(leftNode))

  if (symbol === '*') return `${left * right}`
  if (symbol === '/') return `${left / right}`
  if (symbol === '+') return `${left + right}`
  if (symbol === '-') return `${left - right}`

  return ''
}
