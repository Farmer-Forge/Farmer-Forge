import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site } from '../content/site'
import { SplitReveal } from '../components/ui/SplitReveal'
import { Reveal } from '../components/ui/Reveal'

gsap.registerPlugin(ScrollTrigger)

// Desktop: section pins and the five steps scroll sideways, with a heat bar tracking progress.
// Mobile / reduced motion: a plain vertical stack.
export function ForgeLoop() {
  const { loop } = site
  const section = useRef(null)
  const track = useRef(null)
  const bar = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => track.current.scrollWidth - window.innerWidth
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.8,
          pin: true,
          invalidateOnRefresh: true,
        },
      })
      tl.to(track.current, { x: () => -distance(), ease: 'none' }, 0)
      tl.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)

      gsap.utils.toArray('[data-step]').forEach((el) => {
        gsap.fromTo(
          el.querySelector('[data-num]'),
          { opacity: 0.15 },
          {
            opacity: 1,
            scrollTrigger: { trigger: el, containerAnimation: tl, start: 'left 75%', end: 'left 40%', scrub: true },
          },
        )
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="loop" ref={section} className="relative overflow-hidden bg-ink-900">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(var(--color-ink-700)_1px,transparent_1px),linear-gradient(90deg,var(--color-ink-700)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="relative flex min-h-svh flex-col justify-center py-24 lg:py-0">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <Reveal>
            <p className="eyebrow mb-6">{loop.eyebrow}</p>
          </Reveal>
          <SplitReveal as="h2" text={loop.title} className="display-lg block max-w-4xl" wordClassName="" />
          <div className="mt-10 hidden h-px w-full bg-bone-50/10 min-[900px]:block">
            <div ref={bar} className="h-px origin-left bg-heat" />
          </div>
        </div>

        <div ref={track} className="mt-14 flex flex-col gap-6 px-6 md:px-10 min-[900px]:w-max min-[900px]:flex-row min-[900px]:gap-8 min-[900px]:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] min-[900px]:pr-[30vw]">
          {loop.steps.map((s, i) => (
            <article
              key={s.k}
              data-step
              className="glass relative flex flex-col justify-between rounded-3xl p-8 min-[900px]:h-[44vh] min-[900px]:w-[34vw] min-[900px]:max-w-[520px]"
            >
              <div className="flex items-baseline justify-between">
                <span data-num className="font-display text-6xl font-bold text-heat md:text-8xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Direction cue only makes sense in the sideways desktop track; stacked cards read top to bottom. */}
                <span aria-hidden className="hidden font-mono text-sm text-bone-400 min-[900px]:inline">
                  {i === loop.steps.length - 1 ? '↺ repeat' : '→'}
                </span>
              </div>
              <div className="mt-10">
                <h3 className="display-md">{s.k}</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-bone-200">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
