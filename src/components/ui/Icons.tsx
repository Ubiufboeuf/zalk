/* eslint-disable react/no-unknown-property */
import type { SVGProps } from '@/types/ui/iconTypes'

const Svg = ({
  children, id, viewBox = '0 0 24 24',
  class: className, hidden,
  width = '24', height = '24',
  fill = 'transparent', stroke = 'currentColor', strokeWidth = '2', strokeLinecap = 'round', strokeLinejoin = 'round'
}:
  SVGProps
) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    id={id}
    viewBox={viewBox}
    width={width}
    height={height}
    fill={fill}
    stroke={stroke}
    stroke-width={strokeWidth}
    stroke-linejoin={strokeLinejoin}
    stroke-linecap={strokeLinecap}
    hidden={hidden}
    class={`${className} h-full w-full pointer-events-none`}
  >
    {children}
  </svg>
)

export const IconCross = () => (
  <Svg>
    <path d='M18 6l-12 12' />
    <path d='M6 6l12 12' />
  </Svg>
)

export const IconDivide = () => (
  <Svg>
    <path d='M11 6a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' fill='currentColor' />
    <path d='M11 18a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' fill='currentColor' />
    <path d='M5 12l14 0' />
  </Svg>
)

export const IconPlus = () => (
  <Svg>
    <path d='M12 5l0 14' />
    <path d='M5 12l14 0' />
  </Svg>
)

export const IconMinus = () => (
  <Svg>
    <path d='M5 12l14 0' />
  </Svg>
)

export const IconParen = () => (
  <Svg>
    <path d='M7 4a12.25 12.25 0 0 0 0 16' />
    <path d='M17 4a12.25 12.25 0 0 1 0 16' />
  </Svg>
)

export const IconPercentage = () => (
  <Svg>
    <path d='M16 17a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
    <path d='M6 7a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
    <path d='M6 18l12 -12' />
  </Svg>
)

export const IconEquals = () => (
  <Svg>
    <path d='M5 10h14' />
    <path d='M5 14h14' />
  </Svg>
)

export const IconPlusMinus = () => (
  <Svg>
    <path d='M4 7h6' />
    <path d='M7 4v6' />
    <path d='M20 18h-6' />
    <path d='M5 19l14 -14' />
  </Svg>
)

export const IconHistory = () => (
  <Svg>
    <path d='M12 8l0 4l2 2' />
    <path d='M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5' />
  </Svg>
)

export const IconUnits = () => (
  <Svg>
    <path d='M19.875 8c.621 0 1.125 .512 1.125 1.143v5.714c0 .631 -.504 1.143 -1.125 1.143h-15.875a1 1 0 0 1 -1 -1v-5.857c0 -.631 .504 -1.143 1.125 -1.143h15.75' />
    <path d='M9 8v2' />
    <path d='M6 8v3' />
    <path d='M12 8v3' />
    <path d='M18 8v3' />
    <path d='M15 8v2' />
  </Svg>
)

export const IconSquareRootX = () => (
  <Svg>
    <path d='M13 12h1c1 0 1 1 2.016 3.527c.984 2.473 .984 3.473 1.984 3.473h1' />
    <path d='M12 19c1.5 0 3 -2 4 -3.5s2.5 -3.5 4 -3.5' />
    <path d='M3 12h1l3 8l3 -16h10' />
  </Svg>
)

export const IconBackspace = () => (
  <Svg>
    <path d='M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5l11 0' />
    <path d='M12 10l4 4m0 -4l-4 4' />
  </Svg>
)
