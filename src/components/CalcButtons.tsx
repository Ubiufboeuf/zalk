import { calcButtons } from '@/constants/calcButtons'
import { CalcButton } from './CalcButton'

export function CalcButtons () {
  return (
    <div class='h-wit max-w-full grid grid-cols-4 gap-3 gap-y-2 pb-4'>
      { calcButtons.map((btn) => <CalcButton key={btn.id} {...btn} />) }
    </div>
  )
}
