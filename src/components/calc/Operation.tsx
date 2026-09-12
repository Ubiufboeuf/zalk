import { calc } from '@/calc'
import { useCalcStore } from '@/stores/useCalcStore'
import { useEffect } from 'preact/hooks'

export function Operation () {
  const operation = useCalcStore((state) => state.operation)
  const setResult = useCalcStore((state) => state.setResult)
  
  useEffect(() => {
    if (!operation) return

    const result = calc(operation)
    setResult(result)
  }, [operation])
  
  return (
    <div class='w-full h-12 mb-10 px-6 flex items-center'>
      <span class='h-full w-full max-w-full text-3xl text-right wrap-anywhere'>
        {operation}
      </span>
    </div>
  )
}
