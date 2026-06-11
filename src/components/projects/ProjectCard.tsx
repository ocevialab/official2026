import { Link } from 'react-router-dom'
import type { Project } from '../../data/projects'
import { ProjectImage } from '../ui/ProjectImage'

type ProjectCardProps = Pick<Project, 'slug' | 'title' | 'tags' | 'description' | 'images'>

export function ProjectCard({ slug, title, tags, description, images }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${slug}`}
      className="premium-card card-interactive group flex h-full flex-col overflow-hidden"
    >
      <div className="project-card-media reveal-clip-target">
        <ProjectImage
          desktop={images.desktop}
          mobile={images.mobile}
          alt={`${title} project preview`}
          className="h-full w-full"
          imgClassName="img-hover-zoom h-full w-full object-cover object-center"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <h2 className="text-xl font-bold uppercase tracking-tight text-ink md:text-2xl">{title}</h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="grid-label">
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{description}</p>
      </div>
    </Link>
  )
}
