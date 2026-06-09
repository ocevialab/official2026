import { ContactSection } from '../components/contact/ContactSection'
import { BentoGrid } from '../components/home/BentoGrid'
import { Hero } from '../components/home/Hero'
import { ServicesSection } from '../components/home/ServicesSection'
import { Footer } from '../components/layout/Footer'

export function HomePage() {
  return (
    <>
      <Hero />
      <div className="bg-white p-4 sm:p-5 lg:p-6">
        <div className="section-x">
          <div className="site-frame bg-white">
            <div className="section-stack">
              <ServicesSection />
              <BentoGrid />
              <ContactSection />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
