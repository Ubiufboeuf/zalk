import { useCalcStore } from '@/stores/useCalcStore'

export function Result () {
  const result = useCalcStore((state) => state.result)
  
  return (
    <div class='h-12 mb-4 w-full flex items-center px-6 overflow-x-auto scrollbar-none'>
      <output class='w-full text-lg text-base-content/60 [direction:rtl] line-clamp-1'>14{result}</output>
    </div>
  )
}
