import { ContactSection } from '../components/contact/ContactSection'
import { FaqSection } from '../components/contact/FaqSection'

export function ContactPage() {
  return (
    <div className="section-stack">
      <ContactSection fullScreen />
      <FaqSection />
    </div>
  )
}
