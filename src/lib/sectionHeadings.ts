import gsap from 'gsap'
import SplitType from 'split-type'
import {
  OCEVIA_EASE,
  playRevealIfAlreadyInView,
  prefersReducedMotion,
  registerGsapPlugins,
} from './motion'

registerGsapPlugins()

function shouldSkipHeading(el: HTMLElement) {
  if (el.dataset.splitDone === 'true') return true
  if (el.closest('[data-scroll-reveal]')) return true
  if (el.closest('.about-hero-section, [data-hero-entrance]')) return true
  return false
}

export function animateSectionHeadings(root: ParentNode = document) {
  if (prefersReducedMotion()) return () => {}

  const headings = root.querySelectorAll<HTMLElement>('.section-heading')
  const cleanups: Array<() => void> = []

  headings.forEach((el) => {
    if (shouldSkipHeading(el)) return

    const split = new SplitType(el, { types: 'lines', lineClass: 'section-heading-line' })
    el.dataset.splitDone = 'true'

    const lines = el.querySelectorAll<HTMLElement>('.section-heading-line')
    if (lines.length === 0) {
      split.revert()
      delete el.dataset.splitDone
      return
    }

    gsap.set(lines, { yPercent: 110, opacity: 0 })

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    })

    timeline.to(lines, {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: OCEVIA_EASE,
      onComplete: () => {
        split.revert()
        delete el.dataset.splitDone
        gsap.set(el, { clearProps: 'all' })
      },
    })

    playRevealIfAlreadyInView(el, timeline)

    cleanups.push(() => {
      timeline.scrollTrigger?.kill()
      timeline.kill()
      split.revert()
      delete el.dataset.splitDone
    })
  })

  return () => cleanups.forEach((fn) => fn())
}
