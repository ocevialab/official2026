import { ContactSection } from '../components/contact/ContactSection'
import { BentoGrid } from '../components/home/BentoGrid'
import { Hero } from '../components/home/Hero'
import { ServicesSection } from '../components/home/ServicesSection'

export function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <BentoGrid />
      <ContactSection />
    </>
  )
}
