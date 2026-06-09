import aboutTeam from '../../assets/about 1.jpg'

const steps = [
  {
    number: '01',
    title: 'Discover & align',
    description:
      'We run focused workshops to map goals, users, and success metrics—so every sprint ties back to business outcomes.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Design the roadmap',
    description:
      'Architecture, milestones, and delivery plans are shaped with your team—fixed scope, phased releases, or a dedicated squad.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6h16M4 12h10M4 18h16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect x="16" y="9" width="5" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Build in sprints',
    description:
      'Weekly demos, shared boards, and direct access to senior engineers keep momentum high and feedback loops short.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 6l-2 4h4l-2-4zm6 0l-2 4h4l-2-4zM6 14h12v4H6v-4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Launch & iterate',
    description:
      'We ship to production, monitor performance, and stay alongside your team to refine, scale, and improve over time.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 14l4-4 3 3 7-7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M19 6v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

export function HowWeWorkSection() {
  return (
    <div className="card-grid grid w-full grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
      <div className="relative flex items-center justify-center bg-cobalt-tint p-8 lg:p-12">
        <div className="how-we-work-glow relative w-full max-w-md lg:max-w-none">
          <div className="overflow-hidden border border-grid-border bg-white">
            <img
              src={aboutTeam}
              alt="Ocevia Lab team collaborating on a project"
              className="aspect-[4/5] w-full object-cover object-center lg:aspect-[3/4]"
            />
          </div>

          <div className="absolute -right-2 bottom-8 left-8 border border-grid-border bg-white p-4 sm:right-6 sm:left-auto sm:w-56 lg:bottom-10 lg:right-8">
            <span className="grid-label">Weekly demos</span>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              See working software every sprint—not slide decks.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-grid-border bg-white">
        {steps.map((step) => (
          <div
            key={step.number}
            className="group flex gap-5 p-6 transition-colors hover:bg-cobalt-tint lg:gap-6 lg:p-8"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-grid-border bg-accent text-white transition-colors group-hover:bg-cobalt">
              {step.icon}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-bold tracking-widest text-cobalt">{step.number}</span>
                <h3 className="text-lg font-bold uppercase tracking-tight text-ink">{step.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
