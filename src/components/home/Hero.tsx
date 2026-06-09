import { useEffect, useState } from 'react'
import { useLottie } from 'lottie-react'
import { Button } from '../ui/Button'
import {
  LANDSCAPE_ANIMATION,
  PORTRAIT_ANIMATION,
  preloadHeroAnimation,
} from '../../lib/heroAnimationPreload'

const WHATSAPP_URL = 'https://wa.me/1234567890'

function useLottieAnimation(path: string) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    let cancelled = false

    preloadHeroAnimation(path)
      .then((data) => {
        if (!cancelled) setAnimationData(data)
      })
      .catch(() => {
        if (!cancelled) setAnimationData(null)
      })

    return () => {
      cancelled = true
    }
  }, [path])

  return animationData
}

function usePortraitOrientation() {
  const [isPortrait, setIsPortrait] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < window.innerHeight : false,
  )

  useEffect(() => {
    const update = () => setIsPortrait(window.innerWidth < window.innerHeight)

    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)

    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  return isPortrait
}

function HeroLottie({
  animationData,
  onReady,
}: {
  animationData: object
  onReady: () => void
}) {
  const { View } = useLottie({
    animationData,
    loop: false,
    autoplay: true,
    onDOMLoaded: onReady,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
  })

  return <div className="absolute inset-0 h-full w-full">{View}</div>
}

export function Hero() {
  const isPortrait = usePortraitOrientation()
  const animationPath = isPortrait ? PORTRAIT_ANIMATION : LANDSCAPE_ANIMATION
  const animationData = useLottieAnimation(animationPath)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(false)
  }, [animationPath])

  const revealClass = isReady ? 'animate-fade-in-up' : 'opacity-0'

  return (
    <section className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-rich-black pt-[var(--header-height)]">
      <div className="absolute inset-0" aria-hidden>
        {animationData && (
          <HeroLottie
            key={animationPath}
            animationData={animationData}
            onReady={() => setIsReady(true)}
          />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_42%,rgb(0_0_0_/_0.55),transparent_72%)]" />

      <div className="relative z-10 flex w-full flex-col items-center px-6 py-12 text-center sm:px-8 sm:py-16 lg:px-16 lg:py-20">
        <h1
          className={`hero-text-shadow mx-auto max-w-4xl text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl md:text-6xl ${revealClass}`}
        >
          Where Innovation Meets Execution
        </h1>
        <p
          className={`hero-text-shadow stagger-1 mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:mt-6 md:text-lg ${revealClass}`}
        >
          Ocevia Lab builds scalable web platforms, APIs, and cloud-native systems for ambitious
          teams worldwide.
        </p>
        <div
          className={`stagger-2 mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4 ${revealClass}`}
        >
          <Button to="/contact" className="w-full sm:w-auto">
            Request a Proposal
          </Button>
          <Button
            href={WHATSAPP_URL}
            variant="outline"
            className="w-full border-white bg-white text-ink hover:bg-accent hover:text-white sm:w-auto"
          >
            WhatsApp Us
          </Button>
        </div>
      </div>
    </section>
  )
}
