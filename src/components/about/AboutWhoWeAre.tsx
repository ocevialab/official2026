import about4 from '../../assets/about4.jpg'
import { RevealSplit } from '../ui/Reveal'
import { SectionContainer } from '../ui/SectionContainer'

export function AboutWhoWeAre() {
  return (
    <section className="w-full bg-white">
      <SectionContainer className="pb-0">
        <RevealSplit className="card-grid grid w-full grid-cols-1 lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-ink md:text-4xl">
              Who we are
            </h2>

            <div className="mt-6 text-base leading-relaxed text-muted md:mt-8 md:text-lg">
              <p>
                Ocevia Lab is a software engineering studio built by practitioners who care about
                craft. We combine product thinking, modern stacks, and transparent delivery so your
                team can ship faster—with code you can trust and architecture that scales as you grow.
              </p>
              <p className="mt-4">
                From our studio in Sri Lanka, we partner with teams worldwide—designers, developers,
                and strategists focused on digital solutions that look sharp and work reliably.
              </p>

              <p className="mt-6 font-bold uppercase tracking-widest text-ink">We believe in:</p>
              <ul className="mt-3 space-y-2 pl-4">
                <li>✨ Design that inspires</li>
                <li>⚙️ Technology that works</li>
                <li>🤝 Partnerships that last</li>
              </ul>
            </div>
          </div>

          <div className="overflow-hidden aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto lg:h-full">
            <img
              src={about4}
              alt="Ocevia Lab engineers at work"
              className="img-hover-zoom h-full w-full object-cover"
            />
          </div>
        </RevealSplit>
      </SectionContainer>
    </section>
  )
}
