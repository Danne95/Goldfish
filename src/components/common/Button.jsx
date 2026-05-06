import { cx } from '../../utils/classNames'

const variantClasses = {
  primary: 'bg-brand text-slate-950 hover:bg-brand-strong',
  secondary: 'bg-canvas-muted text-ink hover:bg-line/50',
  ghost: 'bg-transparent text-ink-muted hover:bg-canvas-muted hover:text-ink',
  danger: 'bg-danger text-white hover:bg-danger/90',
}

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
}

export default function Button({
  children,
  className,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}) {
  return (
    <button
      className={cx(
        'focus-ring inline-flex items-center justify-center gap-2 rounded-2xl font-bold transition disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
