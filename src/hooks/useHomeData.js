import { useCallback, useEffect, useState } from 'react'
import { listAnime } from '../services/animeService'
import { listBirthdays } from '../services/birthdayService'
import { listMeetings } from '../services/meetingService'
import { completeTask, listTasks } from '../services/taskService'
import { ANIME_STATUSES } from '../utils/constants'
import {
  getTodaysDayValue,
  shouldShowBirthdayAlert,
  upcomingMeetingsForDashboard,
} from '../utils/dateUtils'
import { getActiveTasks } from '../utils/taskUtils'

const emptyDashboardData = {
  birthdayAlerts: [],
  meetings: [],
  tasks: [],
  todayAnime: [],
}

export function useHomeData() {
  const [data, setData] = useState(emptyDashboardData)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const [birthdays, tasks, anime, meetings] = await Promise.all([
        listBirthdays(),
        listTasks(),
        listAnime(),
        listMeetings(),
      ])

      const todayDay = getTodaysDayValue()

      setData({
        birthdayAlerts: birthdays.filter(shouldShowBirthdayAlert),
        meetings: upcomingMeetingsForDashboard(meetings),
        tasks: getActiveTasks(tasks),
        todayAnime: anime.filter(
          (item) => item.release_day === todayDay && item.status === ANIME_STATUSES.WATCHING,
        ),
      })
      setError(null)
    } catch (nextError) {
      setError(nextError.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const completeDashboardTask = useCallback(
    async (task) => {
      await completeTask(task)
      await refresh()
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
    completeTask: completeDashboardTask,
    data,
    error,
    loading,
    refresh,
  }
}
