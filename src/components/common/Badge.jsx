import { cx } from '../../utils/classNames'

const toneClasses = {
  default: 'border-line bg-canvas-muted text-ink-muted',
  brand: 'border-brand/40 bg-brand-soft text-ink',
  danger: 'border-danger/40 bg-danger-soft text-danger',
  success: 'border-success/40 bg-success-soft text-success',
  urgent: 'border-priority-urgent/40 bg-priority-urgent/15 text-priority-urgent',
  high: 'border-priority-high/40 bg-priority-high/15 text-priority-high',
  medium: 'border-priority-medium/40 bg-priority-medium/15 text-priority-medium',
  low: 'border-priority-low/40 bg-priority-low/15 text-priority-low',
}

export default function Badge({ children, className, tone = 'default' }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-extrabold uppercase tracking-[0.16em]',
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
