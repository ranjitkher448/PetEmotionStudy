import { useEffect, useId, useRef, useState } from 'react'
import { BottomImagePicker } from './BottomImagePicker'
import { SelectionBarChart } from './SelectionBarChart'

const initialCounts: [number, number, number, number] = [0, 0, 0, 0]

const RESET_CONFIRM_PHRASE = 'Simba is the best'

export function BottomPickPanel() {
  const [counts, setCounts] = useState(initialCounts)
  const [selected, setSelected] = useState<number | null>(null)
  /** When true, bars are hidden so participants aren’t biased by vote counts. */
  const [chartSuppressed, setChartSuppressed] = useState(false)
  const [resetDialogOpen, setResetDialogOpen] = useState(false)
  const [resetConfirmText, setResetConfirmText] = useState('')
  const resetInputRef = useRef<HTMLInputElement>(null)
  const resetDialogTitleId = useId()

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

  function openResetDialog() {
    setResetConfirmText('')
    setResetDialogOpen(true)
  }

  function closeResetDialog() {
    setResetDialogOpen(false)
    setResetConfirmText('')
  }

  function confirmResetCounts() {
    if (resetConfirmText.trim() !== RESET_CONFIRM_PHRASE) return
    setCounts([...initialCounts])
    setSelected(null)
    closeResetDialog()
  }

  useEffect(() => {
    if (!resetDialogOpen) return
    resetInputRef.current?.focus()
  }, [resetDialogOpen])

  useEffect(() => {
    if (!resetDialogOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setResetDialogOpen(false)
        setResetConfirmText('')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [resetDialogOpen])

  return (
    <div
      className={
        'bottom-pick-panel' +
        (chartSuppressed ? ' bottom-pick-panel--chart-suppressed' : '')
      }
    >
      {resetDialogOpen && (
        <div
          className="reset-confirm-overlay"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeResetDialog()
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={resetDialogTitleId}
            className="reset-confirm-dialog"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <h2 id={resetDialogTitleId} className="reset-confirm-dialog__title">
              Reset all counts?
            </h2>
            <p className="reset-confirm-dialog__text">
              This clears every vote and the selected picture. Enter the
              passcode to confirm.
            </p>
            <input
              ref={resetInputRef}
              type="password"
              className="reset-confirm-dialog__input"
              value={resetConfirmText}
              onChange={(e) => setResetConfirmText(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  resetConfirmText.trim() === RESET_CONFIRM_PHRASE
                ) {
                  e.preventDefault()
                  confirmResetCounts()
                }
              }}
              autoComplete="off"
              spellCheck={false}
              aria-label="Passcode to confirm reset"
              placeholder="Passcode"
            />
            <div className="reset-confirm-dialog__actions">
              <button
                type="button"
                className="reset-confirm-dialog__btn reset-confirm-dialog__btn--cancel"
                onClick={closeResetDialog}
              >
                Cancel
              </button>
              <button
                type="button"
                className="reset-confirm-dialog__btn reset-confirm-dialog__btn--danger"
                disabled={resetConfirmText.trim() !== RESET_CONFIRM_PHRASE}
                onClick={confirmResetCounts}
              >
                Reset counts
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bottom-pick-panel__researcher-bar">
        <button
          type="button"
          className="bottom-pick-panel__chart-toggle bottom-pick-panel__chart-toggle--reset"
          onClick={openResetDialog}
        >
          Reset counts to zero
        </button>
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
