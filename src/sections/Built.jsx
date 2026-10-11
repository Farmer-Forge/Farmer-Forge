import { site } from '../content/site'
import { SplitReveal } from '../components/ui/SplitReveal'
import { SpotlightCard } from '../components/ui/SpotlightCard'
import { Button } from '../components/ui/Button'

// Live apps, linked out. Ghost buttons only: the one heat button per view stays "Start a project".
export function Built() {
  const { built } = site
  return (
    <section id="built" className="relative mx-auto max-w-7xl px-6 pb-32 md:px-10 md:pb-44">
      <SplitReveal as="h2" text={built.title} className="display-lg block max-w-3xl" />
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone-200">{built.intro}</p>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {built.items.map((p) => (
          <SpotlightCard key={p.id} className="flex h-full flex-col">
            <p className="flex items-center gap-3 font-mono text-xs text-bone-400">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-plasma-500 shadow-[0_0_10px_var(--color-plasma-500)]" />
              {p.method}
            </p>
            <h3 className="display-md mt-6">{p.name}</h3>
            <p className="mt-4 max-w-lg leading-relaxed text-bone-200">{p.body}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <li key={t} className="rounded-full border border-bone-50/10 px-3 py-1 font-mono text-[0.7rem] text-bone-400">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href={p.href} variant="ghost" target="_blank" rel="noopener noreferrer" aria-label={`${built.linkLabel} ${p.name} (opens in a new tab)`}>
                {built.linkLabel} {p.name}
              </Button>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  )
}
