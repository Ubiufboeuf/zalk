import type { ComponentChildren, TargetedMouseEvent } from 'preact'
import type { UIColors, UIFillMode, UIProps, UISizes, UIShapes, UIWidths } from './uiTypes'

export interface ButtonProps extends UIProps<HTMLButtonElement> {
  label?: string
  
  color?: UIColors
  size?: UISizes
  width?: UIWidths
  fill?: UIFillMode
  shape?: UIShapes
  
  selected?: boolean
  disabled?: boolean
  focusable?: boolean

  onClick?: (event: TargetedMouseEvent<HTMLButtonElement>) => void

  ['data-value']: unknown
  binds: unknown[]
}

export interface ButtonLinkProps extends UIProps<HTMLButtonElement> {
  href?: string
  label?: string
  
  color?: UIColors
  size?: UISizes
  width?: UIWidths
  fill?: UIFillMode
  shape?: UIShapes
  
  selected?: boolean
}

export interface CalcButtonProps {
  id: string,
  value: string,
  content: ComponentChildren,
  color?: UIColors,
  binds?: string[]
  disabled?: boolean
}
