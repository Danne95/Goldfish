import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import ErrorMessage from '../../components/common/ErrorMessage'
import ThemeToggle from '../../components/layout/ThemeToggle'
import PageWrapper from '../../components/layout/PageWrapper'
import { useAuthStore } from '../../store/authStore'

export default function SettingsPage() {
  const error = useAuthStore((state) => state.error)
  const logout = useAuthStore((state) => state.logout)
  const user = useAuthStore((state) => state.user)
  const avatarUrl = user?.user_metadata?.avatar_url
  const displayName = user?.user_metadata?.full_name || user?.email

  return (
    <PageWrapper eyebrow="Preferences" title="Settings">
      <div className="grid gap-5 xl:grid-cols-2">
        <Card className="space-y-4">
          <Card.Title>Appearance</Card.Title>
          <p className="text-sm leading-6 text-ink-muted">
            Dark mode is the default and persists to localStorage through Zustand.
          </p>
          <ThemeToggle />
        </Card>

        <Card className="space-y-5">
          <Card.Title>Google Account</Card.Title>
          <ErrorMessage message={error} />
          <div className="flex items-center gap-4 rounded-3xl border border-line bg-canvas-muted p-4">
            {avatarUrl ? (
              <img alt={displayName} className="h-16 w-16 rounded-full border border-line" src={avatarUrl} />
            ) : (
              <div className="grid h-16 w-16 place-items-center rounded-full bg-brand-soft font-display text-2xl font-bold text-brand-strong">
                {displayName?.slice(0, 1).toUpperCase() || 'U'}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate font-bold text-ink">{displayName}</p>
              <p className="truncate text-sm text-ink-muted">{user?.email}</p>
            </div>
          </div>
          <Button onClick={logout} variant="danger">
            Sign out
          </Button>
        </Card>
      </div>
    </PageWrapper>
  )
}
