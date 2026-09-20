import type { Node } from './index'

export function evaluate (node: Node): string {
  if (node.type === 'number') {
    return node.value
  }
  
  if (node.type === 'percentage') {
    const val = Number(evaluate(node.value))
    return `${val / 100}`
  }
  
  const { value: symbol } = node

  if (node.type === 'unary') {
    const { node: innerNode, value: symbol } = node
    if (!innerNode) return ''

    const value = Number(evaluate(innerNode))
   
    if (symbol === '+') return `${value}`
    if (symbol === '-') return `${-1 * value}`

    return ''
  }
  
  const { leftNode, rightNode } = node
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

  if (symbol === '+') {
    if (rightNode.type === 'percentage') {
      const percentVal = Number(evaluate(rightNode.value))
      return `${left + (left * percentVal / 100)}`
    }
    return `${left + right}`
  }

  if (symbol === '-') {
    if (rightNode.type === 'percentage') {
      const percentVal = Number(evaluate(rightNode.value))
      return `${left - (left * percentVal / 100)}`
    }
    return `${left - right}`
  }

  return ''
}
