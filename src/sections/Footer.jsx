import { site } from '../content/site'
import { Wordmark } from './Nav'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-bone-50/10 px-6 pt-16 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Wordmark />
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-bone-400">
          {site.nav.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="whitespace-nowrap transition-colors hover:text-bone-50">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="font-mono text-xs text-bone-600">
          © {new Date().getFullYear()} {site.name} · {site.domain}
        </p>
      </div>
      <p
        aria-hidden
        className="mt-16 select-none whitespace-nowrap text-center font-display font-bold leading-none tracking-tighter text-transparent"
        style={{
          fontSize: 'clamp(3rem, 14.5vw, 15rem)',
          WebkitTextStroke: '1px color-mix(in oklab, var(--color-ember-500) 45%, transparent)',
          marginBottom: '-0.18em',
        }}
      >
        FARMER FORGE
      </p>
    </footer>
  )
}
