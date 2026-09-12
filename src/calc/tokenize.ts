export function tokenize (operation: string): string[] {
  const parts = operation.split(/([+\-*/()])/)
  const tokens = parts.map((n) => n.trim()).filter(Boolean)
  
  return tokens
}
