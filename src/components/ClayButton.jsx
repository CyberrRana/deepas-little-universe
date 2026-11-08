export default function ClayButton({
  children,
  className = '',
  variant = 'default',
  icon,
  trailingIcon,
  ...rest
}) {
  const variantClass =
    variant === 'lav'
      ? 'clay-btn--lav'
      : variant === 'butter'
        ? 'clay-btn--butter'
        : variant === 'ghost'
          ? 'clay-btn--ghost'
          : ''

  return (
    <button className={`clay-btn ${variantClass} ${className}`} {...rest}>
      <span className="relative z-10 flex items-center justify-center gap-2.5">
        {icon ? <span className="shrink-0">{icon}</span> : null}
        <span>{children}</span>
        {trailingIcon ? <span className="shrink-0">{trailingIcon}</span> : null}
      </span>
    </button>
  )
}
