import { PRIORITIES } from '../utils/constants'
import { todayISO } from '../utils/dateUtils'
import { calculateNextOccurrence, byPriorityDeadlineCreated } from '../utils/taskUtils'
import { getCurrentUserId } from './authService'
import { cleanRecord, ensureData, hasField, nullable, nullableNumber } from './serviceUtils'
import { requireSupabase } from './supabaseClient'

const TABLE = 'tasks'

function normalizeTask(values) {
  const recurrenceType = hasField(values, 'recurrence_type') ? nullable(values.recurrence_type) : undefined

  return cleanRecord({
    completed: hasField(values, 'completed') ? values.completed : undefined,
    deadline: hasField(values, 'deadline') ? nullable(values.deadline) : undefined,
    name: hasField(values, 'name') ? values.name?.trim() : undefined,
    next_occurrence: hasField(values, 'next_occurrence') ? nullable(values.next_occurrence) : undefined,
    notes: hasField(values, 'notes') ? nullable(values.notes?.trim()) : undefined,
    priority: hasField(values, 'priority') ? values.priority || PRIORITIES.MEDIUM : undefined,
    recurrence_interval: hasField(values, 'recurrence_type')
      ? recurrenceType
        ? nullableNumber(values.recurrence_interval) || 1
        : null
      : undefined,
    recurrence_type: recurrenceType,
  })
}

export async function listTasks() {
  const data = ensureData(await requireSupabase().from(TABLE).select('*')) ?? []
  return data.sort(byPriorityDeadlineCreated)
}

export async function createTask(values) {
  const userId = await getCurrentUserId()
  return ensureData(
    await requireSupabase()
      .from(TABLE)
      .insert({
        priority: PRIORITIES.MEDIUM,
        ...normalizeTask(values),
        completed: false,
        user_id: userId,
      })
      .select()
      .single(),
  )
}

export async function updateTask(id, values) {
  return ensureData(
    await requireSupabase()
      .from(TABLE)
      .update(normalizeTask(values))
      .eq('id', id)
      .select()
      .single(),
  )
}

export async function deleteTask(id) {
  return ensureData(await requireSupabase().from(TABLE).delete().eq('id', id))
}

export async function completeTask(task) {
  if (task.recurrence_type) {
    return updateTask(task.id, {
      completed: false,
      next_occurrence: calculateNextOccurrence({
        fromDate: todayISO(),
        interval: task.recurrence_interval,
        recurrenceType: task.recurrence_type,
      }),
    })
  }

  return updateTask(task.id, { completed: true })
}
