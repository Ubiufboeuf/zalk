import { calc } from '@/calc'
import { useCalcStore } from '@/stores/useCalcStore'
import { useEffect } from 'preact/hooks'

const symbols: Record<string, string> = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷'
}

export function Operation () {
  const operation = useCalcStore((state) => state.operation)
  const setResult = useCalcStore((state) => state.setResult)

  function parseOperation (operation: string | undefined) {
    if (!operation) return
    return operation
      .replace(/\*|\//g, (c) => symbols[c])
  }
  
  useEffect(() => {
    if (!operation) return

    const result = calc(operation)
    setResult(result)
  }, [operation])
  
  return (
    <div class='w-full h-12 mb-10 px-6 flex items-center'>
      <span class='h-full w-full max-w-full text-3xl text-right wrap-anywhere'>
        {parseOperation(operation)}
      </span>
    </div>
  )
}
