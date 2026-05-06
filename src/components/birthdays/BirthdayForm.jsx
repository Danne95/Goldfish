import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import { DEFAULT_ALERT_DAYS } from '../../utils/constants'

const emptyValues = {
  alert_days_before: DEFAULT_ALERT_DAYS,
  birth_date: '',
  name: '',
  notes: '',
}

function valuesFromBirthday(birthday) {
  if (!birthday) return emptyValues

  return {
    alert_days_before: birthday.alert_days_before ?? '',
    birth_date: birthday.birth_date || '',
    name: birthday.name || '',
    notes: birthday.notes || '',
  }
}

export default function BirthdayForm({ initialData, onCancel, onSubmit, saving }) {
  const [values, setValues] = useState(valuesFromBirthday(initialData))

  function updateField(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await onSubmit(values)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        label="Name"
        name="name"
        onChange={updateField}
        placeholder="Maya Cohen"
        required
        value={values.name}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Birth date"
          name="birth_date"
          onChange={updateField}
          required
          type="date"
          value={values.birth_date}
        />
        <Input
          label="Alert days before"
          min="0"
          name="alert_days_before"
          onChange={updateField}
          placeholder="7"
          type="number"
          value={values.alert_days_before}
        />
      </div>
      <Input
        as="textarea"
        label="Notes"
        name="notes"
        onChange={updateField}
        placeholder="Gift ideas, plans, or reminders"
        value={values.notes}
      />
      <div className="flex justify-end gap-3">
        <Button onClick={onCancel} variant="ghost">
          Cancel
        </Button>
        <Button disabled={saving} type="submit">
          {initialData ? 'Save birthday' : 'Add birthday'}
        </Button>
      </div>
    </form>
  )
}
