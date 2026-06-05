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
            className={`pill-interactive rounded-full border px-4 py-2 text-sm font-medium ${
              isActive
                ? 'border-cobalt bg-cobalt text-white'
                : 'border-grid-border/30 bg-cobalt-tint text-ink hover:border-grid-border hover:bg-white'
            }`}
          >
            {filter}
          </button>
        )
      })}
    </div>
  )
}
