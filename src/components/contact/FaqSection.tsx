import { useState } from 'react'
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
      'Book a call through our contact form. We’ll discuss your goals, timeline, and budget, then share a tailored proposal with clear next steps.',
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
    <div className="border-b border-grid-border">
      <button
        type="button"
        onClick={onToggle}
        className={`group flex w-full items-start gap-6 px-2 py-6 text-left transition lg:gap-10 lg:px-4 lg:py-8 ${
          isOpen
            ? 'rounded-xl border border-grid-border bg-white shadow-sm'
            : 'hover:bg-cobalt-tint/60'
        }`}
        aria-expanded={isOpen}
      >
        <span className="shrink-0 pt-0.5 font-semibold text-sm text-muted">{number}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-semibold text-ink md:text-xl">{item.question}</span>
          {isOpen && (
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{item.answer}</p>
          )}
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-grid-border text-lg leading-none transition duration-300 ${
            isOpen ? 'rotate-90 bg-ink text-white' : 'bg-white text-ink group-hover:border-cobalt'
          }`}
          aria-hidden="true"
        >
          {isOpen ? '×' : '+'}
        </span>
      </button>
    </div>
  )
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="w-full border-b border-grid-border bg-white">
      <SectionContainer className="animate-fade-in-up py-14 lg:py-20">
        <h2 className=" text-3xl font-normal uppercase tracking-wide text-ink md:text-4xl lg:text-5xl">
          Frequently asked questions (FAQs)
        </h2>

        <div className="mt-10 border-t border-grid-border">
          {faqs.map((item, index) => (
            <FaqAccordionItem
              key={item.question}
              index={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
