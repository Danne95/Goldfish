import { DAY_BY_JS_INDEX } from './constants'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: '2-digit',
})

function pad(value) {
  return String(value).padStart(2, '0')
}

export function toDateInputValue(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function parseDateInput(dateString) {
  if (!dateString) return null
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function todayISO() {
  return toDateInputValue(new Date())
}

export function getTodaysDayValue() {
  return DAY_BY_JS_INDEX[new Date().getDay()]
}

export function formatDate(dateString) {
  const date = parseDateInput(dateString)
  return date ? dateFormatter.format(date) : 'No date'
}

export function formatDateTime(dateString, timeString) {
  const date = parseDateInput(dateString)
  if (!date) return 'No date'
  const [hours = 0, minutes = 0] = (timeString || '00:00').split(':').map(Number)
  date.setHours(hours, minutes)
  return dateTimeFormatter.format(date)
}

export function formatTime(timeString) {
  if (!timeString) return 'No time'
  const [hours = 0, minutes = 0] = timeString.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return timeFormatter.format(date)
}

export function isToday(dateString) {
  return dateString === todayISO()
}

export function compareDateStrings(left, right) {
  if (!left && !right) return 0
  if (!left) return 1
  if (!right) return -1
  return left.localeCompare(right)
}

export function compareDateTime(left, right) {
  const dateResult = compareDateStrings(left.date, right.date)
  if (dateResult !== 0) return dateResult
  return (left.time || '').localeCompare(right.time || '')
}

export function isDateOnOrBeforeToday(dateString) {
  return !dateString || dateString <= todayISO()
}

export function daysUntilBirthday(birthDate) {
  const birth = parseDateInput(birthDate)
  if (!birth) return null

  const today = parseDateInput(todayISO())
  let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())

  if (nextBirthday < today) {
    nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate())
  }

  return Math.ceil((nextBirthday - today) / 86400000)
}

export function getNextBirthdayDate(birthDate) {
  const birth = parseDateInput(birthDate)
  if (!birth) return null

  const today = parseDateInput(todayISO())
  let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())

  if (nextBirthday < today) {
    nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate())
  }

  return toDateInputValue(nextBirthday)
}

export function shouldShowBirthdayAlert(birthday) {
  const daysUntil = daysUntilBirthday(birthday.birth_date)
  if (daysUntil === null) return false
  if (daysUntil === 0) return true

  const alertWindow = birthday.alert_days_before
  if (alertWindow === null || alertWindow === undefined) return false
  if (daysUntil > Number(alertWindow)) return false

  return !birthday.snoozed_until || todayISO() >= birthday.snoozed_until
}

export function upcomingMeetingsForDashboard(meetings) {
  const today = todayISO()
  const sorted = [...meetings].sort(compareDateTime)
  const todaysMeetings = sorted.filter((meeting) => meeting.date === today)
  const nextMeetings = sorted
    .filter((meeting) => meeting.date > today)
    .slice(0, 2)

  return [...todaysMeetings, ...nextMeetings]
}
