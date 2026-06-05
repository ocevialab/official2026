import about1 from '../../assets/about 1.jpg'
import { SectionContainer } from '../ui/SectionContainer'

export function AboutHero() {
  return (
    <section className="w-full border-b border-grid-border bg-white">
      <SectionContainer className="py-14 lg:py-20">
        <div className="animate-fade-in-up grid gap-8 md:grid-cols-2 md:items-start md:gap-12">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
            Discover our journey and what drives us
          </h1>
          <p className="text-base leading-relaxed text-muted md:text-lg">
            Founded by engineers, we create cutting-edge software platforms tailored for startups
            and enterprises—combining clean design, reliable code, and measurable outcomes.
          </p>
        </div>

        <div className="group mt-10 aspect-[21/9] w-full overflow-hidden rounded-xl">
          <img
            src={about1}
            alt="Ocevia Lab team"
            className="img-hover-zoom h-full w-full object-cover"
          />
        </div>
      </SectionContainer>
    </section>
  )
}
