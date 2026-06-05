type PillSelectProps = {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
}

export function PillSelect({ label, options, value, onChange }: PillSelectProps) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="mb-4 text-sm font-medium text-ink">{label}</legend>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const selected = value === option
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`pill-interactive inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm ${
                selected
                  ? 'border-cobalt bg-cobalt-tint text-ink'
                  : 'border-grid-border/30 bg-white/50 text-muted hover:border-grid-border hover:bg-white'
              }`}
            >
              <span
                className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
                  selected ? 'border-cobalt bg-cobalt' : 'border-muted/60 bg-white'
                }`}
              >
                {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </span>
              {option}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
