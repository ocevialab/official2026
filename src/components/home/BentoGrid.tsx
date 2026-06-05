import { Link } from 'react-router-dom'
import { bentoProjectsShowcase } from '../../data/projects'
import { ProjectImage } from '../ui/ProjectImage'
import { SectionContainer } from '../ui/SectionContainer'
import { SectionHeader } from '../ui/SectionHeader'

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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

type BentoCardProps = {
  label: string
  title: string
  to: string
  desktopImage?: string
  mobileImage?: string
  imageAlt?: string
  className?: string
  children?: React.ReactNode
}

function BentoCard({
  label,
  title,
  to,
  desktopImage,
  mobileImage,
  imageAlt,
  className = '',
  children,
}: BentoCardProps) {
  const hasImage = Boolean(desktopImage && mobileImage)

  return (
    <Link
      to={to}
      className={`card-interactive group relative flex min-h-[calc(100dvh-var(--header-height))] flex-col overflow-hidden bg-cobalt-tint text-ink md:h-full md:min-h-0 ${className}`}
    >
      {hasImage && (
        <>
          <ProjectImage
            desktop={desktopImage!}
            mobile={mobileImage!}
            alt={imageAlt ?? title}
            className="absolute inset-0 h-full w-full"
            imgClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/10"
            aria-hidden="true"
          />
        </>
      )}

      <div className="relative z-10 flex h-full min-h-0 flex-col justify-between p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <span
            className={`text-xs font-semibold uppercase tracking-widest ${hasImage ? 'text-white/90' : 'text-muted'}`}
          >
            {label}
          </span>
          <span className={hasImage ? 'text-white' : 'text-cobalt'}>
            <ArrowIcon />
          </span>
        </div>

        {children}

        <h3
          className={`mt-auto text-2xl font-bold md:text-3xl lg:text-4xl ${hasImage ? 'text-white' : 'text-ink'}`}
        >
          {title}
        </h3>
      </div>
    </Link>
  )
}

export function BentoGrid() {
  const showcase = bentoProjectsShowcase

  return (
    <section className="animate-fade-in-up stagger-1 w-full border-b border-grid-border bg-white">
      <SectionContainer className="pb-8 lg:pb-12">
        <SectionHeader
          title="Explore Ocevia Lab"
          description="Dive into our work, team, and ways to collaborate. Each tile links to a part of our studio built for modern software engineering."
          buttonLabel="See all projects"
          buttonTo="/projects"
        />

        <div className="card-grid bento-grid grid w-full grid-cols-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-2">
          <BentoCard
            label="More offers"
            title="There is something else for you"
            to="/services"
            className="md:col-span-1 md:row-span-2"
          >
            <div className="my-8 flex flex-1 items-center justify-center">
              <div className="h-32 w-32 rounded-full border border-grid-border/25 bg-white/80 shadow-inner transition group-hover:scale-105 md:h-40 md:w-40" />
            </div>
          </BentoCard>

          <BentoCard
            label="World of engineering"
            title="View our projects"
            to="/projects"
            desktopImage={showcase.images.desktop}
            mobileImage={showcase.images.mobile}
            imageAlt={`${showcase.title} project preview`}
            className="lg:col-span-2"
          />

          <BentoCard label="Discover our history" title="About us" to="/about" />

          <BentoCard label="Have some questions?" title="Contact us" to="/contact" />
        </div>
      </SectionContainer>
    </section>
  )
}
