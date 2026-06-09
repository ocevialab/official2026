import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerGsapPlugins } from '../../lib/motion'

registerGsapPlugins()

export function AnimatedOutlet() {
  const { pathname } = useLocation()

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()

    const frame1 = requestAnimationFrame(refresh)
    const frame2 = requestAnimationFrame(() => requestAnimationFrame(refresh))
    const timeout1 = window.setTimeout(refresh, 120)
    const timeout2 = window.setTimeout(refresh, 450)
    window.addEventListener('load', refresh)

    return () => {
      cancelAnimationFrame(frame1)
      cancelAnimationFrame(frame2)
      window.clearTimeout(timeout1)
      window.clearTimeout(timeout2)
      window.removeEventListener('load', refresh)
    }
  }, [pathname])

  return (
    <div key={pathname} className="animate-page-enter">
      <Outlet />
    </div>
  )
}
