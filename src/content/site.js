// All copy lives here. Sections read from this file and never hard-code text,
// so a copy pass never touches layout code.

export const site = {
  name: 'Farmer Forge',
  domain: 'farmer-forge.com',
  email: 'hello@farmer-forge.com',
  // One main-action label everywhere (nav, hero, contact).
  cta: { label: 'Start a project', href: '#contact' },
  nav: [
    { label: 'Services', href: '#services' },
    { label: 'Method', href: '#loop' },
    { label: 'Case studies', href: '#cases' },
    { label: 'Inside the forge', href: '#inside' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Principles', href: '#principles' },
  ],

  hero: {
    eyebrow: 'AI-native software architecture',
    lines: ['Architecture,', 'forged at', 'machine speed.'],
    heatLine: 2, // which line gets the heat gradient
    body: 'I design the system. Agentic AI builds it. You get production software on a timeline that used to be impossible, with an architect accountable for every decision.',
    secondary: { label: 'See the method', href: '#loop' },
  },

  services: {
    title: 'What goes into the fire.',
    items: [
      {
        id: 'legacy',
        title: 'Legacy modernization',
        body: 'The system that runs the business but nobody wants to touch. I map it, draw the target architecture, and let agent loops carry the migration while I sign off on every seam.',
        tags: ['Strangler patterns', 'Data migration', 'Zero-downtime cutover'],
      },
      {
        id: 'greenfield',
        title: 'Greenfield builds',
        body: 'From a blank page to a working product in weeks. Architecture and specs come first; the build runs in tight, verified iterations you can watch land.',
        tags: ['MVP to v1', 'React + Postgres', 'Design systems'],
      },
      {
        id: 'agent-loops',
        title: 'Agent-loop engineering',
        body: 'Already have a team? I set up the loops, guardrails and review gates so your engineers ship with agents instead of babysitting them.',
        tags: ['Loop design', 'Guardrails', 'Team enablement'],
      },
    ],
  },

  loop: {
    title: 'Human decides. Machine executes.',
    steps: [
      { k: 'Survey', body: 'Understand the terrain: the code, the data, the people, the constraints nobody wrote down.' },
      { k: 'Design', body: 'Draw the architecture. Pick the seams. Make the hard calls before a line of code exists.' },
      { k: 'Spec', body: 'Break the design into tasks small enough for an agent to finish and a human to verify.' },
      { k: 'Forge', body: 'Agent loops build, test and commit, pass after pass, against a design system that keeps them honest.' },
      { k: 'Temper', body: 'Every pass is reviewed. What drifts gets corrected at the source, not patched downstream.' },
    ],
  },

  // Case studies: real numbers only (see DESIGN.md). Nothing names a client.
  cases: {
    title: 'What came out of the fire.',
    items: [
      {
        id: 'manufacturing',
        tags: ['Legacy modernization', 'Manufacturing'],
        title: 'Modernizing a 30-year-old core without stopping production',
        body: 'One database from the mid-1990s, more than 100 applications on top of it, including shop-floor systems that drive production machinery. A big-bang rewrite was never an option. The WinForms core was refactored to Model-View-Presenter so its logic could be tested, every new app goes through a unit-tested API instead of the database, and new React and Node apps, one of them client-facing, take over the old system piece by piece.',
        stats: [
          { value: '0 → 1,000+', label: 'unit tests in about three months' },
          { value: '1 month', label: 'CRM MVP delivered, against 4+ expected' },
          { value: '100+', label: 'apps on one shared database, still running' },
        ],
      },
      {
        id: 'mygear',
        tags: ['Agent loop', 'React + Postgres'],
        title: 'A full-stack app built by an unattended agent loop',
        body: 'Accounts, admin roles, per-user data privacy and forms driven by the database, built one verified step at a time with no one at the keyboard. The loop tested its own work at the API layer. Review then caught what no test could, like navigation with no single owner and styling drift, and every fix went back into the template for the next project.',
        stats: [
          { value: '52', label: 'unattended build passes' },
          { value: '6', label: 'features shipped as clean commits' },
        ],
      },
    ],
  },

  // How the loop behind the MyGear case study actually runs. Describe only: no file contents,
  // hostnames or paths. Every claim here traces to the loop's own activity log or the build retro.
  method: {
    title: 'Inside the forge.',
    intro:
      'The MyGear build above ran on a loop I built and host myself. Here is how it works, and where I stay in charge.',
    items: [
      {
        k: 'plan',
        title: 'It starts with a plan, not a prompt.',
        body: 'Before the loop runs, I write the whole build out as tasks. Each task is broken into numbered steps, and each step has the exact change to make and a way to prove it worked. The last step of every task is a commit. The design decisions happen here, before any code exists.',
      },
      {
        k: 'driver',
        title: 'One step per pass, fresh every time.',
        body: 'A driver script starts a new agent session for every pass, with a clean context and no leftover assumptions. It finds the next unchecked step, does only that step, verifies it and ticks the box. Then the session ends and the next one starts. MyGear took 52 passes across six features.',
      },
      {
        k: 'memory',
        title: 'Memory lives in a log, not in the model.',
        body: 'Every pass writes down what it did, what it checked and what the next pass needs to know. When a pass found that the plan’s own code failed the linter, it fixed the code, explained why, and left a rule so later steps wouldn’t hit the same problem. With no browser to test in, it tested every flow through the API instead, using throwaway accounts it deleted afterward.',
      },
      {
        k: 'sandbox',
        title: 'Every task gets its own sandbox.',
        body: 'The loop runs on a self-hosted Postgres stack on my own server. Each task works in its own copy of the repository, inside a container that holds only the access that task needs. Commits stay local. Nothing reaches the real codebase until I’ve reviewed it.',
      },
      {
        k: 'guardrails',
        title: 'Guardrails for what tests can’t see.',
        body: 'Tests can’t tell you a screen looks wrong. So the loop has to read a design system before touching any UI and check its work against it before committing. If it needs a pattern that doesn’t exist, it has to add it to the system rather than improvise one.',
      },
      {
        k: 'review',
        title: 'Where I stay in.',
        body: 'I write the plan, review every task, and run a retro after the build. Findings fall into three buckets: the loop, the template and the app. Fixes go back into the template, so the next project starts better than this one ended.',
      },
    ],
  },

  // Live apps a visitor can open. Each card's `method` says how it was really built. Only claim
  // "built by the unattended loop" once that's true (so far, only MyGear).
  built: {
    title: 'Shipped and running.',
    intro: 'Two live apps I built the same way: a written design spec and plan before any code, agents doing the build, and my review before anything ships.',
    linkLabel: 'Visit',
    items: [
      {
        id: 'ufopager',
        name: 'UFO Pager',
        method: 'Spec-first, agent-built',
        href: 'https://ufopager.com/',
        tags: ['React + Supabase', 'Stripe', 'Live federal data'],
        body: 'A crowdsourced map of UFO and UAP sightings. People report what they saw, get an email when a sighting lands near them, and browse real federal UAP records pulled live from the National Archives. Subscriptions are built on Stripe.',
      },
      {
        id: 'campsites',
        name: 'Campsite Finder',
        // Flip to 'Built by the unattended loop' once the loop has actually built it.
        method: 'Spec-first, moving to the loop',
        href: 'https://campsites.farmer-forge.com/',
        tags: ['Angular + PrimeNG', 'Supabase', 'Installable PWA'],
        body: 'Finds the nearest federal campgrounds from the National Park Service’s public data, on a map and in a sortable list, with saved favorites for signed-in users. It installs on a phone like an app, and it doubled as a side-by-side test of Angular against React.',
      },
    ],
  },

  // Engagement pricing. Prices are Shawn's; "starting at" figures, never quotes.
  pricing: {
    title: 'What it costs.',
    intro: 'Every project starts with a conversation. No pressure, and no surprise invoices.',
    items: [
      {
        id: 'new',
        title: 'New builds',
        priceLabel: 'Starting at',
        price: '$8,000',
        body: 'A custom web app built from scratch around your workflow. Every build includes user accounts, an admin area to manage your data, a mobile-friendly design, and launch on your own domain. A free consult gets you an estimate range before you commit to anything.',
      },
      {
        id: 'existing',
        title: 'Existing systems',
        priceLabel: 'Reviews from',
        price: '$300',
        body: 'Already have software that’s slow, broken, or outgrown? I start with a two-hour review and give you a written summary: what’s working, what’s at risk, and what it would take to fix. Ongoing work is billed hourly or quoted per feature.',
      },
      {
        id: 'consulting',
        title: 'Consulting',
        priceLabel: 'Starting at',
        price: '$500',
        body: 'Straight answers from someone who builds this every day:',
        list: [
          'AI and automation: where it actually saves time',
          'Choosing a tech stack and hosting',
          'Database schema design',
          'Turning an app idea into a buildable plan',
        ],
      },
      {
        id: 'care',
        title: 'Hosting & care plans',
        priceLabel: 'Pricing',
        price: 'On request',
        body: 'I can keep your app running, updated, and monitored, so you don’t have to think about it.',
      },
    ],
    stepsTitle: 'How a project runs',
    steps: [
      { k: 'Free consult', body: 'You tell me what you need, and I give you an honest estimate range.' },
      { k: 'Spec', body: 'I define exactly what gets built, with a fixed price. The spec fee is credited toward the build.' },
      { k: 'Build', body: 'You see progress along the way, with two rounds of revisions included.' },
      { k: 'Launch', body: 'It goes live, plus 30 days of bug fixes.' },
    ],
  },

  principles: {
    statement:
      'Speed is cheap now. Judgment is not. I use machines for the volume and keep a human on the decisions that are expensive to get wrong.',
  },

  contact: {
    lines: ['Bring the', 'raw material.'],
    body: 'A legacy system, a half-built product, or just an idea. Tell me what you are working with.',
  },
}
