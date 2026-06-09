import { Reveal, RevealStagger } from '../ui/Reveal'
import { SectionContainer } from '../ui/SectionContainer'

function StarRating() {
  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex gap-0.5 text-ink" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.26l-4.94 2.45.94-5.5-4-3.9 5.53-.8L10 1.5z" />
          </svg>
        ))}
      </div>
      <p className="text-sm font-medium text-ink">
        <span className="font-bold">4.8/5</span>{' '}
        <span className="text-muted">from our clients</span>
      </p>
    </div>
  )
}

const stats = [
  {
    value: '95%',
    label: 'Client satisfaction rate, reflecting our dedication to quality delivery.',
  },
  {
    value: '10+',
    label: 'Years of innovation and insight across product and platform engineering.',
  },
  {
    value: '40+',
    label: 'Projects delivered with secure, scalable, and maintainable architecture.',
  },
  {
    value: '30+',
    label: 'Teams worldwide partnered with for long-term technical success.',
  },
]

export function AboutMission() {
  return (
    <section className="w-full bg-white">
      <SectionContainer className="pb-8 lg:pb-12">
        <div className="bento-stack">
          <Reveal className="relative pb-10 pt-0 lg:pb-16 lg:pt-0">
            <div className="absolute right-0 top-0 hidden md:block">
              <StarRating />
            </div>

            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold uppercase leading-snug tracking-tight text-ink md:text-3xl lg:text-4xl">
                We are passionate about empowering individuals and businesses to build software that
                scales, performs, and lasts.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
                At Ocevia Lab, we blend product thinking with deep engineering craft. Every sprint,
                every release, and every line of code is aimed at helping our partners ship with
                confidence and grow without technical debt holding them back.
              </p>
            </div>

            <div className="mt-8 md:hidden">
              <StarRating />
            </div>
          </Reveal>

          <RevealStagger className="card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.value} className="card-interactive px-6 py-10 lg:px-10 lg:py-12">
                <p className="text-4xl font-bold tracking-tight text-ink md:text-5xl">{stat.value}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{stat.label}</p>
              </div>
            ))}
          </RevealStagger>
        </div>
      </SectionContainer>
    </section>
  )
}
