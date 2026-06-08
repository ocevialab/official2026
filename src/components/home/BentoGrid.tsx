import { Link } from 'react-router-dom'
import { homeBentoProjects, type Project } from '../../data/projects'
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
  project: Project
  className?: string
}

function BentoCard({ project, className = '' }: BentoCardProps) {
  const { slug, title, tags, images, info } = project
  const label = tags[0] ?? info.category

  return (
    <Link
      to={`/projects/${slug}`}
      className={`card-interactive group relative flex min-h-[calc(100dvh-var(--header-height))] flex-col overflow-hidden bg-cobalt-tint text-ink md:h-full md:min-h-0 ${className}`}
    >
      <ProjectImage
        desktop={images.desktop}
        mobile={images.mobile}
        alt={`${title} project preview`}
        className="absolute inset-0 h-full w-full"
        imgClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/10"
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full min-h-0 flex-col justify-between p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/90">
            {label}
          </span>
          <span className="text-white">
            <ArrowIcon />
          </span>
        </div>

        <h3 className="mt-auto text-2xl font-bold text-white md:text-3xl lg:text-4xl">{title}</h3>
      </div>
    </Link>
  )
}

export function BentoGrid() {
  const { tall, feature, compact } = homeBentoProjects

  return (
    <section className="animate-fade-in-up stagger-1 w-full border-b border-grid-border bg-white">
      <SectionContainer className="pb-8 lg:pb-12">
        <SectionHeader
          title="Our Projects"
          description="Explore selected work across web, mobile, and brand experiences. Each tile opens a case study from our client portfolio."
          buttonLabel="See all projects"
          buttonTo="/projects"
        />

        <div className="card-grid bento-grid grid w-full grid-cols-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-2">
          <BentoCard project={tall} className="md:col-span-1 md:row-span-2" />
          <BentoCard project={feature} className="lg:col-span-2" />
          {compact.map((project) => (
            <BentoCard key={project.slug} project={project} />
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
