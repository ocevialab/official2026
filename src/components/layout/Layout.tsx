import { useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { AnimatedOutlet } from '../ui/AnimatedOutlet'

export function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className={`min-h-svh bg-white text-ink ${isHome ? '' : 'layout-gutter'}`}>
      <div className={isHome ? 'flex min-h-svh flex-col' : 'section-x'}>
        <div
          className={`flex flex-col ${
            isHome
              ? 'min-h-svh flex-1'
              : 'site-frame min-h-[calc(100svh-2*var(--layout-gutter))] bg-white'
          }`}
        >
          <Header />
          {isHome ? (
            <main className="w-full flex-1">
              <AnimatedOutlet />
            </main>
          ) : (
            <div className="section-stack flex-1">
              <main className="main-inner w-full bg-white">
                <AnimatedOutlet />
              </main>
              <Footer />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
