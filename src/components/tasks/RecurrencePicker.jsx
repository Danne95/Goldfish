import Input from '../common/Input'
import { RECURRENCE_OPTIONS } from '../../utils/constants'

export default function RecurrencePicker({ onChange, values }) {
  const hasRecurrence = Boolean(values.recurrence_type)

  function updateRecurrenceType(event) {
    const recurrenceType = event.target.value
    onChange({
      recurrence_interval: recurrenceType ? values.recurrence_interval || 1 : '',
      recurrence_type: recurrenceType,
      next_occurrence: recurrenceType ? values.next_occurrence : '',
    })
  }

  return (
    <div className="space-y-4 rounded-3xl border border-line bg-canvas-muted/50 p-4">
      <Input
        as="select"
        label="Recurrence"
        name="recurrence_type"
        onChange={updateRecurrenceType}
        value={values.recurrence_type}
      >
        <option value="">No recurrence</option>
        {RECURRENCE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Input>

      {hasRecurrence ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Repeat every"
            min="1"
            name="recurrence_interval"
            onChange={(event) => onChange({ recurrence_interval: event.target.value })}
            type="number"
            value={values.recurrence_interval}
          />
          <Input
            label="Next occurrence"
            name="next_occurrence"
            onChange={(event) => onChange({ next_occurrence: event.target.value })}
            type="date"
            value={values.next_occurrence}
          />
        </div>
      ) : null}
    </div>
  )
}
