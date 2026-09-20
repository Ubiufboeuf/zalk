import { Icon } from '../ui/Icon'
import { IconBackspace, IconHistory, IconSquareRootX, IconUnits } from '../ui/Icons'
import { CalcButton } from './CalcButton'

const actionButtons = [
  { id: 'history', title: 'Historial', icon: IconHistory, disabled: true },
  { id: 'units', title: 'Conversiones', icon: IconUnits, disabled: true },
  { id: 'cientific', title: 'Modo Científica', icon: IconSquareRootX, disabled: true },
  { id: 'backspace', title: 'Borrar', icon: IconBackspace, class: 'ml-auto btn-accent btn-soft **:opacity-100' }
]

export function ActionButtons () {
  return (
    <div class='h-9 w-full'>
      <div class='h-full w-full flex items-center gap-3 px-5'>
        { actionButtons.map(({ id, class: className = '', icon: ButtonIcon, disabled }) => (
          <CalcButton
            key={id}
            id={id}
            value={id}
            class={`${className} group h-full aspect-square not-[.btn-soft]:btn-ghost`}
            shape='circle'
            disabled={disabled}
            label={() => (
              <Icon class='size-5 group-[:not(.btn-soft)]:opacity-50'>
                <ButtonIcon />
              </Icon>
            )}
          />
        )) }
      </div>
    </div>
  )
}
