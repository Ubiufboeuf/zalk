import { isSymbol, type Node } from './index'

type ParseResult = Node

// Niveles de prioridad de menor a mayor (mayor el número, mayor la prioridad)
export function parser (tokens: string[]): Node {
  const ast = parseAdditive(tokens)
  return ast
}

// Nivel de Prioridad 1
function parseAdditive (tokens: string[]): ParseResult {
  let depth = 0
  const additiveIndex = tokens.findLastIndex((t, i) => {
    // Están invertidos por ser find-last
    if (t === '(') {
      depth--
      return false
    }
    if (t === ')') {
      depth++
      return false
    }
    
    return depth === 0 &&  i > 0 && Boolean(t.match(/[+-]/))
  })

  if (additiveIndex === -1) {
    return parseMultiplicative(tokens)
  }

  const symbol = tokens[additiveIndex]
  if (!isSymbol(symbol)) {
    throw new Error('Símbolo inválido')
  }
  
  const left = tokens.slice(0, additiveIndex)
  const right = tokens.slice(additiveIndex + 1)

  const node: Node = {
    type: 'symbol',
    value: symbol,
    leftNode: left.length ? parseAdditive(left) : undefined,
    rightNode: parseMultiplicative(right)
  }
  
  return node
}

// Nivel de Prioridad 2
function parseMultiplicative (tokens: string[]): ParseResult {
  let depth = 0
  const multiplicativeIndex = tokens.findLastIndex((t, i) => {
    // También invertidos por ser find-last
    if (t === '(') {
      depth--
      return false
    }
    if (t === ')') {
      depth++
      return false
    }

    return depth === 0 && i > 0 && Boolean(t.match(/[*/]/))
  })

  if (multiplicativeIndex === -1) {
    return parseUnary(tokens)
  }

  const symbol = tokens[multiplicativeIndex]
  if (!isSymbol(symbol)) {
    throw new Error('Símbolo inválido')
  }
  
  const left = tokens.slice(0, multiplicativeIndex)
  const right = tokens.slice(multiplicativeIndex + 1)

  const node: Node = {
    type: 'symbol',
    value: symbol,
    leftNode: parseMultiplicative(left),
    rightNode: parseUnary(right)
  }

  return node
}

// Nivel de Prioridad 3
function parseUnary (tokens: string[]): ParseResult {
  if (tokens[0] === '+' || tokens[0] === '-') {
    const node: Node = {
      type: 'unary',
      value: tokens[0],
      node: parsePrimary(tokens.slice(1))
    }

    return node
  }
    
  return parsePrimary(tokens)
}

// Nivel de Prioridad 4
function parsePrimary (tokens: string[]): ParseResult {
  const firstToken = tokens[0]
  const lastToken = tokens[tokens.length - 1]

  if (firstToken === '(' && lastToken === ')') {
    const innerTokens = tokens.slice(1, -1)
    return parseAdditive(innerTokens)
  }

  const node: Node = {
    type: 'number',
    value: firstToken
  }

  return node
}
