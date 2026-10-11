import { useSmoothScroll } from './lib/useSmoothScroll'
import { CursorGlow } from './components/ui/CursorGlow'
import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { Marquee } from './sections/Marquee'
import { Services } from './sections/Services'
import { ForgeLoop } from './sections/ForgeLoop'
import { CaseStudies } from './sections/CaseStudies'
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
        <Marquee />
        <Services />
        <ForgeLoop />
        <CaseStudies />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
