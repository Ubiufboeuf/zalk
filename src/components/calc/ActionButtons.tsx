import type { TargetedMouseEvent } from 'preact'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { IconBackspace, IconHistory, IconSquareRootX, IconUnits } from '../ui/Icons'
import { useCalcStore } from '@/stores/useCalcStore'

const actionButtons = [
  { id: 'history', title: 'Historial', icon: IconHistory },
  { id: 'units', title: 'Conversiones', icon: IconUnits },
  { id: 'cientific', title: 'Modo Científica', icon: IconSquareRootX },
  { id: 'backspace', title: 'Borrar', icon: IconBackspace, class: 'ml-auto btn-accent btn-soft **:opacity-100' }
]

export function ActionButtons () {
  const operation = useCalcStore((state) => state.operation)
  const setOperation = useCalcStore((state) => state.setOperation)
  
  function handleClick (ev: TargetedMouseEvent<HTMLButtonElement>) {
    const btn = ev.currentTarget
    const { id } = btn

    if (!operation) return
    
    if (id !== 'backspace') {
      // ...
      return
    }

    const cursor = operation.length
    const valueLeftPart = operation.slice(0, cursor - 1)
    const valueRightPart = operation.slice(cursor)

    const newValue = `${valueLeftPart}${valueRightPart}`
    console.log(newValue)
    
    setOperation(newValue)
  }
  
  
  return (
    <div class='h-9 w-full'>
      <div class='h-full w-full flex items-center gap-3 px-5'>
        { actionButtons.map(({ id, class: className = '', icon: ButtonIcon }) => (
          <Button
            key={id}
            id={id}
            class={`${className} group h-full w-auto aspect-square not-[.btn-soft]:btn-ghost`}
            shape='circle'
            onClick={handleClick}
          >
            <Icon class='size-5 group-[:not(.btn-soft)]:opacity-50'>
              <ButtonIcon />
            </Icon>
          </Button>
        )) }
      </div>
    </div>
  )
}
