import { NavLink } from 'react-router-dom'
import { cx } from '../../utils/classNames'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/birthdays', label: 'Birthdays' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/anime', label: 'Anime' },
  { to: '/meetings', label: 'Meetings' },
  { to: '/settings', label: 'Settings' },
]

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-sidebar shrink-0 border-r border-line bg-canvas-elevated/70 p-5 backdrop-blur-xl lg:block">
      <div className="sticky top-5">
        <NavLink className="block rounded-4xl bg-brand-soft p-5" to="/">
          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-brand-strong">Goldfish</p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-none text-ink">Day Manager</h1>
        </NavLink>

        <nav className="mt-8 space-y-2">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                cx(
                  'focus-ring block rounded-2xl px-4 py-3 text-sm font-extrabold transition',
                  isActive
                    ? 'bg-brand text-slate-950'
                    : 'text-ink-muted hover:bg-canvas-muted hover:text-ink',
                )
              }
              end={item.to === '/'}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}
