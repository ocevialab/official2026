import { useEffect, useState } from 'react'
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

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="text-ink"
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

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-grid-border bg-white/90 backdrop-blur-md">
      <div className="section-x flex h-[var(--header-height)] w-full items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center transition hover:opacity-80">
          <Logo className="h-10 w-auto sm:h-12 md:h-14" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.slice(0, -1).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium text-ink transition hover:text-cobalt hover:underline hover:underline-offset-4 ${
                  isActive ? 'text-cobalt underline underline-offset-4' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button to="/contact">Contact Us</Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-grid-border/30 transition hover:border-grid-border md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon open={menuOpen} />
        </button>
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
