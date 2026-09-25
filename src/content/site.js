// All copy lives here. Sections read from this file and never hard-code text,
// so a copy pass never touches layout code.

export const site = {
  name: 'Farmer Forge',
  domain: 'farmer-forge.com',
  email: 'hello@farmer-forge.com', // TODO: confirm the real inbox before launch
  nav: [
    { label: 'Work', href: '#services' },
    { label: 'Method', href: '#loop' },
    { label: 'Principles', href: '#principles' },
  ],

  hero: {
    eyebrow: 'AI-native software architecture',
    lines: ['Architecture,', 'forged at', 'machine speed.'],
    heatLine: 2, // which line gets the heat gradient
    body: 'Farmer Forge designs the system. Agentic AI builds it. You get production software on a timeline that used to be impossible, with an architect accountable for every decision.',
    primary: { label: 'Start a project', href: '#contact' },
    secondary: { label: 'See the method', href: '#loop' },
  },

  marquee: [
    'Legacy modernization',
    'Greenfield builds',
    'Agent loops',
    'React',
    'TypeScript',
    'Postgres',
    'Supabase',
    'Event-driven systems',
    'Enterprise architecture',
    'Spec-first delivery',
  ],

  services: {
    eyebrow: '01 / What we forge',
    title: 'What goes into the fire.',
    items: [
      {
        id: '01',
        title: 'Legacy modernization',
        body: 'The system that runs the business but nobody wants to touch. We map it, draw the target architecture, and let agent loops carry the migration while a human signs off on every seam.',
        tags: ['Strangler patterns', 'Data migration', 'Zero-downtime cutover'],
      },
      {
        id: '02',
        title: 'Greenfield builds',
        body: 'From a blank page to a working product in weeks. Architecture and specs come first; the build runs in tight, verified iterations you can watch land.',
        tags: ['MVP to v1', 'React + Postgres', 'Design systems'],
      },
      {
        id: '03',
        title: 'Agent-loop engineering',
        body: 'Already have a team? We set up the loops, guardrails and review gates so your engineers ship with agents instead of babysitting them.',
        tags: ['Loop design', 'Guardrails', 'Team enablement'],
      },
    ],
  },

  loop: {
    eyebrow: '02 / The forge loop',
    title: 'Human decides. Machine executes.',
    steps: [
      { k: 'Survey', body: 'Understand the terrain: the code, the data, the people, the constraints nobody wrote down.' },
      { k: 'Design', body: 'Draw the architecture. Pick the seams. Make the hard calls before a line of code exists.' },
      { k: 'Spec', body: 'Break the design into tasks small enough for an agent to finish and a human to verify.' },
      { k: 'Forge', body: 'Agent loops build, test and commit, pass after pass, against a design system that keeps them honest.' },
      { k: 'Temper', body: 'Every pass is reviewed. What drifts gets corrected at the source, not patched downstream.' },
    ],
  },

  principles: {
    eyebrow: '03 / Principles',
    statement:
      'Speed is cheap now. Judgment is not. We use machines for the volume and keep humans on the decisions that are expensive to get wrong.',
  },

  contact: {
    eyebrow: '04 / Start',
    lines: ['Bring the', 'raw material.'],
    body: 'A legacy system, a half-built product, or just an idea. Tell us what you are working with.',
    cta: 'Start a conversation',
  },
}
