export default function PageWrapper({ actions, children, eyebrow, title }) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8 lg:py-8">
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          {eyebrow ? (
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-brand">{eyebrow}</p>
          ) : null}
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {title}
          </h1>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
      {children}
    </main>
  )
}
