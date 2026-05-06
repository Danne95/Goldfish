import { useCallback, useEffect, useState } from 'react'
import { completeTask, createTask, deleteTask, listTasks, updateTask } from '../services/taskService'

export function useTasks() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [tasks, setTasks] = useState([])

  const refresh = useCallback(async () => {
    try {
      setTasks(await listTasks())
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
    addTask: (values) => mutate(() => createTask(values)),
    completeTask: (task) => mutate(() => completeTask(task)),
    deleteTask: (id) => mutate(() => deleteTask(id)),
    error,
    loading,
    refresh,
    saving,
    tasks,
    updateTask: (id, values) => mutate(() => updateTask(id, values)),
  }
}
