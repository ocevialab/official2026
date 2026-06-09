import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerGsapPlugins } from '../../lib/motion'

registerGsapPlugins()

export function AnimatedOutlet() {
  const { pathname } = useLocation()

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  return (
    <div key={pathname} className="animate-page-enter">
      <Outlet />
    </div>
  )
}
