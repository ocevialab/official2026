import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToTop } from '../../lib/lenis'

export function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    scrollToTop(true)
  }, [pathname, search])

  return null
}
