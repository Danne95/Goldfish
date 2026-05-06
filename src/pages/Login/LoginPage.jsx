import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import ErrorMessage from '../../components/common/ErrorMessage'
import { isAuthConfigured } from '../../services/authService'
import { useAuthStore } from '../../store/authStore'

export default function LoginPage() {
  const error = useAuthStore((state) => state.error)
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle)

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <Card className="w-full max-w-xl overflow-hidden p-0">
        <div className="bg-brand-soft p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-brand-strong">
            Goldfish
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-none text-ink">
            Your day, sorted before it starts.
          </h1>
          <p className="mt-4 max-w-md leading-7 text-ink-muted">
            Track birthdays, tasks, anime releases, and meetings from one synced dashboard.
          </p>
        </div>

        <div className="space-y-4 p-8">
          {!isAuthConfigured ? (
            <ErrorMessage message="Supabase is not configured yet. Create .env from .env.example before signing in." />
          ) : null}
          <ErrorMessage message={error} />
          <Button
            className="w-full"
            disabled={!isAuthConfigured}
            onClick={loginWithGoogle}
            size="lg"
          >
            Continue with Google
          </Button>
          <p className="text-center text-sm text-ink-muted">
            Authentication is handled by Supabase Google OAuth.
          </p>
        </div>
      </Card>
    </main>
  )
}
