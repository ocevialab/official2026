import { Footer } from './Footer'
import { Header } from './Header'
import { AnimatedOutlet } from '../ui/AnimatedOutlet'

export function Layout() {
  return (
    <div className="flex min-h-svh w-full flex-col bg-white text-ink">
      <Header />
      <main className="w-full flex-1 bg-white">
        <AnimatedOutlet />
      </main>
      <Footer />
    </div>
  )
}
