# Farmer Forge: Design System ("Tech-Futurist Forge")

This is the visual source of truth for farmer-forge.com. The old Market Farmer's Factory design system said "boring is correct." This one is the opposite: **looks are the product.** But expressive doesn't mean anything goes. The rules here keep the site from turning into a pile of effects, whether a person or an agent loop is doing the building.

If something isn't covered here, add it here first, then use it.

**Stack:** Vite + React 19, Tailwind v4 (tokens live in `src/index.css` under `@theme`), Motion (`motion/react`), GSAP + ScrollTrigger, Lenis, React Three Fiber + drei. No backend.

---

## The idea

A forge sits where raw heat meets precise machining. Every visual choice falls on one of two sides:

- **Ember** (the heat): molten orange gradients, glow, grain, organic noise. It stands for human judgment and craft.
- **Plasma** (the machine): cold cyan, wireframes, grids, monospace. It stands for agentic execution.

The **heat gradient** (`--heat`) runs ember into plasma, which is the brand story in one line. Use it for the moments that matter: the one hero phrase, primary buttons, progress bars and step numbers.

---

## Color tokens

Defined in `src/index.css` → `@theme`. The default Tailwind palette is **disabled** (`--color-*: initial`), so `bg-blue-500` won't compile. That's intentional.

| Token | Hex | Use |
|---|---|---|
| `ink-950` | `#0b0d13` | Page background |
| `ink-900` | `#11141c` | Alternate section background |
| `ink-800` | `#181c26` | Glass base |
| `ink-700` | `#232836` | Grid lines, deep surfaces |
| `ink-600` | `#333a4a` | 3D base material |
| `bone-50` | `#f4f1ea` | Primary text |
| `bone-200` | `#c9c6bf` | Body text |
| `bone-400` | `#a2a4ab` | Muted text, eyebrows |
| `bone-600` | `#6e717a` | Faint text, legal |
| `ember-300` | `#ffb347` | Highlights, hot core |
| `ember-500` | `#ff5a1f` | **Primary accent** |
| `ember-700` | `#c2360b` | Deep heat, gradient start |
| `plasma-300` | `#9af0ff` | Gradient end |
| `plasma-500` | `#3de0ff` | Machine accents: status dots, wireframes |

**Ratio rule:** roughly 85% ink, 12% bone, 3% ember and plasma. If a screenshot looks orange, you've overdone it. The hero shader and the contact section's bottom ember glow are the only places heat floods an area.

Plasma never gets its own large area. It shows up as dots, lines, wireframes and the tail end of the heat gradient.

## Typography

| Role | Font | Utility |
|---|---|---|
| Display (h1, h2, big numbers) | Unbounded Variable | `display-xl`, `display-lg`, `display-md` |
| Body | Space Grotesk Variable | default `font-sans` |
| Eyebrows, tags, code, meta | JetBrains Mono Variable | `eyebrow`, `font-mono` |

Fonts are self-hosted via `@fontsource-variable/*`, so nothing comes from Google at runtime.

- `display-xl`: `clamp(2.6rem, 7.4vw, 7.5rem)`, leading 0.92, tracking -0.045em. One per section at most.
- `display-lg`: section titles.
- `display-md`: card and step titles.
- Only the hero has an `eyebrow`. Sections open straight on their `display-lg` title: no `NN / Label` eyebrows, no `/01` numbering (design review, 2026-10-03).
- Body copy maxes out at `max-w-xl` (roughly 60ch).

## Motion language

**Three curves. Four durations. Nothing else.** Mirrored in `src/lib/motion.js`. Never write a raw `cubic-bezier` or duration inline.

| Curve | Value | Use |
|---|---|---|
| `forge` | `cubic-bezier(0.16, 1, 0.3, 1)` | Default. All entrances and hovers. |
| `strike` | `cubic-bezier(0.7, 0, 0.84, 0)` | Exits only. |
| `molten` | `cubic-bezier(0.45, 0, 0.55, 1)` | Loops and ambient motion. |

| Duration | Value | Use |
|---|---|---|
| `quick` | 200ms | Color and hover state changes |
| `base` | 600ms | UI transitions, card hover lift |
| `slow` | 1200ms | Entrances: text reveals, block reveals |
| `ambient` | 12s | Background drift |

Stagger: `words` 0.06s, `items` 0.12s.

**Entrance patterns (one each, no alternatives):**

- The hero headline uses `<SplitReveal animate>`: a word-by-word masked rise with a slight rotate, played on load.
- Everything below the hero is **visible by default**. `<SplitReveal>` without `animate` and `<Reveal>` render static, so nothing waits on scroll to appear.
- Scroll-scrubbed text is only used in the Principles statement (words heat from ash to ember to bone).
- No pinned or sideways scroll anywhere. The Forge Loop is a vertical ordered list.

**Reduced motion:** `prefers-reduced-motion` disables Lenis and grain, and renders the 3D scene as one still frame. Every new animation must respect this.

## Surfaces

- **Glass** (`glass` utility): 55% ink-800, 18px blur, 9% bone hairline border. Cards, nav (once scrolled), ghost buttons.
- **Radius:** `rounded-3xl` for cards, `rounded-full` for buttons, pills and tags. Nothing in between.
- **Grain:** one fixed SVG-noise overlay at 7% opacity, animated. Already in `App.jsx`. Don't add more.
- **Glow:** only via `ember-500` shadows on the primary button, plasma dot shadows, and the cursor glow. No generic `shadow-lg`.
- **Grid backdrop:** 64px ink-700 grid with a radial mask. Forge Loop section only.

## Components (`src/components/ui/`)

| Component | What it is | Rules |
|---|---|---|
| `Button` | Magnetic pill link | Two variants: `heat` (the one main action per view) and `ghost`. No third variant. |
| `SplitReveal` | Headline | `animate` only in the hero. Static everywhere else. |
| `Reveal` | Block wrapper | Static; kept so sections share one wrapper. |
| `StaticHero` | Phone hero | The business card's sphere as SVG. Phones (`max-width: 767px`) get this instead of WebGL. |
| `SpotlightCard` | Glass card with cursor spotlight and border glow | Every card on the site. |
| `CursorGlow` | Ember light trailing the pointer | Mounted once in `App`. Fine pointers only. |

## 3D (`src/components/three/`)

- **`MoltenField`**: a full-screen domain-warped fbm shader. The palette is hard-coded as GLSL constants from the tokens above, so if a token changes, update the shader too. Heat is masked toward the right so the headline side stays calm.
- **`ForgedCore`**: a distorted clearcoat icosahedron, fresnel halo shell, plasma wireframe cage, ember orbit ring and Sparkles. It leans toward the cursor.
- **`HeroScene`**: owns the Canvas. DPR is capped at 1.75, it stops rendering when off-screen, and it's lazy-loaded (three.js is its own chunk).
- Only the hero gets WebGL, and only above 767px wide. Other sections fake depth with CSS: gradients, blur, glass. One canvas per page.
- No drei `<Environment>` presets (they fetch HDRs from a CDN). Light with the three point lights in `HeroScene`: ember key, plasma fill, amber back.

## Layout

- Container: `mx-auto max-w-7xl px-6 md:px-10`. Every section aligns to it.
- Section rhythm: `py-32 md:py-44` standard, `py-40 md:py-56` for the statement and CTA sections.
- Copy lives in `src/content/site.js`. Sections never hard-code text.

## Case studies

- Section `#cases` sits after the Forge Loop: method first, then proof.
- Stats are the number, then the label, in markup order.
- One full-width `SpotlightCard` per case. Tags, `display-md` title and body on the left; stats on the right, split by a bone hairline (stacked above a top hairline on mobile).
- Stats use Unbounded in `bone-50`, never the heat gradient, with a `bone-400` label.
- Every stat must be real and traceable to a written case study. No client names, no rounded-up guesses.

## Inside the forge (method)

- Section `#inside` sits after the case studies: the proof, then how it was made.
- Two columns on `lg`: title and intro held in place with CSS `sticky` on the left, a hairline list of steps on the right. Stacks on phones.
- Each step: a plasma status dot with a mono label, a `display-md` title, body in `bone-200`.
- **Describe only.** No file contents, hostnames, paths or secret names from the loop. Every claim must trace to the loop's activity log or the build retro.

## Live projects (`#built`)

- Sits right after "Inside the forge", sharing its bottom padding so the two read as one story.
- One `SpotlightCard` per live app, two columns from `md`. Plasma dot + mono build-method label, `display-md` name, body, tags, and a **ghost** `Button` that opens the app in a new tab. Never a heat button here.
- Label each app by how it was really built. Only say "built by the unattended loop" for apps the loop actually built.

## Don'ts

- No default Tailwind colors (they're disabled anyway) and no raw hex in JSX. The exceptions are three.js material props and GLSL, which can't read CSS variables. Keep those in sync with this file.
- No new easing curves or durations.
- No second WebGL canvas.
- The heat gradient appears on at most one headline phrase per screen.
- No invented stats, client logos or testimonials. When there are real ones, add a section for them here first.
- No animation that ignores reduced motion.
