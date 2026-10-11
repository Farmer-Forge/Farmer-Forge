import { useSmoothScroll } from './lib/useSmoothScroll'
import { CursorGlow } from './components/ui/CursorGlow'
import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { ForgeLoop } from './sections/ForgeLoop'
import { CaseStudies } from './sections/CaseStudies'
import { Method } from './sections/Method'
import { Built } from './sections/Built'
import { Principles } from './sections/Principles'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

export default function App() {
  useSmoothScroll()
  return (
    <>
      <div className="grain" aria-hidden />
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <Services />
        <ForgeLoop />
        <CaseStudies />
        <Method />
        <Built />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
