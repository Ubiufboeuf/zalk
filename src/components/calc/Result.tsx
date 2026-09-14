import { isNumber } from '@/calc'
import { useCalcStore } from '@/stores/useCalcStore'

export function Result () {
  const result = useCalcStore((state) => state.result)
  const resultNumber = Number(result)
  const output = Math.abs(resultNumber) > 1e15 ? resultNumber.toExponential(5) : result
  
  return (
    <div class='h-12 mb-4 w-full flex items-center px-6 overflow-x-auto overflow-y-hidden scrollbar-thin'>
      <output class='w-full min-w-fit text-lg text-base-content/60 line-clamp-1 text-right'>
        {isNumber(output) && output}
      </output>
    </div>
  )
}
