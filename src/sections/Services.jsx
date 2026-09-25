import { site } from '../content/site'
import { SplitReveal } from '../components/ui/SplitReveal'
import { Reveal } from '../components/ui/Reveal'
import { SpotlightCard } from '../components/ui/SpotlightCard'
import { stagger } from '../lib/motion'

export function Services() {
  const { services } = site
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-44">
      <Reveal>
        <p className="eyebrow mb-6">{services.eyebrow}</p>
      </Reveal>
      <SplitReveal as="h2" text={services.title} className="display-lg block max-w-3xl" />

      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {services.items.map((s, i) => (
          <Reveal key={s.id} delay={i * stagger.items} className={['md:col-span-2', '', 'md:col-span-3'][i]}>
            <SpotlightCard className="h-full">
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-ember-300">/{s.id}</span>
                <span className="h-2 w-2 rounded-full bg-plasma-500 shadow-[0_0_12px_var(--color-plasma-500)]" />
              </div>
              <h3 className="display-md mt-16">{s.title}</h3>
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
