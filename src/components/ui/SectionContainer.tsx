type SectionContainerProps = {
  children: React.ReactNode
  className?: string
}

export function SectionContainer({ children, className = '' }: SectionContainerProps) {
  return <div className={className.trim()}>{children}</div>
}
