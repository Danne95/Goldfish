export default function ErrorMessage({ message }) {
  if (!message) return null

  return (
    <div className="rounded-3xl border border-danger/40 bg-danger-soft p-4 text-sm font-semibold text-danger">
      {message}
    </div>
  )
}
