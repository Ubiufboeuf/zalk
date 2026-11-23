import type { ComponentChildren, CSSProperties } from 'preact'

export function Icon ({ class: className = '', style, children }: { class?: string, style?: string | CSSProperties, children: ComponentChildren }) {
  return (
    <div class={`${className} not-[[class*=h-]]:h-6 not-[[class*=w-]]:w-6 flex items-center justify-center overflow-hidden`} style={style}>
      {children}
    </div>
  )
}
