import { useEffect, useLayoutEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { Layout } from './components/layout/Layout'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ServicesPage } from './pages/ServicesPage'
import { destroyLenis, initLenis } from './lib/lenis'
import { prefersReducedMotion, registerGsapPlugins } from './lib/motion'
import { animateSectionHeadings } from './lib/sectionHeadings'

registerGsapPlugins()

function AppShell() {
  const location = useLocation()
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    initLenis()
    return () => destroyLenis()
  }, [])

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    const timeout = window.setTimeout(() => ScrollTrigger.refresh(), 200)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timeout)
    }
  }, [location.pathname])

  useEffect(() => {
    const cleanup = animateSectionHeadings(document)
    const timeout = window.setTimeout(() => {
      ScrollTrigger.refresh()
      animateSectionHeadings(document)
    }, 300)
    return () => {
      window.clearTimeout(timeout)
      cleanup()
    }
  }, [location.pathname])

  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return

    const dot = cursorDotRef.current
    const ring = cursorRingRef.current
    if (!dot || !ring) return

    document.documentElement.classList.add('custom-cursor-active')

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power2.out' })
    }

    const onEnter = () => gsap.to(ring, { scale: 2.2, duration: 0.3, ease: 'power2.out' })
    const onLeave = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out' })

    const interactives = document.querySelectorAll('a, button, [role="button"]')
    window.addEventListener('mousemove', moveCursor)
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [location.pathname])

  return (
    <>
      <div
        ref={cursorDotRef}
        className="custom-cursor-dot"
        aria-hidden="true"
      />
      <div
        ref={cursorRingRef}
        className="custom-cursor-ring"
        aria-hidden="true"
      />
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
