import { site } from '../content/site'

export function Marquee() {
  const items = [...site.marquee, ...site.marquee]
  return (
    <div className="relative overflow-hidden border-y border-bone-50/10 bg-ink-900/60 py-6" aria-label={site.marquee.join(', ')}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
      <div className="marquee-track flex w-max items-center gap-10" aria-hidden>
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-lg font-medium tracking-tight text-bone-400 md:text-2xl">
            {t}
            <span className="text-ember-500">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
