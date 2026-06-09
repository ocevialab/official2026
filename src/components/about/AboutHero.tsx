import about1 from '../../assets/about 1.jpg'
import about2 from '../../assets/about 2.jpeg'
import about3 from '../../assets/about 3.jpeg'
import { RevealSplit, RevealStagger } from '../ui/Reveal'
import { SectionContainer } from '../ui/SectionContainer'

const aboutImages = [
  {
    src: about1,
    alt: 'Ocevia Lab studio workspace',
    className: 'about-hero-feature',
  },
  {
    src: about2,
    alt: 'Ocevia Lab team at work',
    className: '',
  },
  {
    src: about3,
    alt: 'Ocevia Lab collaboration session',
    className: '',
  },
] as const

export function AboutHero() {
  return (
    <section className="about-hero-section w-full bg-white">
      <SectionContainer className="about-hero-inner">
        <div className="about-hero-stack">
          <RevealSplit className="card-grid grid shrink-0 grid-cols-1 md:grid-cols-2">
            <h1 className="p-4 text-xl font-bold uppercase leading-tight tracking-tight text-ink sm:p-5 sm:text-2xl md:p-6 md:text-3xl lg:p-8 lg:text-4xl">
              Discover our journey and what drives us
            </h1>
            <p className="p-4 text-sm leading-relaxed text-muted sm:p-5 md:p-6 md:text-base lg:p-8 lg:text-lg">
              Founded by engineers, we create cutting-edge software platforms tailored for startups
              and enterprises—combining clean design, reliable code, and measurable outcomes.
            </p>
          </RevealSplit>

          <RevealStagger className="card-grid about-hero-grid grid min-h-0 w-full flex-1">
            {aboutImages.map((image) => (
              <div
                key={image.alt}
                className={`group h-full min-h-0 overflow-hidden ${image.className}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="img-hover-zoom h-full w-full object-cover"
                />
              </div>
            ))}
          </RevealStagger>
        </div>
      </SectionContainer>
    </section>
  )
}
