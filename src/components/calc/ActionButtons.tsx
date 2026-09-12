import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { IconBackspace, IconHistory, IconSquareRootX, IconUnits } from '../ui/Icons'

const actionButtons = [
  { id: 'history', title: 'Historial', icon: IconHistory },
  { id: 'units', title: 'Conversiones', icon: IconUnits },
  { id: 'cientific', title: 'Modo Científica', icon: IconSquareRootX },
  { id: 'backspace', title: 'Borrar', icon: IconBackspace, class: 'ml-auto btn-accent btn-soft **:opacity-100' }
]

export function ActionButtons () {
  return (
    <div class='h-9 w-full'>
      <div class='h-full w-full flex items-center gap-3 px-5'>
        { actionButtons.map(({ id, class: className = '', icon: ButtonIcon }) => (
          <Button
            key={id}
            class={`${className} group h-full w-auto aspect-square not-[.btn-soft]:btn-ghost`}
            shape='circle'
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
