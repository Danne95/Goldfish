import { ANIME_STATUSES, DAYS_OF_WEEK } from '../utils/constants'
import { getCurrentUserId } from './authService'
import { cleanRecord, ensureData, hasField } from './serviceUtils'
import { requireSupabase } from './supabaseClient'

const TABLE = 'anime'
const dayOrder = DAYS_OF_WEEK.reduce((accumulator, day, index) => {
  accumulator[day.value] = index
  return accumulator
}, {})

function normalizeAnime(values) {
  return cleanRecord({
    name: hasField(values, 'name') ? values.name?.trim() : undefined,
    release_day: hasField(values, 'release_day') ? values.release_day : undefined,
    release_time: hasField(values, 'release_time') ? values.release_time : undefined,
    status: hasField(values, 'status') ? values.status || ANIME_STATUSES.WATCHING : undefined,
  })
}

function sortAnime(left, right) {
  const dayResult = (dayOrder[left.release_day] ?? 99) - (dayOrder[right.release_day] ?? 99)
  if (dayResult !== 0) return dayResult
  return (left.release_time || '').localeCompare(right.release_time || '')
}

export async function listAnime() {
  const data = ensureData(await requireSupabase().from(TABLE).select('*')) ?? []
  return data.sort(sortAnime)
}

export async function createAnime(values) {
  const userId = await getCurrentUserId()
  return ensureData(
    await requireSupabase()
      .from(TABLE)
      .insert({ status: ANIME_STATUSES.WATCHING, ...normalizeAnime(values), user_id: userId })
      .select()
      .single(),
  )
}

export async function updateAnime(id, values) {
  return ensureData(
    await requireSupabase()
      .from(TABLE)
      .update(normalizeAnime(values))
      .eq('id', id)
      .select()
      .single(),
  )
}

export async function deleteAnime(id) {
  return ensureData(await requireSupabase().from(TABLE).delete().eq('id', id))
}
