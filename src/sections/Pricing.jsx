import { site } from '../content/site'
import { SplitReveal } from '../components/ui/SplitReveal'
import { SpotlightCard } from '../components/ui/SpotlightCard'
import { Button } from '../components/ui/Button'

// Engagement pricing, then how a project runs. Prices use the stats treatment (Unbounded, bone-50,
// never the heat gradient). One ghost button: the heat CTA stays in Contact.
export function Pricing() {
  const { pricing, cta } = site
  return (
    <section id="pricing" className="relative mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-44">
      <SplitReveal as="h2" text={pricing.title} className="display-lg block max-w-3xl" />
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone-200">{pricing.intro}</p>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {pricing.items.map((p) => (
          <SpotlightCard key={p.id} className="flex h-full flex-col">
            <h3 className="display-md">{p.title}</h3>
            <p className="mt-6 flex flex-col gap-1">
              <span className="font-mono text-xs text-bone-400">{p.priceLabel}</span>
              <span className="font-display text-3xl font-semibold tracking-tight text-bone-50 md:text-4xl">{p.price}</span>
            </p>
            <p className="mt-6 max-w-lg leading-relaxed text-bone-200">{p.body}</p>
            {p.list && (
              <ul className="mt-4 max-w-lg border-t border-bone-50/10">
                {p.list.map((item) => (
                  <li key={item} className="border-b border-bone-50/10 py-3 text-bone-200">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </SpotlightCard>
        ))}
      </div>

      <h3 className="display-md mt-24">{pricing.stepsTitle}</h3>
      <ol className="mt-10 grid border-t border-bone-50/10 md:grid-cols-2 lg:grid-cols-4">
        {pricing.steps.map((s, i) => (
          <li key={s.k} className="border-b border-bone-50/10 py-8 lg:border-b-0 lg:pr-8">
            <p className="font-mono text-xs text-bone-400">{String(i + 1).padStart(2, '0')}</p>
            <p className="mt-3 font-display text-lg font-semibold text-bone-50">{s.k}</p>
            <p className="mt-3 max-w-xs leading-relaxed text-bone-200">{s.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-14">
        <Button href={cta.href} variant="ghost">
          {cta.label}
        </Button>
      </div>
    </section>
  )
}
