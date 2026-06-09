import about1 from '../../assets/about 1.jpg'
import { Reveal, RevealSplit } from '../ui/Reveal'
import { SectionContainer } from '../ui/SectionContainer'

export function AboutHero() {
  return (
    <section className="w-full bg-white">
      <SectionContainer className="py-14 lg:py-20">
        <div className="bento-stack">
          <RevealSplit className="card-grid grid grid-cols-1 md:grid-cols-2">
            <h1 className="p-8 text-3xl font-bold uppercase leading-tight tracking-tight text-ink md:text-4xl lg:p-12 lg:text-5xl">
              Discover our journey and what drives us
            </h1>
            <p className="p-8 text-base leading-relaxed text-muted md:text-lg lg:p-12">
              Founded by engineers, we create cutting-edge software platforms tailored for startups
              and enterprises—combining clean design, reliable code, and measurable outcomes.
            </p>
          </RevealSplit>

          <Reveal
            variant="clip"
            className="group aspect-[21/9] w-full overflow-hidden border border-grid-border"
          >
            <img
              src={about1}
              alt="Ocevia Lab team"
              className="img-hover-zoom h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </SectionContainer>
    </section>
  )
}
