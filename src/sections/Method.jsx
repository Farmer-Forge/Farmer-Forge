import { site } from '../content/site'
import { SplitReveal } from '../components/ui/SplitReveal'

// "Inside the forge": how the loop behind the case studies runs. Title and intro stay pinned
// beside the list on wide screens (plain CSS sticky); everything stacks on phones.
export function Method() {
  const { method } = site
  return (
    <section id="inside" className="relative mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-44">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SplitReveal as="h2" text={method.title} className="display-lg block max-w-xl" />
          <p className="mt-8 max-w-md text-lg leading-relaxed text-bone-200">{method.intro}</p>
        </div>

        <ul className="border-t border-bone-50/10">
          {method.items.map((m) => (
            <li key={m.k} className="border-b border-bone-50/10 py-10 md:py-12">
              <p className="flex items-center gap-3 font-mono text-xs text-bone-400">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-plasma-500 shadow-[0_0_10px_var(--color-plasma-500)]" />
                {m.k}
              </p>
              <h3 className="display-md mt-5 max-w-xl">{m.title}</h3>
              <p className="mt-4 max-w-xl leading-relaxed text-bone-200">{m.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
