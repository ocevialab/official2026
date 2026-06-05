import about2 from '../../assets/about 2.jpeg'
import about3 from '../../assets/about 3.jpeg'
import { SectionContainer } from '../ui/SectionContainer'

export function AboutWhoWeAre() {
  return (
    <section className="w-full border-b border-grid-border bg-white">
      <SectionContainer className="animate-fade-in-up py-14 lg:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">Who we are</h2>

        <div className="card-grid mt-10 grid grid-cols-1 md:grid-cols-[3fr_2fr]">
          <div className="group aspect-[4/3] w-full overflow-hidden md:aspect-[5/4]">
            <img
              src={about2}
              alt="Ocevia Lab team at work"
              className="img-hover-zoom h-full w-full object-cover"
            />
          </div>
          <div className="group aspect-[3/4] w-full overflow-hidden md:aspect-auto md:min-h-full">
            <img
              src={about3}
              alt="Ocevia Lab collaboration"
              className="img-hover-zoom h-full w-full object-cover"
            />
          </div>
        </div>

        <p className="mt-10 text-base leading-relaxed text-muted md:text-lg">
          Ocevia Lab is a software engineering studio built by practitioners who care about craft.
          We combine product thinking, modern stacks, and transparent delivery so your team can ship
          faster—with code you can trust and architecture that scales as you grow. At Ocevia Lab, we
          bridge creativity and technology to help brands stand out online. We&apos;re a boutique
          team of designers, developers, and strategists driven by one goal — to deliver digital
          solutions that not only look good but work perfectly. From our studio in Sri Lanka, we build
          for the world. Our global mindset allows us to partner with clients across the globe,
          delivering world-class digital solutions with the insight and value of a dedicated
          boutique team.

          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">We believe in:</p>
          <ul className="pl-4 text-base leading-relaxed text-muted md:text-lg">
            <li>✨ Design that inspires</li>
            <li>⚙️ Technology that works</li>
            <li>🤝 Partnerships that last</li>
          </ul>
        </p>
      </SectionContainer>
    </section>
  )
}
