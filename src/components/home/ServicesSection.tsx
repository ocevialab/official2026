import { Link } from 'react-router-dom'
import { homeServices } from '../../data/services'
import { SectionContainer } from '../ui/SectionContainer'
import { SectionHeader } from '../ui/SectionHeader'

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 15L15 5M15 5H8M15 5V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ServiceCard({
  number,
  title,
  to,
}: {
  number: string
  title: string
  to: string
}) {
  return (
    <Link
      to={to}
      className="card-interactive group flex min-h-[280px] flex-col p-6 sm:min-h-[300px] lg:min-h-[320px] lg:p-8"
    >
      <div className="flex justify-end">
        <ArrowIcon className="shrink-0 text-ink transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
      </div>

      <h3 className="mt-6 max-w-[12rem] text-lg font-bold uppercase leading-snug tracking-tight text-ink lg:mt-8 lg:text-xl">
        {title}
      </h3>

      <div className="mt-auto flex items-end justify-between border-t border-grid-border pt-6">
        <span className="text-5xl font-bold leading-none tracking-tighter text-ink lg:text-6xl">
          {number}
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-grid-border bg-white text-ink transition group-hover:border-white group-hover:bg-white group-hover:text-accent">
          <ArrowIcon className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  )
}

export function ServicesSection() {
  return (
    <section className="animate-fade-in-up w-full bg-white">
      <SectionContainer>
        <div className="bento-stack">
          <SectionHeader
            title="Our Services"
            description="We partner with teams to design, build, and scale software that users trust. From discovery to production, our engineers ship with clarity and craft."
            buttonLabel="View all services"
            buttonTo="/services"
          />

          <div className="service-card-grid grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {homeServices.map((service) => (
              <ServiceCard key={service.number} {...service} />
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
