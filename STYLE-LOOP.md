# Loop instructions: visual quality for farmer-forge.com

Put this file in the agent loop's context, or reference it from PROMPT.md.

On this project, **tests and lint passing does not mean done.** The site's job is to look right. The loop has to look at what it built.

## Before touching UI

1. Read `DESIGN.md` this session.
2. Check `src/components/ui/` and `src/lib/motion.js` for an existing pattern before writing new markup or animation.
3. Copy changes go in `src/content/site.js`, not in section files.

## While building

- Use only the tokens, utilities (`glass`, `text-heat`, `bg-heat`, `eyebrow`, `display-*`) and motion values from DESIGN.md.
- A new pattern (a component, a curve, a color) goes into DESIGN.md **in the same commit** as the code that uses it.
- Any new animation must check `prefers-reduced-motion`.

## Self-check before marking a UI task done

Run all three:

```bash
npm run lint
npm run build
npm run shoot      # writes shots/{desktop,mobile}-{section}.png
```

Then **open the screenshots and look at them.** For each one, check:

- [ ] Nothing overlaps: the 3D core stays clear of the headline, and cards don't collide.
- [ ] The headline is fully visible. A half-risen word means the reveal is broken or the wait is too short.
- [ ] The color ratio feels mostly ink. If it reads as "orange page," pull heat back.
- [ ] The heat gradient appears on at most one phrase per screen.
- [ ] Mobile (390px) has no horizontal overflow and text is readable over the shader.
- [ ] Everything aligns to the `max-w-7xl` container edge.
- [ ] No console or page errors in the `shoot` output.

`npm run shoot` uses Playwright's Chromium. In a container without a default browser, set `CHROMIUM_PATH=/path/to/chrome`.

If any box fails, fix it now. Later passes build on top of visual drift instead of fixing it.

## Escalation

If you keep wanting the same deviation from DESIGN.md, the system is missing something. Propose the addition in DESIGN.md instead of deviating quietly.
