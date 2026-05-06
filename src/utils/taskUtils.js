import { PRIORITY_WEIGHT, RECURRENCE_TYPES } from './constants'
import { compareDateStrings, isDateOnOrBeforeToday, parseDateInput, toDateInputValue, todayISO } from './dateUtils'

export function byPriorityDeadlineCreated(left, right) {
  const priorityResult =
    (PRIORITY_WEIGHT[left.priority] ?? Number.MAX_SAFE_INTEGER) -
    (PRIORITY_WEIGHT[right.priority] ?? Number.MAX_SAFE_INTEGER)

  if (priorityResult !== 0) return priorityResult

  const deadlineResult = compareDateStrings(left.deadline, right.deadline)
  if (deadlineResult !== 0) return deadlineResult

  return (left.created_at || '').localeCompare(right.created_at || '')
}

export function sortTasks(tasks, strategy = byPriorityDeadlineCreated) {
  return [...tasks].sort(strategy)
}

export function isTaskAvailable(task) {
  return isDateOnOrBeforeToday(task.next_occurrence)
}

export function getActiveTasks(tasks, strategy = byPriorityDeadlineCreated) {
  return sortTasks(
    tasks.filter((task) => !task.completed && isTaskAvailable(task)),
    strategy,
  )
}

export function calculateNextOccurrence({
  fromDate = todayISO(),
  recurrenceType,
  interval = 1,
}) {
  if (!recurrenceType) return null

  const nextDate = parseDateInput(fromDate) || new Date()
  const intervalValue = Math.max(Number(interval) || 1, 1)

  if (recurrenceType === RECURRENCE_TYPES.DAILY) {
    nextDate.setDate(nextDate.getDate() + intervalValue)
  }

  if (recurrenceType === RECURRENCE_TYPES.WEEKLY) {
    nextDate.setDate(nextDate.getDate() + intervalValue * 7)
  }

  if (recurrenceType === RECURRENCE_TYPES.MONTHLY) {
    nextDate.setMonth(nextDate.getMonth() + intervalValue)
  }

  if (recurrenceType === RECURRENCE_TYPES.YEARLY) {
    nextDate.setFullYear(nextDate.getFullYear() + intervalValue)
  }

  return toDateInputValue(nextDate)
}
