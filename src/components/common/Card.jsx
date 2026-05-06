import { cx } from '../../utils/classNames'

function Card({ as: Component = 'section', children, className }) {
  return (
    <Component
      className={cx(
        'rounded-4xl border border-line bg-canvas-elevated/86 p-5 shadow-card backdrop-blur-xl',
        className,
      )}
    >
      {children}
    </Component>
  )
}

function CardTitle({ children, className }) {
  return (
    <h2 className={cx('font-display text-2xl font-bold tracking-tight text-ink', className)}>
      {children}
    </h2>
  )
}

function CardActions({ children, className }) {
  return <div className={cx('flex flex-wrap items-center gap-2', className)}>{children}</div>
}

Card.Title = CardTitle
Card.Actions = CardActions

export default Card
