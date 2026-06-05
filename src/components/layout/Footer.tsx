import { Link } from 'react-router-dom'
import { buttonClassName } from '../ui/Button'
import { Logo } from '../ui/Logo'
import { SocialIcons } from './SocialIcons'

const serviceLinks = [
  'Web Design & Development',
  'UI/UX design',
  'IT & Digital Solutions',
  'SEO',
  'Digital Marketing',
  'Branding & Identity',
]

export function Footer() {
  return (
    <footer className="w-full border-t border-grid-border bg-white text-ink">
      <div className="section-x grid w-full grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-16">
        <div className="flex flex-col gap-5">
          <Link to="/" className="inline-flex w-fit transition hover:opacity-80">
            <Logo className="h-14 w-auto sm:h-16" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Welcome to Ocevia Lab. Beautiful design, smart technology, measurable results.
          </p>
          <SocialIcons />
        </div>

        <div>
          <h3 className="mb-5 text-base font-bold text-ink">Services</h3>
          <ul className="flex flex-col gap-3">
            {serviceLinks.map((item) => (
              <li key={item}>
                <Link
                  to="/services"
                  className="text-sm text-muted transition hover:translate-x-0.5 hover:text-cobalt"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-base font-bold text-ink">Contact Us</h3>
          <ul className="flex flex-col gap-4 text-sm leading-relaxed text-muted">
            <li>
              NO. 416/B, Daham Mw, Habarakada,
              <br />
              Homagama, Sri Lanka
            </li>
            <li>
              <a href="tel:+94771320533" className="transition hover:text-cobalt">
                +94 77 132 0533
              </a>
              {' | '}
              <a href="tel:+61423314733" className="transition hover:text-cobalt">
                +61 42 331 4733
              </a>
            </li>
            <li>
              <a href="mailto:ocevialab@gmail.com" className="transition hover:text-cobalt">
                ocevialab@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-base font-bold text-ink">Subscribe</h3>
          <form
            className="flex overflow-hidden rounded-lg border border-grid-border/30 bg-cobalt-tint transition focus-within:border-grid-border focus-within:shadow-md"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              required
              className="min-w-0 flex-1 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 outline-none"
            />
            <button
              type="submit"
              className={`${buttonClassName} shrink-0 rounded-none rounded-r-lg`}
            >
              Send
            </button>
          </form>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Get exclusive insights on digital strategy and measurable results.
          </p>
        </div>
      </div>

      <div className="border-t border-grid-border">
        <p className="section-x py-6 text-sm text-muted">
          Copyright © {new Date().getFullYear()} Ocevia Lab.
        </p>
      </div>
    </footer>
  )
}
