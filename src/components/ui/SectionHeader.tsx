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
  'text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl'

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
    <div className="animate-fade-in-up grid w-full gap-8 py-12 md:grid-cols-2 md:items-start md:gap-12 lg:py-16">
      <div className="flex flex-col gap-6">
        <Heading className={titleClassName}>{title}</Heading>
        {buttonLabel && (
          <div className="w-fit">
            <Button to={buttonTo} href={buttonHref}>
              {buttonLabel}
            </Button>
          </div>
        )}
      </div>
      <p className="max-w-xl text-base leading-relaxed text-muted md:pt-1 md:text-lg">
        {description}
      </p>
    </div>
  )
}
