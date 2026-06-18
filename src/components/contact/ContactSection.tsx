import { useState } from 'react'
import emailjs from '@emailjs/browser'
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from '../../data/contact'
import { RevealSplit, RevealStagger } from '../ui/Reveal'
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

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export function ContactSection({ fullScreen = false }: ContactSectionProps) {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    setFormStatus('sending')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: String(formData.get('name') ?? ''),
          email: String(formData.get('email') ?? ''),
          phone: String(formData.get('phone') ?? ''),
          business: String(formData.get('business') ?? ''),
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      )

      setFormStatus('success')
      form.reset()
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className={`w-full bg-white ${
        fullScreen ? 'flex min-h-[calc(100dvh-var(--main-content-offset))] items-center' : ''
      }`}
    >
      <SectionContainer className={`w-full ${fullScreen ? 'py-8 lg:py-1' : ''}`}>
        <RevealSplit className="card-grid grid w-full grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <span className="grid-label mb-6 w-fit">Book a call</span>
            <h1 className="section-heading text-4xl font-bold uppercase tracking-tight text-ink md:text-5xl lg:text-6xl">
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

          <RevealStagger className="flex flex-col p-8 lg:p-12">
            <form className="contents" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-ink">
                  Name <span className="text-muted">*</span>
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  disabled={formStatus === 'sending'}
                  className="input-interactive mt-2 w-full border border-grid-border bg-white px-4 py-3 text-base text-ink outline-none focus:bg-accent disabled:opacity-60"
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
                  disabled={formStatus === 'sending'}
                  className="input-interactive mt-2 w-full border border-grid-border bg-white px-4 py-3 text-base text-ink outline-none focus:bg-accent disabled:opacity-60"
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
                  disabled={formStatus === 'sending'}
                  className="input-interactive mt-2 w-full border border-grid-border bg-white px-4 py-3 text-base text-ink outline-none focus:bg-accent disabled:opacity-60"
                />
              </label>

              <label className="mt-6 block">
                <span className="text-xs font-bold uppercase tracking-widest text-ink">
                  Tell us about your business... <span className="text-muted">*</span>
                </span>
                <textarea
                  name="business"
                  required
                  rows={3}
                  disabled={formStatus === 'sending'}
                  className="input-interactive mt-2 w-full resize-none border border-grid-border bg-white px-4 py-3 text-base text-ink outline-none focus:bg-accent disabled:opacity-60"
                />
              </label>

              <div className="mt-8">
                <Button type="submit" className="w-full sm:w-auto" disabled={formStatus === 'sending'}>
                  {formStatus === 'sending' ? 'Sending...' : 'Send Inquiry'}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    className="micro-arrow"
                  >
                    <path
                      d="M5 15L15 5M15 5H8M15 5V12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>

                {formStatus === 'success' && (
                  <p className="mt-4 text-sm text-ink" role="status">
                    Thank you! Your message has been sent. We&apos;ll be in touch soon.
                  </p>
                )}

                {formStatus === 'error' && (
                  <p className="mt-4 text-sm text-red-700" role="alert">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <p className="mt-4 text-center text-xs text-muted sm:text-left">
                  By submitting, you agree to our terms &amp; conditions.
                </p>
              </div>
            </form>
          </RevealStagger>
        </RevealSplit>
      </SectionContainer>
    </section>
  )
}
