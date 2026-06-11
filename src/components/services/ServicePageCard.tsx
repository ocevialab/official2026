type ServicePageCardProps = {
  number: string
  title: string
  detail: string
  image: string
  imageAlt: string
}

export function ServicePageCard({
  number,
  title,
  detail,
  image,
  imageAlt,
}: ServicePageCardProps) {
  return (
    <article className="premium-card service-page-card group flex h-full flex-col overflow-hidden bg-white">
      <div className="reveal-clip-target relative aspect-[16/10] overflow-hidden border-b border-grid-border">
        <img
          src={image}
          alt={imageAlt}
          className="img-hover-zoom h-full w-full object-cover"
        />
      </div>

      <div className="card-interactive flex flex-1 flex-col p-6 lg:p-8">
        <span className="text-sm font-bold tracking-widest text-muted">{number}</span>
        <h3 className="mt-3 text-xl font-bold uppercase leading-snug tracking-tight text-ink lg:text-2xl">
          {title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{detail}</p>
      </div>
    </article>
  )
}
