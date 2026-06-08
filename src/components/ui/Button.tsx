import { Link } from 'react-router-dom'

const buttonBaseClassName =
  'btn-interactive inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold'

const buttonVariants = {
  primary: 'bg-cobalt text-white hover:bg-navy',
  outline: 'border border-cobalt bg-transparent text-cobalt hover:bg-cobalt-tint',
} as const

export const buttonClassName = `${buttonBaseClassName} ${buttonVariants.primary}`

type ButtonProps = {
  children: React.ReactNode
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: keyof typeof buttonVariants
  className?: string
}

export function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
}: ButtonProps) {
  const styles = `${buttonBaseClassName} ${buttonVariants[variant]} ${className}`.trim()

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
