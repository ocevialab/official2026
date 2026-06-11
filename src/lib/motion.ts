import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let pluginsRegistered = false

export const OCEVIA_EASE = 'ocevia'

export function registerGsapPlugins() {
  if (pluginsRegistered) return
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase)
  CustomEase.create(OCEVIA_EASE, 'M0,0 C0.16,1 0.3,1 1,1')
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

/** Recover reveals when layout shifts or the trigger line was already passed on load */
export function playRevealIfAlreadyInView(
  trigger: Element,
  timeline: gsap.core.Timeline,
) {
  const sync = () => {
    ScrollTrigger.refresh()

    const st = timeline.scrollTrigger
    if (st && (st.progress >= 1 || st.isActive)) {
      timeline.progress(1)
      return
    }

    const rect = trigger.getBoundingClientRect()
    if (rect.width === 0 && rect.height === 0) return

    const revealLine = window.innerHeight * 0.72
    const enteredView = rect.top < revealLine && rect.bottom > 48

    if (enteredView) {
      timeline.progress(1)
    }
  }

  requestAnimationFrame(sync)
  requestAnimationFrame(() => requestAnimationFrame(sync))
  window.setTimeout(sync, 120)
  window.setTimeout(sync, 450)
}
