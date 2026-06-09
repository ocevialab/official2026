import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import aboutDiscover from '../../assets/about 1.jpg'
import aboutDesign from '../../assets/about 2.jpeg'
import aboutBuild from '../../assets/about 3.jpeg'
import aboutLaunch from '../../assets/about 4.jpg'
import {
  MOTION,
  prefersReducedMotion,
  registerGsapPlugins,
  revealScrollTrigger,
} from '../../lib/motion'
import { Button } from '../ui/Button'

registerGsapPlugins()

const STEP_HOLD = 3.2

const GRID_COLS = 'md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]'

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

type HowWeWorkSectionProps = {
  title: string
  description: string
  buttonLabel: string
  buttonTo?: string
  buttonHref?: string
}

export function HowWeWorkSection({
  title,
  description,
  buttonLabel,
  buttonTo,
  buttonHref,
}: HowWeWorkSectionProps) {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const calloutTitleRef = useRef<HTMLSpanElement>(null)
  const calloutDetailRef = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const cells = gsap.utils.toArray<HTMLElement>(':scope > *', section)
      const reducedMotion = prefersReducedMotion()

      if (reducedMotion) {
        gsap.set(cells, { clearProps: 'all' })
        return
      }

      gsap.set(cells, { autoAlpha: 0, y: MOTION.distance })

      const images = gsap.utils.toArray<HTMLImageElement>('[data-how-we-work-image]', section)
      const rows = gsap.utils.toArray<HTMLDivElement>('[data-how-we-work-step]', section)
      const dots = gsap.utils.toArray<HTMLSpanElement>('[data-how-we-work-dot]', section)
      const progressFill = section.querySelector<HTMLDivElement>('[data-how-we-work-progress]')

      if (!progressFill || images.length !== steps.length || rows.length !== steps.length) return

      gsap.set(images, { autoAlpha: 0 })
      gsap.set(images[0], { autoAlpha: 1 })
      gsap.set(rows, { backgroundColor: '#ffffff' })
      gsap.set(rows[0], { backgroundColor: '#b8c9ef' })

      const stepTimeline = gsap.timeline({ paused: true, repeat: -1 })

      steps.forEach((step, index) => {
        stepTimeline.call(() => setActiveStep(index))

        stepTimeline.to(
          progressFill,
          {
            height: `${((index + 1) / steps.length) * 100}%`,
            duration: 0.65,
            ease: 'power2.inOut',
          },
          index === 0 ? 0 : '>',
        )

        stepTimeline.to(
          images,
          {
            autoAlpha: (i: number) => (i === index ? 1 : 0),
            duration: 0.55,
            ease: 'power2.inOut',
          },
          '<',
        )

        stepTimeline.to(
          rows,
          {
            backgroundColor: (i: number) => (i === index ? '#b8c9ef' : '#ffffff'),
            duration: 0.45,
            ease: 'power2.out',
          },
          '<',
        )

        if (dots.length === steps.length) {
          stepTimeline.to(
            dots,
            {
              scale: (i: number) => (i <= index ? 1.25 : 1),
              backgroundColor: (i: number) => (i <= index ? '#123498' : '#ffffff'),
              duration: 0.4,
              ease: 'power2.out',
            },
            '<',
          )
        }

        if (calloutTitleRef.current && calloutDetailRef.current) {
          stepTimeline.to(
            [calloutTitleRef.current, calloutDetailRef.current],
            {
              autoAlpha: 0,
              duration: 0.15,
              ease: 'power1.in',
            },
            '<0.1',
          )
          stepTimeline.call(() => {
            if (calloutTitleRef.current) calloutTitleRef.current.textContent = step.callout
            if (calloutDetailRef.current) calloutDetailRef.current.textContent = step.calloutDetail
          })
          stepTimeline.to(
            [calloutTitleRef.current, calloutDetailRef.current],
            {
              autoAlpha: 1,
              duration: 0.35,
              ease: 'power2.out',
            },
          )
        }

        stepTimeline.to({}, { duration: STEP_HOLD })
      })

      gsap.timeline({
        scrollTrigger: {
          ...revealScrollTrigger(section),
          onLeaveBack: () => stepTimeline.pause(0),
        },
      }).to(cells, {
        autoAlpha: 1,
        y: 0,
        duration: MOTION.duration,
        stagger: MOTION.stagger,
        ease: MOTION.ease,
        onComplete: () => stepTimeline.play(0),
      })
    },
    { scope: sectionRef },
  )

  const activeStepData = steps[activeStep]

  return (
    <div
      ref={sectionRef}
      className={`card-grid grid w-full grid-cols-1 ${GRID_COLS} lg:items-stretch`}
    >
      <div className="flex flex-col gap-6 p-8 lg:p-12">
        <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <div className="w-fit">
          <Button to={buttonTo} href={buttonHref}>
            {buttonLabel}
          </Button>
        </div>
      </div>

      <p className="p-8 text-base leading-relaxed text-muted md:text-lg lg:p-12">{description}</p>

      <div className="relative min-h-72 sm:min-h-80 lg:min-h-0">
        {steps.map((step) => (
          <img
            key={step.number}
            data-how-we-work-image
            src={step.image}
            alt={step.imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ))}

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-rich-black/35 via-transparent to-transparent" />

        <div className="absolute right-4 bottom-4 left-4 border border-grid-border bg-white p-4 sm:left-auto sm:w-56 lg:right-6 lg:bottom-6">
          <span ref={calloutTitleRef} className="grid-label">
            {activeStepData.callout}
          </span>
          <p ref={calloutDetailRef} className="mt-3 text-sm leading-relaxed text-muted">
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
              data-how-we-work-progress
              className="w-full bg-accent"
              style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          {steps.map((step, index) => (
            <span
              key={step.number}
              data-how-we-work-dot
              className={`absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 border border-grid-border ${
                index <= activeStep ? 'scale-125 bg-accent' : 'bg-white'
              }`}
              style={{ top: `${((index + 0.5) / steps.length) * 100}%` }}
            />
          ))}
        </div>

        <div className="flex min-w-0 flex-1 flex-col divide-y divide-grid-border">
          {steps.map((step, index) => {
            const isActive = index === activeStep

            return (
              <div
                key={step.number}
                data-how-we-work-step
                className={`group flex flex-1 gap-5 p-6 lg:gap-6 lg:p-8 ${
                  isActive ? 'bg-step-highlight' : 'bg-white hover:bg-step-highlight/35'
                }`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center border border-grid-border text-white ${
                    isActive ? 'bg-cobalt' : 'bg-accent group-hover:bg-cobalt'
                  }`}
                >
                  {step.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-bold tracking-widest text-cobalt">{step.number}</span>
                    <h3
                      className={`text-lg font-bold uppercase tracking-tight text-ink ${
                        isActive ? 'translate-x-1' : ''
                      }`}
                    >
                      {step.title}
                    </h3>
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
