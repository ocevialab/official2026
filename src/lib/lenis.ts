import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, registerGsapPlugins } from './motion'

let lenisInstance: Lenis | null = null
let lenisTicker: ((time: number) => void) | null = null

export function initLenis() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return null
  if (lenisInstance) return lenisInstance

  registerGsapPlugins()

  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.8,
  })

  lenis.on('scroll', ScrollTrigger.update)

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length && value !== undefined) {
        lenis.scrollTo(value, { immediate: true })
      }
      return lenis.scroll
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
  })

  lenisTicker = (time: number) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(lenisTicker)
  gsap.ticker.lagSmoothing(0)

  lenisInstance = lenis
  requestAnimationFrame(() => ScrollTrigger.refresh())

  return lenis
}

export function getLenis() {
  return lenisInstance
}

export function scrollToTop(immediate = true) {
  const lenis = lenisInstance
  if (lenis) {
    lenis.scrollTo(0, { immediate })
    return
  }
  window.scrollTo(0, 0)
}

export function destroyLenis() {
  if (!lenisInstance) return
  if (lenisTicker) {
    gsap.ticker.remove(lenisTicker)
    lenisTicker = null
  }
  ScrollTrigger.scrollerProxy(document.documentElement, {})
  lenisInstance.destroy()
  lenisInstance = null
}
