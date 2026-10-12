import { site } from '../content/site'
import { SplitReveal } from '../components/ui/SplitReveal'

// The five steps as a plain ordered list (design review: no pinned sideways scroll).
export function ForgeLoop() {
  const { loop } = site
  return (
    <section id="loop" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(var(--color-ink-700)_1px,transparent_1px),linear-gradient(90deg,var(--color-ink-700)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-32 md:px-10 md:py-44">
        <SplitReveal as="h2" text={loop.title} className="display-lg block max-w-4xl" />

        <ol className="mt-16 border-t border-bone-50/10 md:mt-20">
          {loop.steps.map((s, i) => (
            <li
              key={s.k}
              className="grid grid-cols-[3.5rem_1fr] gap-x-6 gap-y-3 border-b border-bone-50/10 py-8 md:grid-cols-[6rem_minmax(0,16rem)_1fr] md:items-baseline md:gap-x-10 md:py-10"
            >
              <span aria-hidden className="font-display text-3xl font-bold text-heat md:text-5xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="display-md">{s.k}</h3>
              <p className="col-start-2 max-w-xl leading-relaxed text-bone-200 md:col-start-3">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 font-mono text-sm text-bone-400">↺ Then the loop runs again.</p>
      </div>
    </section>
  )
}
