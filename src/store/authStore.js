import { create } from 'zustand'
import { getSession, onAuthStateChange, signInWithGoogle, signOut } from '../services/authService'

export const useAuthStore = create((set, get) => ({
  error: null,
  initialized: false,
  loading: true,
  session: null,
  unsubscribe: null,
  user: null,
  initializeAuth: async () => {
    if (get().initialized) return

    set({ error: null, loading: true })

    try {
      const session = await getSession()
      const unsubscribe = onAuthStateChange((nextSession) => {
        set({
          session: nextSession,
          user: nextSession?.user || null,
        })
      })

      set({
        initialized: true,
        loading: false,
        session,
        unsubscribe,
        user: session?.user || null,
      })
    } catch (error) {
      set({
        error: error.message,
        initialized: true,
        loading: false,
        session: null,
        user: null,
      })
    }
  },
  loginWithGoogle: async () => {
    set({ error: null })
    try {
      await signInWithGoogle()
    } catch (error) {
      set({ error: error.message })
    }
  },
  logout: async () => {
    set({ error: null })
    try {
      await signOut()
      set({ session: null, user: null })
    } catch (error) {
      set({ error: error.message })
    }
  },
}))
