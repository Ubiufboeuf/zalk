import { calcButtons } from '@/constants/calcButtons'
import { Button } from './ui/Button'
import type { UIColors } from '@/types/ui/uiTypes'

export function CalcButtons () {
  return (
    <div class='h-wit max-w-full grid grid-cols-4 gap-3 gap-y-2 pb-4'>
      { calcButtons.map(({ id, content, color, value }) => (
        <Button
          key={id}
          id={id}
          color={color as UIColors}
          fill='soft'
          class='flex w-full h-auto aspect-square rounded-full text-xl items-center justify-center align-middle text-center leading-0'
          data-value={value}
        >
          {content}
        </Button>
      )) }
    </div>
  )
}
