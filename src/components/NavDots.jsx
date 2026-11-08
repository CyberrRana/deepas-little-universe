export default function NavDots({ sections, active, onNavigate }) {
  return (
    <nav
      aria-label="Sections"
      className="fixed top-1/2 right-5 z-[70] hidden -translate-y-1/2 flex-col items-end gap-1 lg:flex"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          className="nav-dot"
          data-active={active === section.id}
          onClick={() => onNavigate(section.id)}
          aria-label={`Go to ${section.label}`}
          aria-current={active === section.id ? 'true' : undefined}
        >
          <span className="label">{section.label}</span>
          <i aria-hidden="true" />
        </button>
      ))}
    </nav>
  )
}
