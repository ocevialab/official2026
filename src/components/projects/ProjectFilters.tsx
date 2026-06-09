import type { ProjectFilter } from '../../data/projects'
import { projectFilters } from '../../data/projects'

type ProjectFiltersProps = {
  active: ProjectFilter
  onChange: (filter: ProjectFilter) => void
}

export function ProjectFilters({ active, onChange }: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {projectFilters.map((filter) => {
        const isActive = active === filter
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            className={`pill-interactive border px-4 py-2 text-xs font-bold uppercase tracking-widest ${
              isActive
                ? 'border-grid-border bg-accent text-white'
                : 'border-grid-border bg-white text-ink'
            }`}
          >
            {filter}
          </button>
        )
      })}
    </div>
  )
}
