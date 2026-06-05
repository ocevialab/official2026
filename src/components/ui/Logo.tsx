import logoSrc from '../../assets/logo-07.png'

type LogoProps = {
  className?: string
}

export function Logo({ className = 'h-14 w-auto' }: LogoProps) {
  return (
    <img
      src={logoSrc}
      alt="Ocevia Lab"
      className={`object-contain ${className}`}
    />
  )
}
