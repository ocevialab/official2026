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
      className={`card-interactive card-media group relative flex min-h-[calc(100dvh-var(--header-height))] flex-col overflow-hidden md:h-full md:min-h-0 ${className}`}
    >
      <ProjectImage
        desktop={images.desktop}
        mobile={images.mobile}
        alt={`${title} project preview`}
        className="absolute inset-0 h-full w-full"
        imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        aria-hidden
      />

      <div className="relative z-20 mt-auto p-5 lg:p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="grid-label">{label}</span>
            <h3 className="hero-text-shadow mt-3 text-xl font-bold uppercase tracking-tight text-white md:text-2xl lg:text-3xl">
              {title}
            </h3>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/40 bg-accent text-white transition group-hover:bg-brand-navy group-hover:text-white">
            <ArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function BentoGrid() {
  const { tall, feature, compact } = homeBentoProjects

  return (
    <section className="animate-fade-in-up stagger-1 w-full bg-white">
      <SectionContainer>
        <div className="bento-stack">
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
        </div>
      </SectionContainer>
    </section>
  )
}
