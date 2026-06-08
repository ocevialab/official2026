import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact Us', path: '/contact' },
]

function MenuIcon({ open, light }: { open: boolean; light?: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={light ? 'text-white' : 'text-ink'}
    >
      {open ? (
        <path
          d="M6 6L18 18M18 6L6 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path d="M4 7H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

const SCROLL_STYLE_THRESHOLD = 24
const SCROLL_TOP_ZONE = 10
const SCROLL_DELTA = 5

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isTransparent = isHome && !scrolled && !menuOpen

  useEffect(() => {
    setMenuOpen(false)
    setIsVisible(true)
    lastScrollY.current = window.scrollY
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY.current

      setScrolled(currentScrollY > SCROLL_STYLE_THRESHOLD)

      if (menuOpen) {
        setIsVisible(true)
      } else if (currentScrollY < SCROLL_TOP_ZONE) {
        setIsVisible(true)
      } else if (delta > SCROLL_DELTA) {
        setIsVisible(false)
      } else if (delta < -SCROLL_DELTA) {
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  useEffect(() => {
    const rootBg = isHome && !scrolled ? '#0f172a' : '#ffffff'
    document.documentElement.style.backgroundColor = rootBg
    document.body.style.backgroundColor = rootBg

    return () => {
      document.documentElement.style.backgroundColor = ''
      document.body.style.backgroundColor = ''
    }
  }, [isHome, scrolled])

  return (
    <header
      aria-hidden={!isVisible}
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isVisible
          ? 'visible translate-y-0 opacity-100'
          : 'pointer-events-none invisible -translate-y-full opacity-0'
      } ${
        isTransparent
          ? 'border-0 bg-transparent'
          : 'border-b border-grid-border bg-white/90 backdrop-blur-md'
      }`}
    >
      <div className="section-x grid h-[var(--header-height)] w-full grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Link to="/" className="flex shrink-0 items-center justify-self-start transition hover:opacity-80">
          <Logo
            variant={isTransparent ? 'default' : 'colored'}
            className="h-10 w-auto sm:h-12 md:h-14"
          />
        </Link>

        <nav className="hidden items-center justify-center gap-8 md:flex">
          {navItems.slice(0, -1).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isTransparent
                  ? `text-sm font-medium text-white transition hover:text-white/80 hover:underline hover:underline-offset-4 ${
                      isActive ? 'underline underline-offset-4' : ''
                    }`
                  : `text-sm font-medium text-ink transition hover:text-cobalt hover:underline hover:underline-offset-4 ${
                      isActive ? 'text-cobalt underline underline-offset-4' : ''
                    }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-4">
          <div className="hidden md:block">
            <Button to="/contact">Contact Us</Button>
          </div>

          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-lg border transition md:hidden ${
              isTransparent
                ? 'border-white/40 hover:border-white/70'
                : 'border-grid-border/30 hover:border-grid-border'
            }`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} light={isTransparent} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 top-[var(--header-height)] z-40 bg-black/20 md:hidden"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav
        className={`section-x fixed inset-x-0 top-[var(--header-height)] z-50 flex flex-col gap-1 border-b border-grid-border bg-white py-4 shadow-lg transition-all duration-300 md:hidden ${
          menuOpen
            ? 'visible translate-y-0 opacity-100'
            : 'pointer-events-none invisible -translate-y-2 opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 text-base font-medium transition ${
                isActive ? 'bg-cobalt-tint text-cobalt' : 'text-ink hover:bg-cobalt-tint/60'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
        <div className="mt-2 px-4 pt-2">
          <Button to="/contact" className="w-full">
            Contact Us
          </Button>
        </div>
      </nav>
    </header>
  )
}
