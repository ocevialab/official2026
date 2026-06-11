import { useEffect, useRef } from 'react'
import { HowWeWorkSection } from '../components/services/HowWeWorkSection'
import { ServicePageCard } from '../components/services/ServicePageCard'
import { PageSection } from '../components/ui/PageSection'
import { RevealStagger } from '../components/ui/Reveal'
import { services } from '../data/services'
import { bindCardTilt } from '../lib/cardTilt'

export function ServicesPage() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = cardsRef.current
    if (!root) return

    const cards = root.querySelectorAll<HTMLElement>('.service-card')
    const cleanups = Array.from(cards).map((card) => bindCardTilt(card))

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <div className="section-stack">
      <PageSection
        title="Our Services"
        description="Full-stack software engineering for teams at every stage. We combine product thinking with deep technical execution so you ship faster without sacrificing quality."
        buttonLabel="Request a Proposal"
        buttonTo="/contact"
      >
        <div ref={cardsRef}>
          <RevealStagger className="card-grid services-page-grid grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
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
          </RevealStagger>
        </div>
      </PageSection>

      <section className="w-full bg-white">
        <HowWeWorkSection
          title="How We Work"
          description="No confusion or delays—just a clear process from discovery to launch. We adapt to your stage with workshops, MVPs, or dedicated squads."
          buttonLabel="WhatsApp US"
          buttonHref="https://wa.me/1234567890"
        />
      </section>
    </div>
  )
}
