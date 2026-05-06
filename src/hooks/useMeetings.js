import { useCallback, useEffect, useState } from 'react'
import {
  createMeeting,
  deleteMeeting,
  listMeetings,
  updateMeeting,
} from '../services/meetingService'

export function useMeetings() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [meetings, setMeetings] = useState([])
  const [saving, setSaving] = useState(false)

  const refresh = useCallback(async () => {
    try {
      setMeetings(await listMeetings())
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
    addMeeting: (values) => mutate(() => createMeeting(values)),
    deleteMeeting: (id) => mutate(() => deleteMeeting(id)),
    error,
    loading,
    meetings,
    refresh,
    saving,
    updateMeeting: (id, values) => mutate(() => updateMeeting(id, values)),
  }
}
