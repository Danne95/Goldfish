import { useEffect } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import ErrorBoundary from './components/common/ErrorBoundary'
import LoadingScreen from './components/common/LoadingScreen'
import { useAuthStore } from './store/authStore'
import HomePage from './pages/Home/HomePage'
import BirthdaysPage from './pages/Birthdays/BirthdaysPage'
import TasksPage from './pages/Tasks/TasksPage'
import AnimePage from './pages/Anime/AnimePage'
import MeetingsPage from './pages/Meetings/MeetingsPage'
import SettingsPage from './pages/Settings/SettingsPage'
import LoginPage from './pages/Login/LoginPage'

function ProtectedRoute() {
  const loading = useAuthStore((state) => state.loading)
  const session = useAuthStore((state) => state.session)

  if (loading) return <LoadingScreen label="Checking your session" />
  if (!session) return <Navigate to="/login" replace />

  return <Outlet />
}

function PublicOnlyRoute() {
  const loading = useAuthStore((state) => state.loading)
  const session = useAuthStore((state) => state.session)

  if (loading) return <LoadingScreen label="Preparing sign in" />
  if (session) return <Navigate to="/" replace />

  return <Outlet />
}

export default function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<AppShell />}>
              <Route index element={<HomePage />} />
              <Route path="/birthdays" element={<BirthdaysPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/anime" element={<AnimePage />} />
              <Route path="/meetings" element={<MeetingsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
