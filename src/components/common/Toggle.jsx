import { cx } from '../../utils/classNames'

export default function Toggle({ checked, className, label, onChange }) {
  return (
    <button
      aria-pressed={checked}
      className={cx(
        'focus-ring inline-flex items-center gap-3 rounded-full border border-line bg-canvas-elevated p-1 pr-4 text-sm font-bold text-ink-muted transition hover:text-ink',
        className,
      )}
      onClick={() => onChange(!checked)}
      type="button"
    >
      <span
        className={cx(
          'h-8 w-8 rounded-full transition',
          checked ? 'translate-x-0 bg-brand' : 'bg-ink-soft',
        )}
      />
      {label}
    </button>
  )
}
