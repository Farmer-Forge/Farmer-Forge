// Phone hero: the business card's sphere as plain SVG, so phones skip WebGL entirely.
// Hex values mirror the card artwork and DESIGN.md tokens (SVG gradients can't read CSS variables).
export function StaticHero() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-ink-950">
      <div
        className="absolute -right-[28%] -top-[2%] h-[95vw] w-[95vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-ember-500) 45%, transparent) 0%, color-mix(in oklab, var(--color-ember-700) 28%, transparent) 35%, transparent 70%)',
        }}
      />
      <svg viewBox="0 0 170 170" className="absolute -right-[10%] top-[8%] h-auto w-[66vw]">
        <defs>
          <radialGradient id="sh-core" cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="#5a1406" />
            <stop offset="0.7" stopColor="#2a0c08" />
            <stop offset="1" stopColor="#150a0a" />
          </radialGradient>
          <linearGradient id="sh-rim" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#ff5a1f" />
            <stop offset="1" stopColor="#3de0ff" />
          </linearGradient>
        </defs>
        <polygon points="85,12 146,40 158,100 118,150 52,152 14,104 22,42" fill="none" stroke="#3de0ff" strokeOpacity="0.35" strokeWidth="0.6" />
        <path d="M85,12 85,82 146,40 M85,82 158,100 M85,82 118,150 M85,82 52,152 M85,82 14,104 M85,82 22,42" fill="none" stroke="#3de0ff" strokeOpacity="0.22" strokeWidth="0.6" />
        <circle cx="85" cy="85" r="46" fill="url(#sh-core)" />
        <circle cx="85" cy="85" r="47" fill="none" stroke="url(#sh-rim)" strokeWidth="1.6" />
        <ellipse cx="85" cy="85" rx="82" ry="17" transform="rotate(-10 85 85)" fill="none" stroke="#ffb347" strokeOpacity="0.6" strokeWidth="0.6" />
        <circle cx="70" cy="68" r="1.6" fill="#9af0ff" />
        <circle cx="104" cy="74" r="1.3" fill="#ffb347" />
      </svg>
    </div>
  )
}
