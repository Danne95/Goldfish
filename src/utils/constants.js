export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
}

export const PRIORITY_OPTIONS = [
  { value: PRIORITIES.LOW, label: 'Low' },
  { value: PRIORITIES.MEDIUM, label: 'Medium' },
  { value: PRIORITIES.HIGH, label: 'High' },
  { value: PRIORITIES.URGENT, label: 'Urgent' },
]

export const PRIORITY_WEIGHT = {
  [PRIORITIES.URGENT]: 0,
  [PRIORITIES.HIGH]: 1,
  [PRIORITIES.MEDIUM]: 2,
  [PRIORITIES.LOW]: 3,
}

export const RECURRENCE_TYPES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
}

export const RECURRENCE_OPTIONS = [
  { value: RECURRENCE_TYPES.DAILY, label: 'Daily' },
  { value: RECURRENCE_TYPES.WEEKLY, label: 'Weekly' },
  { value: RECURRENCE_TYPES.MONTHLY, label: 'Monthly' },
  { value: RECURRENCE_TYPES.YEARLY, label: 'Yearly' },
]

export const DAYS_OF_WEEK = [
  { value: 'mon', label: 'Monday', shortLabel: 'Mon', jsDay: 1 },
  { value: 'tue', label: 'Tuesday', shortLabel: 'Tue', jsDay: 2 },
  { value: 'wed', label: 'Wednesday', shortLabel: 'Wed', jsDay: 3 },
  { value: 'thu', label: 'Thursday', shortLabel: 'Thu', jsDay: 4 },
  { value: 'fri', label: 'Friday', shortLabel: 'Fri', jsDay: 5 },
  { value: 'sat', label: 'Saturday', shortLabel: 'Sat', jsDay: 6 },
  { value: 'sun', label: 'Sunday', shortLabel: 'Sun', jsDay: 0 },
]

export const DAY_BY_JS_INDEX = DAYS_OF_WEEK.reduce((accumulator, day) => {
  accumulator[day.jsDay] = day.value
  return accumulator
}, {})

export const DAY_LABELS = DAYS_OF_WEEK.reduce((accumulator, day) => {
  accumulator[day.value] = day.label
  return accumulator
}, {})

export const ANIME_STATUSES = {
  WATCHING: 'watching',
  PAUSED: 'paused',
  PLANNED: 'planned',
  COMPLETED: 'completed',
}

export const ANIME_STATUS_OPTIONS = [
  { value: ANIME_STATUSES.WATCHING, label: 'Watching' },
  { value: ANIME_STATUSES.PAUSED, label: 'Paused' },
  { value: ANIME_STATUSES.PLANNED, label: 'Planned' },
  { value: ANIME_STATUSES.COMPLETED, label: 'Completed' },
]

export const DEFAULT_ALERT_DAYS = 7
