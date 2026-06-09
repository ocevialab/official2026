import { SectionContainer } from '../ui/SectionContainer'
import { Button } from '../ui/Button'

const avatarColors = ['#00072d', '#0a2373', '#0a2373', '#123498']

function StarRow() {
  return (
    <div className="flex gap-0.5 text-ink" aria-hidden="true">
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
      className={`animate-fade-in-up w-full bg-white ${
        fullScreen ? 'flex min-h-[calc(100dvh-var(--main-content-offset))] items-center' : ''
      }`}
    >
      <SectionContainer className={`w-full ${fullScreen ? 'py-8 lg:py-10' : ''}`}>
        <div className="card-grid grid w-full grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <span className="grid-label mb-6 w-fit">Book a call</span>
            <h1 className="text-4xl font-bold uppercase tracking-tight text-ink md:text-5xl lg:text-6xl">
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
            className="flex flex-col p-8 lg:p-12"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-ink">
                Name <span className="text-muted">*</span>
              </span>
              <input
                type="text"
                name="name"
                required
                className="mt-2 w-full border border-grid-border bg-white px-4 py-3 text-base text-ink outline-none transition focus:bg-accent"
              />
            </label>

            <label className="mt-6 block">
              <span className="text-xs font-bold uppercase tracking-widest text-ink">
                Email <span className="text-muted">*</span>
              </span>
              <input
                type="email"
                name="email"
                required
                className="mt-2 w-full border border-grid-border bg-white px-4 py-3 text-base text-ink outline-none transition focus:bg-accent"
              />
            </label>

            <label className="mt-6 block">
              <span className="text-xs font-bold uppercase tracking-widest text-ink">
                Contact number <span className="text-muted">*</span>
              </span>
              <input
                type="tel"
                name="phone"
                required
                className="mt-2 w-full border border-grid-border bg-white px-4 py-3 text-base text-ink outline-none transition focus:bg-accent"
              />
            </label>

            <label className="mt-6 block">
              <span className="text-xs font-bold uppercase tracking-widest text-ink">
                Tell us about your business... <span className="text-muted">*</span>
              </span>
              <textarea
                name="message"
                required
                rows={3}
                className="mt-2 w-full resize-none border border-grid-border bg-white px-4 py-3 text-base text-ink outline-none transition focus:bg-accent"
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
