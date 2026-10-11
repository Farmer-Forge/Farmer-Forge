# farmer-forge.com

Marketing site for Farmer Forge. It's a static site built for looks, with no backend.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
npm run shoot      # screenshots of every section, desktop + mobile → shots/
```

## Stack

Vite · React 19 · Tailwind v4 · Motion · GSAP ScrollTrigger · Lenis · React Three Fiber + drei · self-hosted variable fonts (Unbounded, Space Grotesk, JetBrains Mono).

## Map

```
src/
  content/site.js          all copy
  index.css                design tokens (@theme) + utilities
  lib/motion.js            easing/duration tokens for JS
  lib/useSmoothScroll.js   Lenis + ScrollTrigger sync, smooth anchor links
  components/ui/           Button, SplitReveal, Reveal, SpotlightCard, CursorGlow
  components/three/        HeroScene (canvas), MoltenField (shader), ForgedCore (3D)
  sections/                Nav, Hero, Services, ForgeLoop, CaseStudies, Method, Principles, Contact, Footer
DESIGN.md                  visual source of truth
STYLE-LOOP.md              rules for agent loops working on this repo
```

## Deploy (Vercel)

1. Push to GitHub, then import the repo in Vercel. `vercel.json` handles the Vite settings.
2. In Project → Domains, add `farmer-forge.com` and `www.farmer-forge.com`.
3. At your registrar, point DNS at Vercel: an `A` record for the apex to `76.76.21.21` and a `CNAME` for `www` to `cname.vercel-dns.com`. Alternatively, switch nameservers to Vercel's. Confirm the exact values Vercel shows on the Domains page.

## Before launch

- [ ] Confirm the contact inbox (`site.email` in `src/content/site.js`, currently `hello@farmer-forge.com`)
- [ ] Copy review in `src/content/site.js`
- [ ] OG image (`public/og.png`, 1200×630) + `og:image` meta in `index.html`
