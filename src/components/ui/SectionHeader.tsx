import type { ReactNode } from 'react'
import { Button } from './Button'

type SectionHeaderProps = {
  title: ReactNode
  description: string
  buttonLabel?: string
  buttonTo?: string
  buttonHref?: string
  heading?: 'h1' | 'h2'
  titleClassName?: string
}

const defaultTitleClass =
  'text-3xl font-bold uppercase leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl'

export function SectionHeader({
  title,
  description,
  buttonLabel,
  buttonTo,
  buttonHref,
  heading: Heading = 'h2',
  titleClassName = defaultTitleClass,
}: SectionHeaderProps) {
  return (
    <div className="card-grid animate-fade-in-up grid w-full grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col gap-6 p-8 lg:p-12">
        <Heading className={titleClassName}>{title}</Heading>
        {buttonLabel && (
          <div className="w-fit">
            <Button to={buttonTo} href={buttonHref}>
              {buttonLabel}
            </Button>
          </div>
        )}
      </div>
      <p className="p-8 text-base leading-relaxed text-muted md:text-lg lg:p-12">
        {description}
      </p>
    </div>
  )
}
