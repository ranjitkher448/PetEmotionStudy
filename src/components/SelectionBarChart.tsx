type SelectionBarChartProps = {
  counts: readonly [number, number, number, number]
}

export function SelectionBarChart({ counts }: SelectionBarChartProps) {
  const max = Math.max(...counts, 1)
  const label = `Picture selections: ${counts.map((c, i) => `option ${i + 1}: ${c}`).join(', ')}`

  return (
    <div className="selection-bar-chart" role="img" aria-label={label}>
      {counts.map((count, index) => {
        const pct = (count / max) * 100
        return (
          <div key={index} className="selection-bar-chart__col">
            <div className="selection-bar-chart__track">
              <div
                className={`selection-bar-chart__bar selection-bar-chart__bar--pick-${index}`}
                style={{ height: `${pct}%` }}
              />
            </div>
            <span className="selection-bar-chart__value" aria-hidden>
              {count}
            </span>
          </div>
        )
      })}
    </div>
  )
}
