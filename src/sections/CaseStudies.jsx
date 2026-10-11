import { site } from '../content/site'
import { SplitReveal } from '../components/ui/SplitReveal'
import { Reveal } from '../components/ui/Reveal'
import { SpotlightCard } from '../components/ui/SpotlightCard'
import { stagger } from '../lib/motion'

// Real, sourced results only. Stats stay bone, not heat: the numbers carry the weight on their own.
export function CaseStudies() {
  const { cases } = site
  return (
    <section id="cases" className="relative mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-44">
      <Reveal>
        <p className="eyebrow mb-6">{cases.eyebrow}</p>
      </Reveal>
      <SplitReveal as="h2" text={cases.title} className="display-lg block max-w-3xl" />

      <div className="mt-20 flex flex-col gap-6">
        {cases.items.map((c, i) => (
          <Reveal key={c.id} delay={i * stagger.items}>
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

                <dl className="flex flex-col justify-end gap-8 border-t border-bone-50/10 pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
                  {c.stats.map((s) => (
                    <div key={s.label} className="flex flex-col-reverse gap-2">
                      <dt className="text-sm leading-snug text-bone-400">{s.label}</dt>
                      <dd className="font-display text-3xl font-bold tracking-tight text-bone-50 md:text-4xl">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
