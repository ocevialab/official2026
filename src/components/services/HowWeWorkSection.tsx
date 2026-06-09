import { useEffect, useRef, useState } from 'react'
import aboutDiscover from '../../assets/about 1.jpg'
import aboutDesign from '../../assets/about 2.jpeg'
import aboutBuild from '../../assets/about 3.jpeg'
import aboutLaunch from '../../assets/about 4.jpg'

const STEP_DURATION_MS = 3500

const steps = [
  {
    number: '01',
    title: 'Discover & align',
    description:
      'We run focused workshops to map goals, users, and success metrics—so every sprint ties back to business outcomes.',
    image: aboutDiscover,
    imageAlt: 'Team workshop aligning on product goals and success metrics',
    callout: 'Discovery workshops',
    calloutDetail: 'Map goals, users, and metrics before a single line of code.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Design the roadmap',
    description:
      'Architecture, milestones, and delivery plans are shaped with your team—fixed scope, phased releases, or a dedicated squad.',
    image: aboutDesign,
    imageAlt: 'Planning session for architecture and delivery roadmap',
    callout: 'Delivery roadmap',
    calloutDetail: 'Architecture, milestones, and scope shaped with your team.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6h16M4 12h10M4 18h16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect x="16" y="9" width="5" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Build in sprints',
    description:
      'Weekly demos, shared boards, and direct access to senior engineers keep momentum high and feedback loops short.',
    image: aboutBuild,
    imageAlt: 'Engineering team building software in agile sprints',
    callout: 'Weekly demos',
    calloutDetail: 'See working software every sprint—not slide decks.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 6l-2 4h4l-2-4zm6 0l-2 4h4l-2-4zM6 14h12v4H6v-4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Launch & iterate',
    description:
      'We ship to production, monitor performance, and stay alongside your team to refine, scale, and improve over time.',
    image: aboutLaunch,
    imageAlt: 'Product launch and ongoing iteration with the client team',
    callout: 'Launch & scale',
    calloutDetail: 'Ship, monitor, and refine alongside your team.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 14l4-4 3 3 7-7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M19 6v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

export function HowWeWorkSection() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length)
    }, STEP_DURATION_MS)

    return () => window.clearInterval(timer)
  }, [isVisible])

  const progressPercent = ((activeStep + 1) / steps.length) * 100
  const activeStepData = steps[activeStep]

  return (
    <div
      ref={sectionRef}
      className="card-grid grid w-full grid-cols-1 lg:grid-cols-[1.05fr_1fr] lg:items-stretch"
    >
      <div className="relative min-h-72 sm:min-h-80 lg:min-h-0">
        {steps.map((step, index) => (
          <img
            key={step.number}
            src={step.image}
            alt={step.imageAlt}
            className={`how-we-work-image absolute inset-0 h-full w-full object-cover ${
              index === activeStep ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-rich-black/35 via-transparent to-transparent" />

        <div className="absolute right-4 bottom-4 left-4 border border-grid-border bg-white p-4 sm:left-auto sm:w-56 lg:right-6 lg:bottom-6">
          <span className="grid-label">{activeStepData.callout}</span>
          <p className="mt-3 text-sm leading-relaxed text-muted transition-opacity duration-500">
            {activeStepData.calloutDetail}
          </p>
        </div>
      </div>

      <div className="flex min-h-0 bg-white">
        <div
          className="relative w-10 shrink-0 border-r border-grid-border sm:w-12"
          aria-hidden="true"
        >
          <div className="absolute inset-y-6 left-1/2 w-px -translate-x-1/2 bg-grid-border/40">
            <div
              className="how-we-work-progress-fill w-full bg-accent"
              style={{ height: `${progressPercent}%` }}
            />
          </div>

          {steps.map((step, index) => {
            const isReached = index <= activeStep

            return (
              <span
                key={step.number}
                className={`how-we-work-progress-dot absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 border border-grid-border transition-transform duration-500 ${
                  isReached ? 'scale-125 bg-accent' : 'bg-white'
                }`}
                style={{ top: `${((index + 0.5) / steps.length) * 100}%` }}
              />
            )
          })}
        </div>

        <div className="flex min-w-0 flex-1 flex-col divide-y divide-grid-border">
          {steps.map((step, index) => {
            const isActive = index === activeStep

            return (
              <div
                key={step.number}
                className={`group flex flex-1 gap-5 p-6 transition-colors duration-500 lg:gap-6 lg:p-8 ${
                  isActive ? 'bg-step-highlight' : 'bg-white hover:bg-step-highlight/35'
                }`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center border border-grid-border text-white transition-colors duration-500 ${
                    isActive ? 'bg-cobalt' : 'bg-accent group-hover:bg-cobalt'
                  }`}
                >
                  {step.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-bold tracking-widest text-cobalt">{step.number}</span>
                    <h3 className="text-lg font-bold uppercase tracking-tight text-ink">{step.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
