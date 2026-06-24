import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { useLottie } from 'lottie-react'
import gsap from 'gsap'
import SplitType from 'split-type'
import * as THREE from 'three'
import { CONTACT_URLS, OCEVIA_WHATSAPP_URL } from '../../data/contact'
import { Button } from '../ui/Button'
import { bindMagnetic } from '../../lib/cardTilt'
import {
  LANDSCAPE_ANIMATION,
  PORTRAIT_ANIMATION,
  preloadHeroAnimation,
} from '../../lib/heroAnimationPreload'
import { OCEVIA_EASE, prefersReducedMotion, registerGsapPlugins } from '../../lib/motion'

registerGsapPlugins()

const LOTTIE_READY_TIMEOUT_MS = 8000

function useLottieAnimation(path: string) {
  const [animationData, setAnimationData] = useState<object | null>(null)
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoadFailed(false)

    preloadHeroAnimation(path)
      .then((data) => {
        if (!cancelled) setAnimationData(data)
      })
      .catch(() => {
        if (!cancelled) {
          setAnimationData(null)
          setLoadFailed(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [path])

  return { animationData, loadFailed }
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
  const { animationData, loadFailed } = useLottieAnimation(animationPath)
  const [isReady, setIsReady] = useState(() => prefersReducedMotion())

  const heroRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const primaryCtaRef = useRef<HTMLAnchorElement>(null)
  const secondaryCtaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    setIsReady(prefersReducedMotion())
  }, [animationPath])

  useEffect(() => {
    if (prefersReducedMotion() || loadFailed) {
      setIsReady(true)
      return
    }

    if (!animationData) return

    const timeout = window.setTimeout(() => setIsReady(true), LOTTIE_READY_TIMEOUT_MS)
    return () => window.clearTimeout(timeout)
  }, [animationData, loadFailed])

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion()) return

      const headline = headlineRef.current
      const sub = subRef.current
      const cta = ctaRef.current
      const bg = bgRef.current
      if (!headline || !sub || !cta || !bg) return

      const split = new SplitType(headline, { types: 'words,chars' })
      const chars = headline.querySelectorAll('.char')

      gsap.set([sub, cta], { autoAlpha: 0, yPercent: 30 })
      gsap.set(chars, { yPercent: 120, autoAlpha: 0, rotateX: -40, transformOrigin: '50% 100%' })
      gsap.set(bg, { scale: 1.12, autoAlpha: 0 })

      const tl = gsap.timeline({ defaults: { ease: OCEVIA_EASE } })

      tl.fromTo(bg, { scale: 1.12, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.8 })
        .to(
          chars,
          {
            yPercent: 0,
            autoAlpha: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.025,
          },
          '-=1.2',
        )
        .to(sub, { yPercent: 0, autoAlpha: 1, duration: 0.9 }, '-=0.5')
        .to(cta, { yPercent: 0, autoAlpha: 1, duration: 0.8 }, '-=0.4')
        .eventCallback('onComplete', () => {
          split.revert()
          gsap.set([headline, sub, cta], { clearProps: 'all' })
        })

      return () => {
        tl.kill()
        split.revert()
      }
    },
    { scope: heroRef, dependencies: [isReady] },
  )

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion()) return

      const bg = bgRef.current
      const hero = heroRef.current
      if (!bg || !hero) return

      const parallax = gsap.to(bg, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      return () => parallax.scrollTrigger?.kill()
    },
    { scope: heroRef, dependencies: [isReady] },
  )

  useEffect(() => {
    if (!isReady || prefersReducedMotion()) return

    const cleanups = [
      primaryCtaRef.current ? bindMagnetic(primaryCtaRef.current) : () => {},
      secondaryCtaRef.current ? bindMagnetic(secondaryCtaRef.current) : () => {},
    ]

    return () => cleanups.forEach((fn) => fn())
  }, [isReady])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion()) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
    camera.position.z = 3

    const count = 1600
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const material = new THREE.PointsMaterial({
      color: 0x88aaff,
      size: 0.015,
      transparent: true,
      opacity: 0.55,
    })
    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    const resize = () => {
      const { clientWidth, clientHeight } = canvas
      renderer.setSize(clientWidth, clientHeight, false)
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
    }

    resize()
    window.addEventListener('resize', resize)

    const clock = new THREE.Clock()
    let animId = 0

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      particles.rotation.y = t * 0.04
      particles.rotation.x = t * 0.02
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  const hiddenUntilReady = !isReady && !prefersReducedMotion()

  return (
    <section
      ref={heroRef}
      data-hero-entrance
      className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-rich-black pt-[var(--header-height)]"
    >
      <div ref={bgRef} className="absolute inset-0" aria-hidden>
        {animationData && (
          <HeroLottie
            key={animationPath}
            animationData={animationData}
            onReady={() => setIsReady(true)}
          />
        )}
      </div>

      <canvas
        ref={canvasRef}
        className="hero-particles pointer-events-none absolute inset-0 z-[1] h-full w-full"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_85%_65%_at_50%_42%,rgb(0_0_0_/_0.55),transparent_72%)]" />

      <div className="relative z-10 flex w-full flex-col items-center px-6 py-12 text-center sm:px-8 sm:py-16 lg:px-16 lg:py-20">
        <h1
          ref={headlineRef}
          className={`hero-headline hero-text-shadow mx-auto max-w-4xl text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl md:text-6xl ${
            hiddenUntilReady ? 'opacity-0' : ''
          }`}
        >
          Where Innovation Meets Execution
        </h1>
        <p
          ref={subRef}
          className={`hero-text-shadow mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:mt-6 md:text-lg ${
            hiddenUntilReady ? 'opacity-0' : ''
          }`}
        >
          Ocevia Lab builds scalable web platforms, APIs, and cloud-native systems for ambitious
          teams worldwide.
        </p>
        <div
          ref={ctaRef}
          className={`mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4 ${
            hiddenUntilReady ? 'opacity-0' : ''
          }`}
        >
          <Button to={CONTACT_URLS.proposal} className="hero-cta w-full sm:w-auto" ref={primaryCtaRef}>
            Request a Proposal
          </Button>
          <Button
            href={OCEVIA_WHATSAPP_URL}
            variant="outline"
            className="hero-cta w-full border-white bg-white text-ink hover:bg-accent hover:text-white sm:w-auto"
            ref={secondaryCtaRef}
          >
            WhatsApp Us
          </Button>
        </div>
      </div>
    </section>
  )
}
