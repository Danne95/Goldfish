import { getNextBirthdayDate } from '../utils/dateUtils'
import { getCurrentUserId } from './authService'
import { cleanRecord, ensureData, hasField, nullable, nullableNumber } from './serviceUtils'
import { requireSupabase } from './supabaseClient'

const TABLE = 'birthdays'

function normalizeBirthday(values) {
  return cleanRecord({
    alert_days_before: hasField(values, 'alert_days_before')
      ? nullableNumber(values.alert_days_before)
      : undefined,
    birth_date: hasField(values, 'birth_date') ? values.birth_date : undefined,
    name: hasField(values, 'name') ? values.name?.trim() : undefined,
    notes: hasField(values, 'notes') ? nullable(values.notes?.trim()) : undefined,
    snoozed_until: hasField(values, 'snoozed_until') ? nullable(values.snoozed_until) : undefined,
  })
}

export async function listBirthdays() {
  return ensureData(
    await requireSupabase().from(TABLE).select('*').order('name', { ascending: true }),
  ) ?? []
}

export async function createBirthday(values) {
  const userId = await getCurrentUserId()
  return ensureData(
    await requireSupabase()
      .from(TABLE)
      .insert({ ...normalizeBirthday(values), user_id: userId })
      .select()
      .single(),
  )
}

export async function updateBirthday(id, values) {
  return ensureData(
    await requireSupabase()
      .from(TABLE)
      .update(normalizeBirthday(values))
      .eq('id', id)
      .select()
      .single(),
  )
}

export async function deleteBirthday(id) {
  return ensureData(await requireSupabase().from(TABLE).delete().eq('id', id))
}

export async function snoozeBirthdayUntilBirthday(birthday) {
  return updateBirthday(birthday.id, {
    snoozed_until: getNextBirthdayDate(birthday.birth_date),
  })
}
