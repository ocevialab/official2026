import logoColoredSrc from '../../assets/horizontalLOGOColored.png'
import logoSrc from '../../assets/logo-07.png'

type LogoProps = {
  className?: string
  variant?: 'default' | 'colored'
}

export function Logo({ className = 'h-14 w-auto', variant = 'default' }: LogoProps) {
  const src = variant === 'colored' ? logoColoredSrc : logoSrc

  return (
    <img
      src={src}
      alt="Ocevia Lab"
      className={`object-contain ${className}`}
    />
  )
}
