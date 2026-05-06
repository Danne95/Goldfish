import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { useAuthStore } from '../../store/authStore'
import { cx } from '../../utils/classNames'

const mobileItems = [
  { to: '/', label: 'Home' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/birthdays', label: 'Birthdays' },
  { to: '/anime', label: 'Anime' },
  { to: '/meetings', label: 'Meetings' },
  { to: '/settings', label: 'Settings' },
]

export default function Navbar() {
  const user = useAuthStore((state) => state.user)
  const avatarUrl = user?.user_metadata?.avatar_url

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/82 px-4 py-4 backdrop-blur-xl lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <NavLink className="lg:hidden" to="/">
          <p className="font-display text-xl font-bold text-ink">Goldfish</p>
        </NavLink>

        <nav className="hidden gap-2 md:flex lg:hidden">
          {mobileItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                cx(
                  'focus-ring rounded-full px-3 py-2 text-xs font-extrabold',
                  isActive ? 'bg-brand text-slate-950' : 'text-ink-muted',
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

        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          {avatarUrl ? (
            <img
              alt={user?.user_metadata?.full_name || 'User avatar'}
              className="h-10 w-10 rounded-full border border-line"
              src={avatarUrl}
            />
          ) : (
            <div className="grid h-10 w-10 place-items-center rounded-full border border-line bg-canvas-muted text-sm font-bold">
              {user?.email?.slice(0, 1).toUpperCase() || 'U'}
            </div>
          )}
        </div>
      </div>

      <nav className="mt-4 flex gap-2 overflow-x-auto md:hidden">
        {mobileItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              cx(
                'focus-ring shrink-0 rounded-full px-3 py-2 text-xs font-extrabold',
                isActive ? 'bg-brand text-slate-950' : 'bg-canvas-muted text-ink-muted',
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
    </header>
  )
}
