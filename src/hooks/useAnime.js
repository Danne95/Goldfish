import { useCallback, useEffect, useState } from 'react'
import { createAnime, deleteAnime, listAnime, updateAnime } from '../services/animeService'

export function useAnime() {
  const [anime, setAnime] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const refresh = useCallback(async () => {
    try {
      setAnime(await listAnime())
      setError(null)
    } catch (nextError) {
      setError(nextError.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const mutate = useCallback(
    async (operation) => {
      setError(null)
      setSaving(true)
      try {
        const result = await operation()
        await refresh()
        return result
      } catch (nextError) {
        setError(nextError.message)
        throw nextError
      } finally {
        setSaving(false)
      }
    },
    [refresh],
  )

  useEffect(() => {
    const timer = window.setTimeout(() => {
      refresh()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [refresh])

  return {
    addAnime: (values) => mutate(() => createAnime(values)),
    anime,
    deleteAnime: (id) => mutate(() => deleteAnime(id)),
    error,
    loading,
    refresh,
    saving,
    updateAnime: (id, values) => mutate(() => updateAnime(id, values)),
  }
}
