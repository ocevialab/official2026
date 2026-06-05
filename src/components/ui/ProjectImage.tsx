type ProjectImageProps = {
  desktop: string
  mobile: string
  alt: string
  className?: string
  imgClassName?: string
  loading?: 'lazy' | 'eager'
}

export function ProjectImage({
  desktop,
  mobile,
  alt,
  className = '',
  imgClassName = 'h-full w-full object-cover object-center',
  loading = 'lazy',
}: ProjectImageProps) {
  return (
    <picture className={className}>
      <source media="(max-width: 767px)" srcSet={mobile} />
      <img src={desktop} alt={alt} className={imgClassName} loading={loading} />
    </picture>
  )
}
