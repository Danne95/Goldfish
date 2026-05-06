import { useCallback, useEffect, useState } from 'react'
import {
  createBirthday,
  deleteBirthday,
  listBirthdays,
  snoozeBirthdayUntilBirthday,
  updateBirthday,
} from '../services/birthdayService'

export function useBirthdays() {
  const [birthdays, setBirthdays] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const refresh = useCallback(async () => {
    try {
      setBirthdays(await listBirthdays())
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
    addBirthday: (values) => mutate(() => createBirthday(values)),
    birthdays,
    deleteBirthday: (id) => mutate(() => deleteBirthday(id)),
    error,
    loading,
    refresh,
    saving,
    snoozeBirthday: (birthday) => mutate(() => snoozeBirthdayUntilBirthday(birthday)),
    updateBirthday: (id, values) => mutate(() => updateBirthday(id, values)),
  }
}
