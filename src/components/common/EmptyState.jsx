import Button from './Button'

export default function EmptyState({ actionLabel, children, onAction, title }) {
  return (
    <div className="rounded-3xl border border-dashed border-line bg-canvas-muted/60 p-8 text-center">
      <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
      {children ? <p className="mt-2 text-sm leading-6 text-ink-muted">{children}</p> : null}
      {onAction ? (
        <Button className="mt-5" onClick={onAction} variant="secondary">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
