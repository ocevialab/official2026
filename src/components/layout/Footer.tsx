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
    <footer className="w-full bg-white text-ink">
      <div className="card-grid footer-grid grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-5 p-8 lg:p-10">
          <Link to="/" className="inline-flex w-fit transition hover:opacity-80">
            <Logo variant="colored" className="h-14 w-auto sm:h-16" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Welcome to Ocevia Lab. Beautiful design, smart technology, measurable results.
          </p>
          <SocialIcons />
        </div>

        <div className="p-8 lg:p-10">
          <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-ink">Services</h3>
          <ul className="flex flex-col gap-3">
            {serviceLinks.map((item) => (
              <li key={item}>
                <Link
                  to="/services"
                  className="text-sm text-muted transition hover:text-ink hover:underline"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 lg:p-10">
          <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-ink">Contact Us</h3>
          <ul className="flex flex-col gap-4 text-sm leading-relaxed text-muted">
            <li>
              NO. 416/B, Daham Mw, Habarakada,
              <br />
              Homagama, Sri Lanka
            </li>
            <li>
              <a href="tel:+94771320533" className="transition hover:text-ink hover:underline">
                +94 77 132 0533
              </a>
              {' | '}
              <a href="tel:+61423314733" className="transition hover:text-ink hover:underline">
                +61 42 331 4733
              </a>
            </li>
            <li>
              <a
                href="mailto:ocevialab@gmail.com"
                className="transition hover:text-ink hover:underline"
              >
                ocevialab@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div className="p-8 lg:p-10">
          <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-ink">Subscribe</h3>
          <form
            className="flex border border-grid-border"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              required
              className="min-w-0 flex-1 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 outline-none focus:bg-accent"
            />
            <button type="submit" className={`${buttonClassName} shrink-0 rounded-none`}>
              Send
            </button>
          </form>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Get exclusive insights on digital strategy and measurable results.
          </p>
        </div>

        <div className="footer-copyright px-8 py-6 sm:col-span-2 lg:col-span-4 lg:px-10">
          <p className="text-sm font-bold uppercase tracking-widest text-white">
            Copyright © {new Date().getFullYear()} Ocevia Lab.
          </p>
        </div>
      </div>
    </footer>
  )
}
