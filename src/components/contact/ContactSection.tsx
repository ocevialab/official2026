import { SectionContainer } from '../ui/SectionContainer'
import { Button } from '../ui/Button'

// import { PillSelect } from './PillSelect'

// const serviceOptions = [
//   'Web Development',
//   'UI/UX Design',
//   'Cloud & DevOps',
//   'All',
// ]

// const budgetOptions = ['Under $5K', '$5K–$15K', '$15K–$50K', '$50K+']

const avatarColors = ['#191970', '#0047AB', '#4a6fa5', '#6b8fc7']

function StarRow() {
  return (
    <div className="flex gap-0.5 text-amber-500" aria-hidden="true">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.26l-4.94 2.45.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  )
}

type ContactSectionProps = {
  fullScreen?: boolean
}

export function ContactSection({ fullScreen = false }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className={`animate-fade-in-up w-full border-b border-grid-border bg-gradient-to-b from-cobalt-tint via-white to-white ${
        fullScreen ? 'flex min-h-[calc(100dvh-var(--header-height))] items-center' : ''
      }`}
    >
      <SectionContainer className={`w-full ${fullScreen ? 'py-10 lg:py-12' : 'py-14 lg:py-20'}`}>
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <span className="mb-6 inline-flex w-fit rounded-md border border-grid-border/30 bg-cobalt-tint px-3 py-1.5 text-xs font-medium text-ink">
              Book a call
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl">
              Let&apos;s get started
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
              Ready to build something exceptional? Get in touch and we&apos;ll show you what&apos;s
              possible for your product, platform, and team.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-2">
                {avatarColors.map((color, i) => (
                  <div
                    key={i}
                    className="h-9 w-9 rounded-full border-2 border-white"
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <StarRow />
              <p className="text-sm text-muted">Trusted by 40+ product teams</p>
            </div>
          </div>

          <form
            className="card-interactive rounded-2xl border border-grid-border/20 bg-white/80 p-6 backdrop-blur-sm lg:p-8"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <label className="block">
              <span className="text-sm font-medium text-ink">
                Name <span className="text-muted">*</span>
              </span>
              <input
                type="text"
                name="name"
                required
                className="mt-2 w-full border-0 border-b border-grid-border/30 bg-transparent py-2.5 text-base text-ink outline-none transition focus:border-cobalt"
              />
            </label>

            <label className="mt-8 block">
              <span className="text-sm font-medium text-ink">
                Email <span className="text-muted">*</span>
              </span>
              <input
                type="email"
                name="email"
                required
                className="mt-2 w-full border-0 border-b border-grid-border/30 bg-transparent py-2.5 text-base text-ink outline-none transition focus:border-cobalt"
              />
            </label>

            <label className="mt-8 block">
              <span className="text-sm font-medium text-ink">
                Contact number <span className="text-muted">*</span>
              </span>
              <input
                type="tel"
                name="phone"
                required
                className="mt-2 w-full border-0 border-b border-grid-border/30 bg-transparent py-2.5 text-base text-ink outline-none transition focus:border-cobalt"
              />
            </label>

            {/* <div className="mt-8">
              <PillSelect
                label="What services are you interested in?"
                options={serviceOptions}
                value={service}
                onChange={setService}
              />
            </div>

            <input type="hidden" name="service" value={service} />

            <div className="mt-8">
              <PillSelect
                label="Current monthly project budget?"
                options={budgetOptions}
                value={budget}
                onChange={setBudget}
              />
            </div>

            <input type="hidden" name="budget" value={budget} /> */}

            <label className="mt-8 block">
              <span className="text-sm font-medium text-ink">
                Tell us about your business... <span className="text-muted">*</span>
              </span>
              <textarea
                name="message"
                required
                rows={3}
                className="mt-1 w-full resize-none border-0 border-b border-grid-border/30 bg-transparent py-2 text-base text-ink outline-none transition focus:border-cobalt"
              />
            </label>

            <div className="mt-8">
              <Button type="submit" className="w-full sm:w-auto">
                Book a call
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M5 15L15 5M15 5H8M15 5V12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
              <p className="mt-4 text-center text-xs text-muted sm:text-left">
                By submitting, you agree to our terms &amp; conditions.
              </p>
            </div>
          </form>
        </div>
      </SectionContainer>
    </section>
  )
}
