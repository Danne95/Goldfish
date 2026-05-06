import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import { RECURRENCE_OPTIONS } from '../../utils/constants'

const emptyValues = {
  date: '',
  is_recurring: false,
  location: '',
  notes: '',
  recurrence_type: '',
  time: '',
  title: '',
}

function valuesFromMeeting(meeting) {
  if (!meeting) return emptyValues

  return {
    date: meeting.date || '',
    is_recurring: Boolean(meeting.is_recurring),
    location: meeting.location || '',
    notes: meeting.notes || '',
    recurrence_type: meeting.recurrence_type || '',
    time: meeting.time || '',
    title: meeting.title || '',
  }
}

export default function MeetingForm({ initialData, onCancel, onSubmit, saving }) {
  const [values, setValues] = useState(valuesFromMeeting(initialData))

  function updateField(event) {
    const { checked, name, type, value } = event.target
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await onSubmit(values)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        label="Title"
        name="title"
        onChange={updateField}
        placeholder="Dentist appointment"
        required
        value={values.title}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Date" name="date" onChange={updateField} required type="date" value={values.date} />
        <Input label="Time" name="time" onChange={updateField} required type="time" value={values.time} />
      </div>
      <Input
        label="Location"
        name="location"
        onChange={updateField}
        placeholder="Clinic, office, or video link"
        value={values.location}
      />
      <label className="flex items-center gap-3 rounded-2xl border border-line bg-canvas-muted/50 p-4 text-sm font-bold text-ink-muted">
        <input
          checked={values.is_recurring}
          className="h-5 w-5 rounded border-line accent-brand"
          name="is_recurring"
          onChange={updateField}
          type="checkbox"
        />
        Recurring meeting
      </label>
      {values.is_recurring ? (
        <Input
          as="select"
          label="Recurrence type"
          name="recurrence_type"
          onChange={updateField}
          value={values.recurrence_type}
        >
          <option value="">Choose recurrence</option>
          {RECURRENCE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Input>
      ) : null}
      <Input
        as="textarea"
        label="Notes"
        name="notes"
        onChange={updateField}
        placeholder="Agenda, preparation, or follow-up notes"
        value={values.notes}
      />
      <div className="flex justify-end gap-3">
        <Button onClick={onCancel} variant="ghost">
          Cancel
        </Button>
        <Button disabled={saving} type="submit">
          {initialData ? 'Save meeting' : 'Add meeting'}
        </Button>
      </div>
    </form>
  )
}
