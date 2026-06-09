import { useState } from 'react'
import { Reveal, RevealStagger } from '../ui/Reveal'
import { SectionContainer } from '../ui/SectionContainer'

type FaqItem = {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    question: 'What services does Ocevia Lab provide?',
    answer:
      'We offer product engineering, UI/UX development, cloud and DevOps, and technical advisory—from discovery and design through build, launch, and long-term support.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Timelines depend on scope. MVPs often ship in 8–12 weeks; larger platforms are delivered in phased releases with weekly demos so you see progress throughout.',
  },
  {
    question: 'Do you work with startups and enterprises?',
    answer:
      'Yes. We partner with early-stage teams building their first product and with established companies modernizing platforms or scaling engineering capacity.',
  },
  {
    question: 'What is your engagement model?',
    answer:
      'We offer fixed-scope projects, dedicated squads, and advisory retainers. We align on goals, roadmap, and communication cadence before development begins.',
  },
  {
    question: 'How do we get started?',
    answer:
      "Book a call through our contact form. We'll discuss your goals, timeline, and budget, then share a tailored proposal with clear next steps.",
  },
]

function FaqAccordionItem({
  index,
  item,
  isOpen,
  onToggle,
}: {
  index: number
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
}) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <div className="border-b border-grid-border last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className={`group flex w-full items-start gap-6 px-6 py-6 text-left transition-colors duration-200 lg:gap-10 lg:px-8 lg:py-8 ${
          isOpen ? 'bg-accent text-white' : 'hover:bg-accent/15'
        }`}
        aria-expanded={isOpen}
      >
        <span
          className={`shrink-0 pt-0.5 text-sm font-bold ${isOpen ? 'text-white/80' : 'text-muted'}`}
        >
          {number}
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={`block text-lg font-bold uppercase tracking-tight md:text-xl ${
              isOpen ? 'text-white' : 'text-ink'
            }`}
          >
            {item.question}
          </span>
          <div className={`faq-panel ${isOpen ? 'faq-panel-open' : ''}`}>
            <div className="faq-panel-inner">
              <p className="mt-4 text-sm leading-relaxed text-white/90 md:text-base">{item.answer}</p>
            </div>
          </div>
        </span>
        <span
          className={`faq-toggle-icon flex h-9 w-9 shrink-0 items-center justify-center border text-lg leading-none ${
            isOpen
              ? 'faq-toggle-icon-open border-white/40 bg-white text-accent'
              : 'border-grid-border bg-white text-ink'
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
    </div>
  )
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="w-full bg-white">
      <SectionContainer className="py-14 lg:py-20">
        <div className="bento-stack">
          <Reveal>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-ink md:text-4xl lg:text-5xl">
              Frequently asked questions (FAQs)
            </h2>
          </Reveal>

          <RevealStagger className="card-grid border border-grid-border">
            {faqs.map((item, index) => (
              <FaqAccordionItem
                key={item.question}
                index={index}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </RevealStagger>
        </div>
      </SectionContainer>
    </section>
  )
}
