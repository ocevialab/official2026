import { Link } from 'react-router-dom'
import type { Project } from '../../data/projects'
import { ProjectImage } from '../ui/ProjectImage'

type ProjectCardProps = Pick<Project, 'slug' | 'title' | 'tags' | 'description' | 'images'>

export function ProjectCard({ slug, title, tags, description, images }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${slug}`}
      className="card-interactive group flex h-full flex-col overflow-hidden bg-cobalt-tint"
    >
      <div className="project-card-media relative overflow-hidden">
        <ProjectImage
          desktop={images.desktop}
          mobile={images.mobile}
          alt={`${title} project preview`}
          className="absolute inset-0 h-full w-full"
          imgClassName="h-full w-full object-cover object-center transition-transform duration-500 ease-out will-change-transform group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <h2 className="text-xl font-bold uppercase tracking-wide text-ink md:text-2xl">{title}</h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-grid-border/25 bg-white/70 px-3 py-1 text-xs font-medium text-ink transition group-hover:border-grid-border"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{description}</p>
      </div>
    </Link>
  )
}
