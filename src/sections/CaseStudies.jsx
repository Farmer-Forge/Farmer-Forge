import { site } from '../content/site'
import { SplitReveal } from '../components/ui/SplitReveal'
import { Reveal } from '../components/ui/Reveal'
import { SpotlightCard } from '../components/ui/SpotlightCard'

// Real, sourced results only. Stats stay bone, not heat: the numbers carry the weight on their own.
// Each stat is the number, then its label, in reading order.
export function CaseStudies() {
  const { cases } = site
  return (
    <section id="cases" className="relative mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-44">
      <SplitReveal as="h2" text={cases.title} className="display-lg block max-w-3xl" />

      <div className="mt-20 flex flex-col gap-6">
        {cases.items.map((c) => (
          <Reveal key={c.id}>
            <SpotlightCard>
              <article className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
                <div>
                  <ul className="flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <li key={t} className="rounded-full border border-bone-50/10 px-3 py-1 font-mono text-[0.7rem] text-bone-400">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <h3 className="display-md mt-10 max-w-xl">{c.title}</h3>
                  <p className="mt-5 max-w-xl leading-relaxed text-bone-200">{c.body}</p>
                </div>

                <ul className="flex flex-col justify-end gap-8 border-t border-bone-50/10 pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
                  {c.stats.map((s) => (
                    <li key={s.label} className="flex flex-col gap-2">
                      <span className="font-display text-3xl font-bold tracking-tight text-bone-50 md:text-4xl">{s.value}</span>
                      <span className="text-sm leading-snug text-bone-400">{s.label}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
