import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import {
  CONTACT_INTENT_COPY,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  resolveContactIntent,
} from '../../data/contact'
import { RevealSplit, RevealStagger } from '../ui/Reveal'
import { SectionContainer } from '../ui/SectionContainer'
import { Button } from '../ui/Button'
import testimonial1 from '../../assets/testimonial_1 (1).jpg'
import testimonial2 from '../../assets/testimonial_2.png'
import testimonial3 from '../../assets/testimonial_3.png'
import nimalSafariLogo from '../../assets/image.png'

const testimonialAvatars = [
  { src: testimonial1, alt: 'Client testimonial portrait' },
  { src: testimonial2, alt: 'Client testimonial portrait' },
  { src: testimonial3, alt: 'Client testimonial portrait' },
  { src: nimalSafariLogo, alt: 'Nimal Safari Jeep Service' },
]

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
  const [searchParams] = useSearchParams()
  const intent = resolveContactIntent(searchParams, !fullScreen)
  const copy = CONTACT_INTENT_COPY[intent]
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState(copy.defaultMessage ?? '')

  useEffect(() => {
    setFormStatus('idle')
    setMessage(copy.defaultMessage ?? '')
  }, [intent, copy.defaultMessage])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const messageValue =
      message.trim() ||
      String((form.elements.namedItem('message') as HTMLTextAreaElement | null)?.value ?? '')

    setFormStatus('sending')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: String(formData.get('name') ?? ''),
          email: String(formData.get('email') ?? ''),
          phone: String(formData.get('phone') ?? ''),
          message: messageValue,
          business: messageValue,
          inquiry_type: String(formData.get('inquiry_type') ?? copy.inquiryType),
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      )

      setFormStatus('success')
      form.reset()
      setMessage(copy.defaultMessage ?? '')
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
            <span className="grid-label mb-6 w-fit">{copy.label}</span>
            <h1 className="section-heading text-4xl font-bold uppercase tracking-tight text-ink md:text-5xl lg:text-6xl">
              {copy.heading}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
              {copy.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-2">
                {testimonialAvatars.map((avatar) => (
                  <img
                    key={avatar.src}
                    src={avatar.src}
                    alt={avatar.alt}
                    className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <StarRow />
              <p className="text-sm text-muted">Trusted by 40+ product teams</p>
            </div>
          </div>

          <RevealStagger className="flex flex-col p-8 lg:p-12">
            <form key={intent} className="contents" onSubmit={handleSubmit}>
              <input type="hidden" name="inquiry_type" value={copy.inquiryType} />

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
                  {copy.messageLabel} <span className="text-muted">*</span>
                </span>
                <textarea
                  name="message"
                  required
                  rows={3}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  disabled={formStatus === 'sending'}
                  className="input-interactive mt-2 w-full resize-none border border-grid-border bg-white px-4 py-3 text-base text-ink outline-none focus:bg-accent disabled:opacity-60"
                />
              </label>

              <div className="mt-8">
                <Button type="submit" className="w-full sm:w-auto" disabled={formStatus === 'sending'}>
                  {formStatus === 'sending' ? 'Sending...' : copy.submitLabel}
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
                    {copy.successMessage}
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
