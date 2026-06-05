import { Link } from 'react-router-dom'

export const buttonClassName =
  'btn-interactive inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-cobalt px-6 py-3 text-sm font-semibold text-white hover:bg-navy'

type ButtonProps = {
  children: React.ReactNode
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

export function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const styles = `${buttonClassName} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={styles}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  )
}
