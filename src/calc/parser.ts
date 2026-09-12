import type { Node, NumberNode, SymbolNode } from './index'
import { isSymbol } from './index'

export function parser (tokens: string[]): Node {
  if (tokens[0] === '(' && tokens[tokens.length - 1] === ')') {
     return parser(tokens.slice(1, -1))
  }
  
  let sepLevel = 0
  const separatorIndex = tokens.findIndex((t) => {
    if (t === '(') sepLevel++
    if (t === ')') sepLevel--
    return sepLevel === 0 && (t === '+' || t === '-')
  })
  
  if (separatorIndex !== -1) {
    const symbol = tokens[separatorIndex]
    if (!isSymbol(symbol)) {
      throw new Error('Símbolo inválido')
    }

    
    const node: SymbolNode = {
      type: 'symbol',
      value: symbol,
      leftNode: parser(tokens.slice(0, separatorIndex)),
      rightNode: parser(tokens.slice(separatorIndex + 1, tokens.length))
    }

    return node
  }
  
  let symbLevel = 0
  const symbolIndex = tokens.findIndex((t) => {
    if (t === '(') symbLevel++
    if (t === ')') symbLevel--
    return symbLevel === 0 && (t === '*' || t === '/')
  })

  if (symbolIndex === -1) {
    const node: NumberNode = {
      type: 'number',
      value: tokens[0]
    }

    return node
  }
  
  const symbol = tokens[symbolIndex]
  if (!isSymbol(symbol)) {
    throw new Error('Símbolo inválido')
  }

  const node: SymbolNode = {
    type: 'symbol',
    value: symbol,
    leftNode: parser(tokens.slice(0, symbolIndex)),
    rightNode: parser(tokens.slice(symbolIndex + 1, tokens.length))
  }

  return node
}
