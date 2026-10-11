import { site } from '../content/site'
import { SplitReveal } from '../components/ui/SplitReveal'
import { Reveal } from '../components/ui/Reveal'
import { SpotlightCard } from '../components/ui/SpotlightCard'

export function Services() {
  const { services } = site
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-44">
      <SplitReveal as="h2" text={services.title} className="display-lg block max-w-3xl" />

      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {services.items.map((s, i) => (
          <Reveal key={s.id} className={['md:col-span-2', '', 'md:col-span-3'][i]}>
            <SpotlightCard className="h-full">
              <h3 className="display-md">{s.title}</h3>
              <p className="mt-4 max-w-lg text-bone-200 leading-relaxed">{s.body}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <li key={t} className="rounded-full border border-bone-50/10 px-3 py-1 font-mono text-[0.7rem] text-bone-400">
                    {t}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
