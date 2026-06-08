import { useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { AnimatedOutlet } from '../ui/AnimatedOutlet'

export function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="flex min-h-svh w-full flex-col bg-white text-ink">
      <Header />
      <main
        className={`w-full flex-1 bg-white ${isHome ? '' : 'pt-[var(--header-height)]'}`}
      >
        <AnimatedOutlet />
      </main>
      <Footer />
    </div>
  )
}
