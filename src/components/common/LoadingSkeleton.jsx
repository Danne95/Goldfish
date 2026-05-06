export default function LoadingSkeleton({ count = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          className="h-24 animate-pulse rounded-3xl border border-line bg-canvas-muted"
          key={index}
        />
      ))}
    </div>
  )
}
