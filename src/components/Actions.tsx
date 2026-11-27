import { backspace, toggleHistory } from '@/lib/actions'
import { Button } from './ui/Button'
import { Icon } from './ui/Icon'
import { IconBackspace, IconHistory, IconSquareRootX, IconUnits } from './ui/Icons'

const actions = [
  {
    id: 'history',
    title: 'Historial',
    icon: IconHistory,
    disabled: false,
    onClick: toggleHistory
  },
  {
    id: 'units',
    title: 'Conversiones',
    icon: IconUnits,
    disabled: true
  },
  {
    id: 'cientific',
    title: 'Modo Científico',
    icon: IconSquareRootX,
    disabled: true
  },
  {
    id: 'backspace',
    title: 'Borrar',
    icon: IconBackspace,
    disabled: false,
    class: 'ml-auto btn-accent btn-soft **:opacity-100',
    onClick: backspace
  }
]

export function Actions () {
  return (
    <div>
      <div class='h-9 w-full flex items-center'>
        {actions.map(({
          id,
          icon: ActionIcon,
          class: className = '',
          title,
          disabled,
          onClick
        }) => (
          <Button
            key={id}
            id={id}
            title={title}
            disabled={disabled}
            class={`${className} group h-full not-[.btn-soft]:btn-ghost`}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onClick}
          >
            <Icon class='size-5 group-not-shr:opacity-50 transition-opacity'>
              <ActionIcon />
            </Icon>
          </Button>
        ))}
      </div>

      <div class='h-px bg-base-content/20 mt-3' />
    </div>
  )
}
