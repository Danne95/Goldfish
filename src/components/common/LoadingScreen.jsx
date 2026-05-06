export default function LoadingScreen({ label = 'Loading' }) {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="rounded-4xl border border-line bg-canvas-elevated p-8 text-center shadow-card">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-brand/20 border-t-brand" />
        <p className="font-display text-xl font-bold text-ink">{label}</p>
      </div>
    </main>
  )
}
