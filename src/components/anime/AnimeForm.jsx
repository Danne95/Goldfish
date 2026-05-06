import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import { ANIME_STATUSES, ANIME_STATUS_OPTIONS, DAYS_OF_WEEK } from '../../utils/constants'

const emptyValues = {
  name: '',
  release_day: DAYS_OF_WEEK[0].value,
  release_time: '',
  status: ANIME_STATUSES.WATCHING,
}

function valuesFromAnime(anime) {
  if (!anime) return emptyValues

  return {
    name: anime.name || '',
    release_day: anime.release_day || DAYS_OF_WEEK[0].value,
    release_time: anime.release_time || '',
    status: anime.status || ANIME_STATUSES.WATCHING,
  }
}

export default function AnimeForm({ initialData, onCancel, onSubmit, saving }) {
  const [values, setValues] = useState(valuesFromAnime(initialData))

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
        label="Anime name"
        name="name"
        onChange={updateField}
        placeholder="Frieren"
        required
        value={values.name}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Input as="select" label="Release day" name="release_day" onChange={updateField} value={values.release_day}>
          {DAYS_OF_WEEK.map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </Input>
        <Input
          label="Release time"
          name="release_time"
          onChange={updateField}
          required
          type="time"
          value={values.release_time}
        />
        <Input as="select" label="Status" name="status" onChange={updateField} value={values.status}>
          {ANIME_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Input>
      </div>
      <div className="flex justify-end gap-3">
        <Button onClick={onCancel} variant="ghost">
          Cancel
        </Button>
        <Button disabled={saving} type="submit">
          {initialData ? 'Save anime' : 'Add anime'}
        </Button>
      </div>
    </form>
  )
}
