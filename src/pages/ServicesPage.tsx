import { ServicePageCard } from '../components/services/ServicePageCard'
import { PageSection } from '../components/ui/PageSection'
import { services } from '../data/services'

export function ServicesPage() {
  return (
    <div className="section-stack">
      <PageSection
        title="Our Services"
        description="Full-stack software engineering for teams at every stage. We combine product thinking with deep technical execution so you ship faster without sacrificing quality."
        buttonLabel="Request a Proposal"
        buttonTo="/contact"
      >
        <div className="card-grid services-page-grid grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServicePageCard
              key={service.number}
              number={service.number}
              title={service.name}
              detail={service.detail}
              image={service.image}
              imageAlt={service.imageAlt}
            />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="How We Work"
        description="Discovery workshops, fixed-scope MVPs, or dedicated squads—we adapt to your stage. Weekly demos, shared boards, and direct access to senior engineers keep momentum high."
        buttonLabel="WhatsApp US"
        buttonHref="https://wa.me/1234567890"
      >
        <div className="card-grid grid w-full grid-cols-1 md:grid-cols-2">
          {[
            'Align on goals, users, and success metrics',
            'Design architecture and delivery roadmap',
            'Build in sprints with continuous feedback',
            'Launch, monitor, and iterate with your team',
          ].map((step, i) => (
            <div
              key={step}
              className="card-interactive flex gap-6 p-8 lg:flex-col lg:gap-4 lg:p-10"
            >
              <span className="text-4xl font-bold leading-none text-cobalt lg:text-5xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-base leading-relaxed text-ink lg:pt-1">{step}</p>
            </div>
          ))}
        </div>
      </PageSection>
    </div>
  )
}
