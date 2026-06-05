import { SectionContainer } from './SectionContainer'
import { SectionHeader } from './SectionHeader'

type PageSectionProps = {
  title: string
  description: string
  buttonLabel: string
  buttonTo?: string
  buttonHref?: string
  children: React.ReactNode
}

export function PageSection({
  title,
  description,
  buttonLabel,
  buttonTo,
  buttonHref,
  children,
}: PageSectionProps) {
  return (
    <section className="animate-fade-in-up w-full border-b border-grid-border bg-white">
      <SectionContainer className="pb-8 lg:pb-12">
        <SectionHeader
          title={title}
          description={description}
          buttonLabel={buttonLabel}
          buttonTo={buttonTo}
          buttonHref={buttonHref}
        />
        {children}
      </SectionContainer>
    </section>
  )
}
