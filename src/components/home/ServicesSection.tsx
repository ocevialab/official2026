import { Link } from 'react-router-dom'
import { SectionContainer } from '../ui/SectionContainer'
import { SectionHeader } from '../ui/SectionHeader'

const services = [
  {
    number: '01',
    tag: 'Engineering',
    title: 'Web design & Development',
    to: '/services',
  },
  {
    number: '02',
    tag: 'Cloud',
    title: 'Mobile Application design & Development',
    to: '/services',
  },
  {
    number: '03',
    tag: 'Design',
    title: 'Management Syetem Development',
    to: '/services',
  },
  {
    number: '04',
    tag: 'Strategy',
    title: 'IT & Digital Solutions',
    to: '/services',
  },
]

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="50"
      height="50"
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
  tag,
  title,
  to,
}: {
  number: string
  tag: string
  title: string
  to: string
}) {
  return (
    <Link
      to={to}
      className="card-interactive group flex min-h-[300px] flex-col bg-cobalt-tint p-6 text-ink sm:min-h-[340px] lg:min-h-[360px] lg:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full border border-grid-border/25 bg-white/60 px-3 py-1 text-xs font-medium text-ink transition group-hover:border-grid-border">
          {tag}
        </span>
        <ArrowIcon className="shrink-0 text-cobalt transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      <h3 className="mt-10 max-w-[12rem] text-xl font-bold leading-snug tracking-tight text-ink lg:mt-12 lg:text-2xl">
        {title}
      </h3>

      <div className="mt-auto flex items-end justify-between pt-10">
        <span className="text-6xl font-light leading-none tracking-tighter text-ink lg:text-7xl">
          {number}
        </span>
        <span className="flex h-9 w-14 items-center justify-center rounded-full border border-grid-border/30 bg-white/70 transition group-hover:border-cobalt group-hover:bg-white">
          <ArrowIcon className="h-3.5 w-3.5 text-cobalt" />
        </span>
      </div>
    </Link>
  )
}

export function ServicesSection() {
  return (
    <section className="animate-fade-in-up w-full border-b border-grid-border bg-white">
      <SectionContainer className="pb-8 lg:pb-12">
        <SectionHeader
          title="Our Services"
          description="We partner with teams to design, build, and scale software that users trust. From discovery to production, our engineers ship with clarity and craft."
          buttonLabel="View all services"
          buttonTo="/services"
        />

        <div className="card-grid grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.number} {...service} />
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
