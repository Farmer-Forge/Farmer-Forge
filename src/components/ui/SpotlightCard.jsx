// Glass card with a heat spotlight that follows the cursor and a border that lights up near it.
// Pure CSS variables, no re-renders on mouse move.
export function SpotlightCard({ children, className = '' }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-3xl glass p-8 md:p-10 transition-transform duration-[var(--dur-base)] ease-forge hover:-translate-y-1 ${className}`}
    >
      {/* spotlight fill */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--dur-base)] group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--color-ember-500) 22%, transparent), transparent 60%)',
        }}
      />
      {/* border glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-[var(--dur-base)] group-hover:opacity-100"
        style={{
          padding: 1,
          background:
            'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), var(--color-ember-300), transparent 70%)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
