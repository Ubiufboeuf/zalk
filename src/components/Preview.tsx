import { useCalcStore } from '@/stores/calcStore'

export function Preview () {
  const result = useCalcStore((state) => state.result)
  
  return (
    <div class='w-full h-10 line-clamp-1'>
      <output class='h-full min-w-fit flex justify-end items-center text-base-content/60 text-lg'>{result ? Number(result) : ''}</output>
    </div>
  )
}
