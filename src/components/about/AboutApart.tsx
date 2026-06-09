import { SectionContainer } from '../ui/SectionContainer'

function FeatureIcon() {
  return (
    <div className="mb-6 flex h-10 w-10 items-center justify-center border border-grid-border bg-accent text-white">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3L4 9v12h16V9l-8-6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

const features = [
  {
    title: 'Product Strategy',
    description:
      'We align engineering roadmaps with business goals—scoping MVPs, defining architecture, and planning releases that de-risk delivery from day one.',
  },
  {
    title: 'Quality & Security',
    description:
      'Typed codebases, automated testing, and secure-by-default practices keep your platform stable as users, data, and integrations grow.',
  },
  {
    title: 'Scalable Architecture',
    description:
      'Cloud-native systems designed to scale horizontally—APIs, observability, and infrastructure that evolve with your product without costly rewrites.',
  },
]

export function AboutApart() {
  return (
    <section className="w-full bg-white">
      <SectionContainer className="pb-8 lg:pb-12">
        <div className="bento-stack">
          <div className="py-14 text-center lg:py-20">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-ink md:text-3xl lg:text-4xl">
              Discover what sets us apart
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              From first workshop to production launch, we bring clarity, craft, and partnership to
              every engagement—so your team can focus on what matters most.
            </p>
          </div>

          <div className="card-grid grid w-full grid-cols-1 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="card-interactive p-8 text-left lg:p-10">
                <FeatureIcon />
                <h3 className="text-xl font-bold uppercase tracking-tight text-ink">
                  {feature.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
