/** Ocevia Lab business WhatsApp — 077 818 1063 (LK) */
export const OCEVIA_WHATSAPP_URL = 'https://wa.me/94778181063'

export type ContactIntent = 'contact' | 'inquiry' | 'proposal'

export const CONTACT_URLS = {
  contact: '/contact?intent=contact',
  inquiry: '/contact?intent=inquiry',
  proposal: '/contact?intent=proposal',
} as const

/** @deprecated Use CONTACT_URLS.proposal */
export const CONTACT_PROPOSAL_URL = CONTACT_URLS.proposal

export const CONTACT_INTENT_COPY: Record<
  ContactIntent,
  {
    label: string
    heading: string
    description: string
    messageLabel: string
    defaultMessage?: string
    submitLabel: string
    inquiryType: string
    successMessage: string
  }
> = {
  contact: {
    label: 'Contact us',
    heading: "Let's connect",
    description:
      'Have a question or want to explore working together? Reach out and our team will get back to you shortly.',
    messageLabel: 'How can we help?',
    submitLabel: 'Send message',
    inquiryType: 'Contact',
    successMessage: "Thank you! We've received your message and will be in touch soon.",
  },
  inquiry: {
    label: 'Send an inquiry',
    heading: 'Tell us about your project',
    description:
      'Share a bit about your product, goals, and timeline. We will review your inquiry and respond with clear next steps.',
    messageLabel: 'Tell us about your business...',
    defaultMessage:
      "I'd like to send an inquiry about a project. Here are my goals, timeline, and what I'm looking to build.",
    submitLabel: 'Send inquiry',
    inquiryType: 'General inquiry',
    successMessage: "Thank you! Your inquiry has been sent. We'll follow up soon.",
  },
  proposal: {
    label: 'Request a proposal',
    heading: "Let's build your proposal",
    description:
      'Tell us about your product, goals, and timeline. We will review your request and follow up with a tailored proposal.',
    messageLabel: 'What should we include in your proposal?',
    defaultMessage:
      "I'm reaching out to request a proposal. Please share details on scope, timeline, and how we can move forward.",
    submitLabel: 'Send proposal request',
    inquiryType: 'Proposal request',
    successMessage: "Thank you! Your proposal request has been sent. We'll be in touch with next steps.",
  },
}

/** EmailJS contact form */
export const EMAILJS_SERVICE_ID = 'service_s6c35po'
export const EMAILJS_TEMPLATE_ID = 'template_4khg6us'
export const EMAILJS_PUBLIC_KEY = 'NzTHrFvzew3HmoNDs'

export function resolveContactIntent(
  searchParams: URLSearchParams,
  embeddedOnHome = false,
): ContactIntent {
  const intent = searchParams.get('intent')
  if (intent === 'contact' || intent === 'inquiry' || intent === 'proposal') {
    return intent
  }

  // Legacy: ?inquiry=proposal
  if (searchParams.get('inquiry') === 'proposal') {
    return 'proposal'
  }

  if (embeddedOnHome) {
    return 'inquiry'
  }

  return 'contact'
}
