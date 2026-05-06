import { compareDateTime } from '../utils/dateUtils'
import { getCurrentUserId } from './authService'
import { cleanRecord, ensureData, hasField, nullable } from './serviceUtils'
import { requireSupabase } from './supabaseClient'

const TABLE = 'meetings'

function normalizeMeeting(values) {
  const hasRecurringField = hasField(values, 'is_recurring')
  const isRecurring = Boolean(values.is_recurring)

  return cleanRecord({
    date: hasField(values, 'date') ? values.date : undefined,
    is_recurring: hasRecurringField ? isRecurring : undefined,
    location: hasField(values, 'location') ? nullable(values.location?.trim()) : undefined,
    notes: hasField(values, 'notes') ? nullable(values.notes?.trim()) : undefined,
    recurrence_type:
      hasRecurringField || hasField(values, 'recurrence_type')
        ? isRecurring
          ? nullable(values.recurrence_type)
          : null
        : undefined,
    time: hasField(values, 'time') ? values.time : undefined,
    title: hasField(values, 'title') ? values.title?.trim() : undefined,
  })
}

export async function listMeetings() {
  const data = ensureData(await requireSupabase().from(TABLE).select('*')) ?? []
  return data.sort(compareDateTime)
}

export async function createMeeting(values) {
  const userId = await getCurrentUserId()
  return ensureData(
    await requireSupabase()
      .from(TABLE)
      .insert({ ...normalizeMeeting(values), user_id: userId })
      .select()
      .single(),
  )
}

export async function updateMeeting(id, values) {
  return ensureData(
    await requireSupabase()
      .from(TABLE)
      .update(normalizeMeeting(values))
      .eq('id', id)
      .select()
      .single(),
  )
}

export async function deleteMeeting(id) {
  return ensureData(await requireSupabase().from(TABLE).delete().eq('id', id))
}
