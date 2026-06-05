import { Link, useParams } from 'react-router-dom'
import { SectionContainer } from '../components/ui/SectionContainer'
import { getProjectBySlug } from '../data/projects'

function renderParagraph(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) {
    return (
      <section className="w-full border-b border-grid-border bg-white">
        <SectionContainer className="py-20 text-center">
          <h1 className="text-2xl font-bold text-ink">Project not found</h1>
          <Link to="/projects" className="mt-6 inline-block text-cobalt hover:underline">
            ← Back to projects
          </Link>
        </SectionContainer>
      </section>
    )
  }

  return (
    <>
      <section className="w-full border-b border-grid-border bg-white">
        <SectionContainer className="pt-8 pb-8 lg:pt-12">
          <Link
            to="/projects"
            className="mb-4 inline-flex text-sm font-medium text-muted transition hover:text-cobalt"
          >
            ← Back to projects
          </Link>
          <div className="group aspect-[21/9] w-full overflow-hidden rounded-xl">
            <img
              src={project.images.detail}
              alt={`${project.title} project hero`}
              className="img-hover-zoom h-full w-full object-cover object-center"
            />
          </div>
        </SectionContainer>
      </section>

      <section className="w-full border-b border-grid-border bg-white">
        <SectionContainer className="py-14 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <h1 className="text-3xl font-bold lowercase text-ink md:text-4xl lg:text-5xl">
                {project.title.toLowerCase()}
              </h1>
              <div className="mt-8 space-y-6 text-base leading-relaxed text-muted md:text-lg">
                {project.longDescription.map((paragraph) => (
                  <p key={paragraph}>{renderParagraph(paragraph)}</p>
                ))}
              </div>
              {project.previewUrl && (
                <a
                  href={project.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-2 text-base font-medium text-ink transition hover:text-cobalt"
                >
                  View Preview
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>

            <aside className="card-interactive border-t border-grid-border bg-cobalt-tint pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12 lg:pr-4">
              <h2 className="text-lg font-semibold text-ink">Project Info –</h2>
              <dl className="mt-8 space-y-8">
                <div>
                  <dt className="text-sm font-semibold text-cobalt">Category:</dt>
                  <dd className="mt-2 text-base text-ink">{project.info.category}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-cobalt">Location:</dt>
                  <dd className="mt-2 text-base text-ink">{project.info.location}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-cobalt">Dated:</dt>
                  <dd className="mt-2 text-base text-ink">{project.info.dated}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </SectionContainer>
      </section>
    </>
  )
}
