import { site } from '../content/site'
import { SplitReveal } from '../components/ui/SplitReveal'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'

// Static ember glow rising from the bottom edge, like the back of the business card.
export function Contact() {
  const { contact, email, cta } = site
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-40 md:px-10 md:py-56">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 50% 100%, color-mix(in oklab, var(--color-ember-500) 50%, transparent) 0%, color-mix(in oklab, var(--color-ember-500) 30%, transparent) 30%, color-mix(in oklab, var(--color-ember-700) 20%, transparent) 55%, transparent 80%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl text-center">
        <h2 className="display-xl">
          {contact.lines.map((l) => (
            <SplitReveal key={l} text={l} className="block" />
          ))}
        </h2>
        <Reveal>
          <p className="mx-auto mt-8 max-w-lg text-lg text-bone-200">{contact.body}</p>
        </Reveal>
        <Reveal className="mt-12 flex flex-col items-center gap-6">
          <Button href={`mailto:${email}`}>{cta.label}</Button>
          <a href={`mailto:${email}`} className="font-mono text-sm text-bone-200 underline-offset-8 transition-colors hover:text-ember-300 hover:underline">
            {email}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
