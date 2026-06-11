import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToTop } from '../../lib/lenis'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    scrollToTop(true)
  }, [pathname])

  return null
}
