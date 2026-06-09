import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import type { CSSProperties, ElementType, ReactNode } from 'react'
import {
  MOTION,
  playRevealIfAlreadyInView,
  prefersReducedMotion,
  registerGsapPlugins,
  revealScrollTrigger,
} from '../../lib/motion'

registerGsapPlugins()

type RevealVariant = 'up' | 'fade' | 'clip' | 'line'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  variant?: RevealVariant
  delay?: number
  className?: string
  style?: CSSProperties
  scrollStart?: string
}

const variantClass: Record<RevealVariant, string> = {
  up: 'reveal',
  fade: 'reveal reveal-fade',
  clip: 'reveal reveal-clip',
  line: 'reveal reveal-line',
}

export function Reveal({
  children,
  as: Component = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  style,
  scrollStart,
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = containerRef.current
      if (!el) return

      if (prefersReducedMotion()) {
        gsap.set(el, { clearProps: 'all' })
        return
      }

      const scrollTrigger = revealScrollTrigger(el, scrollStart)

      if (variant === 'clip') {
        gsap.set(el, { clipPath: 'inset(0 0 100% 0)' })
        const timeline = gsap.timeline({ scrollTrigger })
        timeline.to(el, {
          clipPath: 'inset(0)',
          duration: MOTION.duration + 0.1,
          delay: delay / 1000,
          ease: MOTION.ease,
        })
        playRevealIfAlreadyInView(el, timeline)
        return
      }

      if (variant === 'line') {
        const line = document.createElement('span')
        line.setAttribute('aria-hidden', 'true')
        line.className = 'reveal-line-indicator'
        el.style.position = 'relative'
        el.appendChild(line)
        const timeline = gsap.timeline({ scrollTrigger })
        timeline.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.55,
            delay: delay / 1000,
            ease: MOTION.ease,
            transformOrigin: 'left center',
          },
        )
        playRevealIfAlreadyInView(el, timeline)
        return
      }

      const from: gsap.TweenVars =
        variant === 'fade'
          ? { autoAlpha: 0 }
          : { autoAlpha: 0, y: MOTION.distance }

      const timeline = gsap.timeline({ scrollTrigger })
      timeline.fromTo(el, from, {
        autoAlpha: 1,
        y: 0,
        duration: MOTION.duration,
        delay: delay / 1000,
        ease: MOTION.ease,
      })
      playRevealIfAlreadyInView(el, timeline)
    },
    { scope: containerRef },
  )

  return (
    <Component ref={containerRef} className={className} style={style}>
      {children}
    </Component>
  )
}

type RevealStaggerProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  scrollStart?: string
  /** Only animate children with data-reveal-item (e.g. footer columns) */
  itemSelector?: string
}

function getStaggerTargets(container: HTMLElement, itemSelector?: string) {
  if (itemSelector) {
    return gsap.utils.toArray<HTMLElement>(itemSelector, container)
  }

  const marked = gsap.utils.toArray<HTMLElement>('[data-reveal-item]', container)
  if (marked.length > 0) return marked

  return gsap.utils.toArray<HTMLElement>(container.children)
}

export function RevealStagger({
  children,
  className = '',
  as: Component = 'div',
  scrollStart,
  itemSelector,
}: RevealStaggerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = containerRef.current
      if (!el) return

      const items = getStaggerTargets(el, itemSelector)
      if (items.length === 0) return

      if (prefersReducedMotion()) {
        gsap.set(items, { clearProps: 'all' })
        gsap.set(el.querySelectorAll('.reveal-clip-target'), { clearProps: 'all' })
        return
      }

      gsap.set(items, { autoAlpha: 0, y: MOTION.distance })

      const timeline = gsap.timeline({
        scrollTrigger: revealScrollTrigger(el, scrollStart),
      })

      timeline.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: MOTION.duration,
        stagger: MOTION.stagger,
        ease: MOTION.ease,
      })

      const clipTargets = gsap.utils.toArray<HTMLElement>('.reveal-clip-target', el)
      if (clipTargets.length > 0) {
        gsap.set(clipTargets, { clipPath: 'inset(0 0 100% 0)' })
        timeline.to(
          clipTargets,
          {
            clipPath: 'inset(0)',
            duration: MOTION.duration + 0.15,
            stagger: MOTION.stagger,
            ease: MOTION.ease,
          },
          0,
        )
      }

      playRevealIfAlreadyInView(el, timeline)
    },
    { scope: containerRef },
  )

  return (
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  )
}

type RevealSplitProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  scrollStart?: string
}

export function RevealSplit({
  children,
  className = '',
  as: Component = 'div',
  scrollStart,
}: RevealSplitProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = containerRef.current
      if (!el) return

      const items = gsap.utils.toArray<HTMLElement>(el.children)
      if (items.length === 0) return

      if (prefersReducedMotion()) {
        gsap.set(items, { clearProps: 'all' })
        return
      }

      gsap.set(items, { autoAlpha: 0, y: MOTION.distance })

      const timeline = gsap.timeline({
        scrollTrigger: revealScrollTrigger(el, scrollStart),
      })

      timeline.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: MOTION.duration,
        stagger: MOTION.stagger,
        ease: MOTION.ease,
      })

      playRevealIfAlreadyInView(el, timeline)
    },
    { scope: containerRef },
  )

  return (
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  )
}

export function RevealClipTarget({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`reveal-clip-target ${className}`.trim()}>{children}</div>
}
