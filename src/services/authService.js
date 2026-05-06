import { isSupabaseConfigured, requireSupabase } from './supabaseClient'

export const isAuthConfigured = isSupabaseConfigured

export async function getSession() {
  const { data, error } = await requireSupabase().auth.getSession()
  if (error) throw error
  return data.session
}

export async function getCurrentUserId() {
  const { data, error } = await requireSupabase().auth.getUser()
  if (error) throw error
  if (!data.user?.id) throw new Error('You must be signed in to change data.')
  return data.user.id
}

export function onAuthStateChange(callback) {
  const { data } = requireSupabase().auth.onAuthStateChange((_event, session) => {
    callback(session)
  })

  return () => data.subscription.unsubscribe()
}

export async function signInWithGoogle() {
  const { error } = await requireSupabase().auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
    },
  })

  if (error) throw error
}

export async function signOut() {
  const { error } = await requireSupabase().auth.signOut()
  if (error) throw error
}
