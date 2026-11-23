import { useCalcStore } from '@/stores/calcStore'

export function Preview () {
  const result = useCalcStore((state) => state.result)
  
  return (
    <div class='w-full h-10'>
      <output class='h-full w-full flex justify-end items-center'>{result}</output>
    </div>
  )
}
