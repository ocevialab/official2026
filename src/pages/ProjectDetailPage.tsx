import { Link, useParams } from 'react-router-dom'
import { Reveal, RevealSplit } from '../components/ui/Reveal'
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
      <section className="w-full bg-white">
        <SectionContainer className="py-20 text-center">
          <h1 className="text-2xl font-bold uppercase text-ink">Project not found</h1>
          <Link to="/projects" className="mt-6 inline-block font-bold uppercase tracking-widest hover:underline">
            ← Back to projects
          </Link>
        </SectionContainer>
      </section>
    )
  }

  return (
    <div className="section-stack">
      <section className="w-full bg-white">
        <SectionContainer className="pt-8 pb-8 lg:pt-12">
          <Link
            to="/projects"
            className="mb-4 inline-flex text-xs font-bold uppercase tracking-widest text-muted transition hover:text-ink hover:underline"
          >
            ← Back to projects
          </Link>
          <Reveal variant="clip" className="group aspect-[21/9] w-full overflow-hidden border border-grid-border">
            <img
              src={project.images.detail}
              alt={`${project.title} project hero`}
              className="img-hover-zoom h-full w-full object-cover object-center"
            />
          </Reveal>
        </SectionContainer>
      </section>

      <section className="w-full bg-white">
        <SectionContainer className="py-14 lg:py-20">
          <RevealSplit className="card-grid grid grid-cols-1 lg:grid-cols-[1.5fr_1fr]">
            <div className="p-8 lg:p-12">
              <h1 className="text-3xl font-bold uppercase tracking-tight text-ink md:text-4xl lg:text-5xl">
                {project.title}
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
                  className="mt-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink transition hover:bg-accent"
                >
                  View Preview
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>

            <aside className="border-t border-grid-border p-8 lg:border-t-0 lg:p-12">
              <h2 className="text-sm font-bold uppercase tracking-widest text-ink">Project Info</h2>
              <dl className="mt-8 space-y-8">
                <div>
                  <dt className="grid-label">Category</dt>
                  <dd className="mt-3 text-base text-ink">{project.info.category}</dd>
                </div>
                <div>
                  <dt className="grid-label">Location</dt>
                  <dd className="mt-3 text-base text-ink">{project.info.location}</dd>
                </div>
                <div>
                  <dt className="grid-label">Dated</dt>
                  <dd className="mt-3 text-base text-ink">{project.info.dated}</dd>
                </div>
              </dl>
            </aside>
          </RevealSplit>
        </SectionContainer>
      </section>
    </div>
  )
}
