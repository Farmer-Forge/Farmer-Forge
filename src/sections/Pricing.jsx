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
          <SpotlightCard key={p.id} className={`h-full ${p.wide ? 'md:col-span-2' : ''}`}>
            {/* A wide card splits in two from md: title, price and body left; list and note right. */}
            <div className={p.wide ? 'grid gap-x-12 md:grid-cols-2' : ''}>
              <div className="min-w-0">
                <h3 className="display-md">{p.title}</h3>
                <p className="mt-6 flex flex-col gap-1">
                  <span className="font-mono text-xs text-bone-400">{p.priceLabel}</span>
                  <span className={`font-display font-semibold tracking-tight text-bone-50 ${p.wide ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'}`}>{p.price}</span>
                </p>
                <p className="mt-6 max-w-lg leading-relaxed text-bone-200">{p.body}</p>
              </div>
              <div className={`min-w-0 ${p.wide ? 'md:pt-2' : ''}`}>
                {p.list && (
                  <ul className={`max-w-lg border-t border-bone-50/10 ${p.wide ? 'mt-6 md:mt-0' : 'mt-4'}`}>
                    {p.list.map((item) => (
                      <li key={item} className="border-b border-bone-50/10 py-3 text-bone-200">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {p.note && <p className="mt-6 max-w-lg font-mono text-sm text-bone-400">{p.note}</p>}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      <h3 className="display-md mt-24">{pricing.stepsTitle}</h3>
      <ol className="mt-10 grid border-t border-bone-50/10 md:grid-cols-2 lg:grid-cols-4">
        {pricing.steps.map((s, i) => (
          <li key={s.k} className="border-b border-bone-50/10 py-8 lg:border-b-0 lg:pr-8">
            <p className="flex items-baseline gap-3 font-display text-lg font-semibold text-bone-50">
              <span className="text-bone-400">{i + 1}</span>
              <span>{s.k}</span>
            </p>
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
