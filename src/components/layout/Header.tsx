import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { getLenis } from '../../lib/lenis'
import { prefersReducedMotion } from '../../lib/motion'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
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
  const headerRef = useRef<HTMLElement>(null)
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
    const header = headerRef.current
    if (!header || prefersReducedMotion()) return

    const applyGlass = (scrollY: number) => {
      const blurred = scrollY > 60
      gsap.to(header, {
        backdropFilter: blurred ? 'blur(14px)' : 'blur(0px)',
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    const lenis = getLenis()
    if (lenis) {
      const onLenisScroll = ({ scroll }: { scroll: number }) => applyGlass(scroll)
      lenis.on('scroll', onLenisScroll)
      applyGlass(lenis.scroll)
      return () => lenis.off('scroll', onLenisScroll)
    }

    const onGlassScroll = () => applyGlass(window.scrollY)
    window.addEventListener('scroll', onGlassScroll, { passive: true })
    onGlassScroll()
    return () => window.removeEventListener('scroll', onGlassScroll)
  }, [])

  useEffect(() => {
    const handleScroll = (currentScrollY: number) => {
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

    const lenis = getLenis()
    if (lenis) {
      const onLenisScroll = ({ scroll }: { scroll: number }) => handleScroll(scroll)
      lenis.on('scroll', onLenisScroll)
      handleScroll(lenis.scroll)
      return () => lenis.off('scroll', onLenisScroll)
    }

    const onWindowScroll = () => handleScroll(window.scrollY)
    window.addEventListener('scroll', onWindowScroll, { passive: true })
    onWindowScroll()
    return () => window.removeEventListener('scroll', onWindowScroll)
  }, [menuOpen])

  useEffect(() => {
    const rootBg = isHome && !scrolled ? '#00072d' : '#ffffff'
    document.documentElement.style.backgroundColor = rootBg
    document.body.style.backgroundColor = rootBg

    return () => {
      document.documentElement.style.backgroundColor = ''
      document.body.style.backgroundColor = ''
    }
  }, [isHome, scrolled])

  return (
    <header
      ref={headerRef}
      aria-hidden={!isVisible}
      className={`fixed z-50 transition-all duration-300 ease-in-out ${
        isHome ? 'inset-x-0 top-0' : 'site-header-inset'
      } ${
        isVisible
          ? 'visible translate-y-0 opacity-100'
          : 'pointer-events-none invisible -translate-y-full opacity-0'
      } ${
        isTransparent
          ? 'border-0 bg-transparent'
          : 'border border-grid-border bg-white'
      }`}
    >
      <div className="grid h-[var(--header-height)] w-full grid-cols-[1fr_auto_1fr] items-center">
        <Link
          to="/"
          className={`flex shrink-0 items-center px-4 transition sm:px-6 ${
            isTransparent ? 'hover:opacity-80' : 'border-r border-grid-border hover:bg-accent hover:text-white'
          }`}
        >
          <Logo
            variant={isTransparent ? 'default' : 'colored'}
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        <nav className="hidden items-stretch justify-center md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isTransparent
                  ? `flex items-center px-5 text-xs font-bold uppercase tracking-widest text-white transition hover:text-white/80 ${
                      isActive ? 'underline underline-offset-4' : ''
                    }`
                  : `flex items-center border-r border-grid-border px-5 text-xs font-bold uppercase tracking-widest transition last:border-r-0 hover:bg-accent hover:text-white ${
                      isActive ? 'bg-accent text-white' : 'text-ink'
                    }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-0 pr-4 sm:pr-5">
          <div className="hidden h-full md:flex">
            <Button
              to="/contact"
              className={`h-full min-h-0 rounded-none px-6 ${
                isTransparent ? 'border-white bg-accent text-white' : 'border-0 border-l border-grid-border'
              }`}
            >
              Contact
            </Button>
          </div>

          <button
            type="button"
            className={`flex h-[var(--header-height)] w-14 items-center justify-center transition md:hidden ${
              isTransparent ? 'hover:opacity-80' : 'border-l border-grid-border hover:bg-accent hover:text-white'
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
          className="fixed inset-0 top-[var(--header-height)] z-40 bg-black/30 md:hidden"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav
        className={`absolute inset-x-0 top-full z-50 flex flex-col border border-t-0 border-grid-border bg-white transition-all duration-300 md:hidden ${
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
              `border-b border-grid-border px-6 py-4 text-sm font-bold uppercase tracking-widest transition last:border-b-0 hover:bg-accent hover:text-white ${
                isActive ? 'bg-accent text-white' : 'text-ink'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
