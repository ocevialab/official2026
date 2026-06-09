import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let pluginsRegistered = false

export function registerGsapPlugins() {
  if (pluginsRegistered) return
  gsap.registerPlugin(ScrollTrigger)
  pluginsRegistered = true
}

/** Balance: visible while scrolling, not finished before you arrive */
export const SCROLL_REVEAL_START = 'top 72%'

export const SCROLL_REVEAL_START_MOBILE = 'top 70%'

/** Footer sits at page end — must fire as it enters, not at a mid-viewport % */
export const SCROLL_REVEAL_FOOTER_START = 'top bottom-=48px'

export const MOTION = {
  distance: 32,
  duration: 0.8,
  stagger: 0.12,
  ease: 'power2.out',
} as const

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function getScrollRevealStart() {
  if (typeof window === 'undefined') return SCROLL_REVEAL_START
  return window.matchMedia('(max-width: 767px)').matches
    ? SCROLL_REVEAL_START_MOBILE
    : SCROLL_REVEAL_START
}

export function revealScrollTrigger(trigger: Element, start?: string) {
  return {
    trigger,
    start: start ?? getScrollRevealStart(),
    once: true,
    invalidateOnRefresh: true,
  }
}

/** If the trigger line was already passed (common for footers), play the reveal */
export function playRevealIfAlreadyInView(
  trigger: Element,
  timeline: gsap.core.Timeline,
) {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh()
    const rect = trigger.getBoundingClientRect()
    const enteredView = rect.top < window.innerHeight - 48 && rect.bottom > 0
    if (enteredView && timeline.progress() === 0) {
      timeline.play(0)
    }
  })
}
