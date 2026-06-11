import gsap from 'gsap'
import { prefersReducedMotion } from './motion'

export function bindCardTilt(card: HTMLElement) {
  if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return () => {}

  const onMove = (e: MouseEvent) => {
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16
    gsap.to(card, {
      rotateX: y,
      rotateY: x,
      scale: 1.02,
      transformPerspective: 900,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const onLeave = () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.65,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  card.addEventListener('mousemove', onMove)
  card.addEventListener('mouseleave', onLeave)

  return () => {
    card.removeEventListener('mousemove', onMove)
    card.removeEventListener('mouseleave', onLeave)
    gsap.set(card, { clearProps: 'rotateX,rotateY,scale,transformPerspective' })
  }
}

export function bindMagnetic(el: HTMLElement, strength = 0.35) {
  if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return () => {}

  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.5, ease: 'power2.out' })
  }

  const onLeave = () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  }

  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)

  return () => {
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
    gsap.set(el, { clearProps: 'x,y' })
  }
}
