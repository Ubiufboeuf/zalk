import { clearHistory, loadHistory } from '@/lib/history'
import { useCalcStore } from '@/stores/useCalcStore'
import { useEffect } from 'preact/hooks'
import { Button } from './ui/Button'
import { Icon } from './ui/Icon'
import { IconErase } from './ui/Icons'

export function History () {
  const operation = useCalcStore((state) => state.operation)
  const setOperation = useCalcStore((state) => state.setOperation)
  const cursor = useCalcStore((state) => state.cursorIndex)
  const setCursor = useCalcStore((state) => state.setCursorIndex)
  const isHistoryVisible = useCalcStore((state) => state.isHistoryVisible)
  const history = useCalcStore((state) => state.history)
  
  function addToCalc (value: string | number) {
    const str = String(value)

    if (!operation) {
      setOperation(str)
      setCursor(str.length - 1)
      return
    }
    
    const valueLeftPart = operation.slice(0, cursor)
    const valueRightPart = operation.slice(cursor)

    const newValue = `${valueLeftPart}${str}${valueRightPart}`
    setOperation(newValue)
  }

  useEffect(() => {
    if (history) return
    loadHistory()
  }, [history])

  return (
    <section class='flex-1 p-4 flex items-end'>
      <div class='h-full w-full border border-base-content/10 card' hidden={!isHistoryVisible}>
        <div class='pt-4 px-4 flex items-center gap-2'>
          <h1 class='mr-auto font-semibold uppercase text-base-content/60 tracking-wider'>Historial</h1>
          <Button fill='soft' shape='square' onClick={clearHistory}>
            <Icon class='size-5'>
              <IconErase />
            </Icon>
          </Button>
        </div>
        <div class='w-full h-fit px-4 py-3'>
          <div class='w-full h-px bg-base-content/10' />
        </div>
        <div class='relative h-full flex flex-col-reverse justify-start gap-4 overflow-y-auto pb-3'>
          { history?.map(({ id, operation, result }) => (
            <div key={id} class='flex flex-col items-end'>
              <button
                tabIndex={-1}
                class='w-full p-1 px-4 transition-colors hover:bg-base-content/5 cursor-pointer wrap-anywhere text-end'
                onClick={() => addToCalc(operation)}
              >
                {operation}
              </button>
              <button
                tabIndex={-1}
                class='w-full p-1 px-4 transition-colors hover:bg-base-content/5 cursor-pointer wrap-anywhere text-end text-lg font-semibold text-accent'
                onClick={() => addToCalc(result)}
              >
                = {result}
              </button>
            </div>
          )) }
          <span class='absolute bottom-5 left-4 text-xs uppercase text-base-content/50 font-bold'>Más reciente</span>
        </div>
      </div>
    </section>
  )
}
