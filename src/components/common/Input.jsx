import { cx } from '../../utils/classNames'

export default function Input({
  as: Component = 'input',
  className,
  error,
  label,
  name,
  ...props
}) {
  return (
    <label className="block space-y-2">
      {label ? <span className="text-sm font-bold text-ink-muted">{label}</span> : null}
      <Component
        className={cx(
          'focus-ring w-full rounded-2xl border border-line bg-canvas-elevated px-4 py-3 text-ink placeholder:text-ink-soft',
          Component === 'textarea' ? 'min-h-28 resize-y' : '',
          error ? 'border-danger' : '',
          className,
        )}
        name={name}
        {...props}
      />
      {error ? <span className="text-sm font-semibold text-danger">{error}</span> : null}
    </label>
  )
}
