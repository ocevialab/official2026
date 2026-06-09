import { RevealSplit } from '../ui/Reveal'
import { SectionContainer } from '../ui/SectionContainer'

const statements = [
  {
    title: 'Our Vision',
    text: 'To be a globally recognized leader in innovation digital solutions, seamlessly bridging businesses with cutting-edge technology while empowering growth across industries.',
  },
  {
    title: 'Our Mission',
    text: 'Our mission is to empower businesses by providing innovative, cutting-edge IT solutions that drive growth, efficiency, and digital transformation. We are committed to exceeding expectations through unparalleled service, creativity, and excellence, fostering long-term partnerships with our clients worldwide.',
  },
]

export function AboutVisionMission() {
  return (
    <section className="w-full bg-white">
      <SectionContainer className="pb-0 pt-0">
        <RevealSplit className="card-grid grid grid-cols-1 md:grid-cols-2">
          {statements.map((item) => (
            <article key={item.title} className="card-interactive p-8 lg:p-12">
              <h3 className="text-xl font-bold uppercase tracking-tight text-ink md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">{item.text}</p>
            </article>
          ))}
        </RevealSplit>
      </SectionContainer>
    </section>
  )
}
