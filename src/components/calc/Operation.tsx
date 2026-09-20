import { calc } from '@/calc'
import { useCalcStore } from '@/stores/useCalcStore'
import { useEffect, useRef } from 'preact/hooks'

interface ClosestRow {
  spans: {
    span: HTMLSpanElement
    index: number
  }[]
  top: number
}

const symbols: Record<string, string> = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷'
}

export function Operation () {
  const operation = useCalcStore((state) => state.operation) || ''
  const setResult = useCalcStore((state) => state.setResult)

  const cursorIndex = useCalcStore((state) => state.cursorIndex)
  const setCursorIndex = useCalcStore((state) => state.setCursorIndex)
  const containerRef = useRef<HTMLDivElement>(null)

  function parseOperation (op: string) {
    return op.replace(/\*|\//g, (c) => symbols[c])
  }

  useEffect(() => {
    setCursorIndex(operation.length)
  }, [operation])

  const handleContainerClick = (e: MouseEvent) => {
    if (!containerRef.current) return
    const spans = containerRef.current.querySelectorAll<HTMLSpanElement>('.char-span')

    if (spans.length === 0) {
      setCursorIndex(0)
      return
    }

    const clickX = e.clientX
    const clickY = e.clientY

    const rowMap = new Map<number, { spans: { span: HTMLSpanElement; index: number }[]; top: number }>()

    for (const [index, span] of spans.entries()) {
      const rect = span.getBoundingClientRect()
      const rowKey = Math.round(rect.top / 8) * 8

      if (!rowMap.has(rowKey)) {
        rowMap.set(rowKey, { spans: [], top: rect.top })
      }
      rowMap.get(rowKey)!.spans.push({ span, index })
    }

    let closestRow: ClosestRow | null = null
    let minRowDistance = Infinity

    for (const row of rowMap.values()) {
      const firstRect = row.spans[0].span.getBoundingClientRect()
      const rowCenterY = firstRect.top + firstRect.height / 2
      const distY = Math.abs(clickY - rowCenterY)

      if (distY < minRowDistance) {
        minRowDistance = distY
        closestRow = row
      }
    }

    if (!closestRow) return

    let closestIndex = operation.length
    let minXDistance = Infinity

    for (const { span, index } of closestRow.spans) {
      const rect = span.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const distX = Math.abs(clickX - centerX)

      if (distX < minXDistance) {
        minXDistance = distX
        closestIndex = clickX < centerX ? index : index + 1
      }
    }

    const firstSpanInRow = closestRow.spans[0].span.getBoundingClientRect()
    const lastSpanInRow = closestRow.spans[closestRow.spans.length - 1].span.getBoundingClientRect()

    if (clickX < firstSpanInRow.left) {
      closestIndex = closestRow.spans[0].index
    } else if (clickX > lastSpanInRow.right) {
      closestIndex = closestRow.spans[closestRow.spans.length - 1].index + 1
    }

    setCursorIndex(closestIndex)
  }

  useEffect(() => {
    if (!operation) {
      setResult('')
      return
    }

    const openCount = (operation.match(/\(/g) || []).length
    const closeCount = (operation.match(/\)/g) || []).length

    if (openCount !== closeCount) {
      setResult('')
      return
    }

    const result = calc(operation)
    setResult(result)
  }, [operation])

  const formattedOp = parseOperation(operation)
  const chars = formattedOp.split('')

  const cursorElement = (
    <span class='absolute left-0 w-0.5 h-7 bg-primary -translate-x-1/2 animate-pulse z-10' />
  )

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      class='w-full mb-10 px-6 flex flex-col items-end relative cursor-text select-none text-3xl'
    >
      <div class='flex flex-wrap justify-end items-center max-w-full'>
        { chars.map((char, index) => (
          <span key={index} class='relative inline-flex items-center'>
            {cursorIndex === index && cursorElement}
            <span class='char-span'>{char}</span>
          </span>
        )) }
        { cursorIndex === operation.length && (
          <span class='relative inline-flex items-center'>
            {cursorElement}
          </span>
        ) }
      </div>
    </div>
  )
}
