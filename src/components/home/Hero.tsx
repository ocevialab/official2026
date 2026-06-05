import { Button } from '../ui/Button'

const WHATSAPP_URL = 'https://wa.me/1234567890'

export function Hero() {
  return (
    <section className="flex min-h-[calc(100dvh-var(--header-height))] w-full items-center border-b border-grid-border bg-gradient-to-b from-cobalt-tint via-white to-white">
      <div className="section-x w-full py-12 text-center sm:py-16 lg:py-20">
        <h1 className="animate-fade-in-up mx-auto max-w-5xl text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-6xl lg:text-7xl">
          Where Innovation Meets Execution
        </h1>
        <p className="animate-fade-in-up stagger-1 mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:mt-6 md:text-lg">
          Ocevia Lab builds scalable web platforms, APIs, and cloud-native systems for ambitious
          teams worldwide.
        </p>
        <div className="animate-fade-in-up stagger-2 mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
          <Button to="/contact" className="w-full sm:w-auto">
            Request a Proposal
          </Button>
          <Button href={WHATSAPP_URL} className="w-full sm:w-auto">
            WhatsApp US
          </Button>
        </div>
      </div>
    </section>
  )
}
