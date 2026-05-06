import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import RecurrencePicker from './RecurrencePicker'
import { PRIORITIES } from '../../utils/constants'
import { PRIORITY_OPTIONS } from '../../utils/constants'

const emptyValues = {
  deadline: '',
  name: '',
  next_occurrence: '',
  notes: '',
  priority: PRIORITIES.MEDIUM,
  recurrence_interval: 1,
  recurrence_type: '',
}

function valuesFromTask(task) {
  if (!task) return emptyValues

  return {
    deadline: task.deadline || '',
    name: task.name || '',
    next_occurrence: task.next_occurrence || '',
    notes: task.notes || '',
    priority: task.priority || PRIORITIES.MEDIUM,
    recurrence_interval: task.recurrence_interval || 1,
    recurrence_type: task.recurrence_type || '',
  }
}

export default function TaskForm({ initialData, onCancel, onSubmit, saving }) {
  const [values, setValues] = useState(valuesFromTask(initialData))

  function updateField(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  function updateRecurrence(patch) {
    setValues((current) => ({ ...current, ...patch }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await onSubmit(values)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        label="Task name"
        name="name"
        onChange={updateField}
        placeholder="Renew passport"
        required
        value={values.name}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Input as="select" label="Priority" name="priority" onChange={updateField} value={values.priority}>
          {PRIORITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Input>
        <Input
          label="Deadline"
          name="deadline"
          onChange={updateField}
          type="date"
          value={values.deadline}
        />
      </div>
      <RecurrencePicker onChange={updateRecurrence} values={values} />
      <Input
        as="textarea"
        label="Notes"
        name="notes"
        onChange={updateField}
        placeholder="Context, links, or checklist notes"
        value={values.notes}
      />
      <div className="flex justify-end gap-3">
        <Button onClick={onCancel} variant="ghost">
          Cancel
        </Button>
        <Button disabled={saving} type="submit">
          {initialData ? 'Save task' : 'Add task'}
        </Button>
      </div>
    </form>
  )
}
