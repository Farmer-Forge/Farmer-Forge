// Block wrapper. Content below the hero is visible by default (design review, 2026-10-03):
// no fade-in on scroll, so nothing is hidden from screenshots, slow devices or impatient readers.
export function Reveal({ children, className = '', as: Tag = 'div' }) {
  return <Tag className={className}>{children}</Tag>
}
