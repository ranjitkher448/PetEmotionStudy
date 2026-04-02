import { useEffect, useState } from 'react'
import { BottomImagePicker } from './BottomImagePicker'
import { SelectionBarChart } from './SelectionBarChart'

const initialCounts: [number, number, number, number] = [0, 0, 0, 0]

export function BottomPickPanel() {
  const [counts, setCounts] = useState(initialCounts)
  const [selected, setSelected] = useState<number | null>(null)
  /** When true, bars are hidden so participants aren’t biased by vote counts. */
  const [chartSuppressed, setChartSuppressed] = useState(false)

  useEffect(() => {
    if (chartSuppressed) {
      document.documentElement.dataset.chartHidden = 'true'
    } else {
      delete document.documentElement.dataset.chartHidden
    }
    return () => {
      delete document.documentElement.dataset.chartHidden
    }
  }, [chartSuppressed])

  function handlePick(index: number) {
    setChartSuppressed(false)
    setSelected(index)
    setCounts((prev) => {
      const next: [number, number, number, number] = [...prev]
      next[index] += 1
      return next
    })
  }

  return (
    <div
      className={
        'bottom-pick-panel' +
        (chartSuppressed ? ' bottom-pick-panel--chart-suppressed' : '')
      }
    >
      <div className="bottom-pick-panel__researcher-bar">
        <button
          type="button"
          className="bottom-pick-panel__chart-toggle"
          onClick={() => setChartSuppressed((s) => !s)}
        >
          {chartSuppressed ? 'Show vote bars' : 'Hide vote bars'}
        </button>
      </div>
      {!chartSuppressed && <SelectionBarChart counts={counts} />}
      <BottomImagePicker selected={selected} onPick={handlePick} />
    </div>
  )
}
