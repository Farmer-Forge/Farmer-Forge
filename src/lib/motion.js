// JS mirror of the motion tokens in index.css / DESIGN.md.
// Components import from here. Never write a raw cubic-bezier or duration inline.

export const ease = {
  forge: [0.16, 1, 0.3, 1],
  strike: [0.7, 0, 0.84, 0],
  molten: [0.45, 0, 0.55, 1],
}

export const dur = {
  quick: 0.2,
  base: 0.6,
  slow: 1.2,
  ambient: 12,
}

export const stagger = {
  words: 0.06,
  items: 0.12,
}

export const gsapEase = {
  forge: 'expo.out',
  strike: 'expo.in',
  molten: 'sine.inOut',
}
