import { PageSection } from '../components/ui/PageSection'

const services = [
  {
    name: 'Web design & Development',
    detail:
      'React, Node.js, and cloud backends tailored to your product vision with iterative releases and transparent milestones.',
  },
  {
    name: 'Mobile Application design & Development',
    detail:
      'REST and GraphQL APIs, event-driven architectures, and integration layers that connect your business systems securely.',
  },
  {
    name: 'Management Syetem Development',
    detail:
      'Pixel-accurate frontends, design systems, and accessible interfaces that perform across devices and browsers.',
  },
  {
    name: 'IT & Digital Solutions',
    detail:
      'Test automation, performance tuning, and release pipelines that keep regressions out of production.',
  },
  {
    name: 'SEO',
    detail:
      'Test automation, performance tuning, and release pipelines that keep regressions out of production.',
  },
  {
    name: 'Digital Marketing',
    detail:
      'Test automation, performance tuning, and release pipelines that keep regressions out of production.',
  },
]

export function ServicesPage() {
  return (
    <div className="section-stack">
      <PageSection
        title="Our Services"
        description="Full-stack software engineering for teams at every stage. We combine product thinking with deep technical execution so you ship faster without sacrificing quality."
        buttonLabel="Request a Proposal"
        buttonTo="/contact"
      >
        <div className="service-card-grid grid w-full grid-cols-1 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.name} className="card-interactive p-8 lg:p-10">
              <h3 className="text-xl font-bold uppercase tracking-tight text-ink">{service.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{service.detail}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="How We Work"
        description="Discovery workshops, fixed-scope MVPs, or dedicated squads—we adapt to your stage. Weekly demos, shared boards, and direct access to senior engineers keep momentum high."
        buttonLabel="WhatsApp US"
        buttonHref="https://wa.me/1234567890"
      >
        <ol className="card-grid grid w-full grid-cols-1">
          {[
            'Align on goals, users, and success metrics',
            'Design architecture and delivery roadmap',
            'Build in sprints with continuous feedback',
            'Launch, monitor, and iterate with your team',
          ].map((step, i) => (
            <li key={step} className="card-interactive flex gap-6 p-8 lg:p-10">
              <span className="text-3xl font-bold text-ink">{String(i + 1).padStart(2, '0')}</span>
              <p className="pt-2 text-base text-ink">{step}</p>
            </li>
          ))}
        </ol>
      </PageSection>
    </div>
  )
}
