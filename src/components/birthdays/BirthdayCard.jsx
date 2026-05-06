import Badge from '../common/Badge'
import Button from '../common/Button'
import Card from '../common/Card'
import { daysUntilBirthday, formatDate, getNextBirthdayDate } from '../../utils/dateUtils'

export default function BirthdayCard({ birthday, onDelete, onEdit, onSnooze }) {
  const daysUntil = daysUntilBirthday(birthday.birth_date)
  const isBirthdayToday = daysUntil === 0
  const nextBirthday = getNextBirthdayDate(birthday.birth_date)

  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Card.Title>{birthday.name}</Card.Title>
          <p className="mt-1 text-sm text-ink-muted">
            Born {formatDate(birthday.birth_date)}
          </p>
        </div>
        <Badge tone={isBirthdayToday ? 'success' : 'brand'}>
          {isBirthdayToday ? 'Today' : `${daysUntil} days`}
        </Badge>
      </div>

      {birthday.notes ? <p className="text-sm leading-6 text-ink-muted">{birthday.notes}</p> : null}

      <div className="rounded-3xl bg-canvas-muted p-4 text-sm text-ink-muted">
        Next birthday: <span className="font-bold text-ink">{formatDate(nextBirthday)}</span>
        {birthday.snoozed_until ? (
          <span className="block pt-1">Snoozed until {formatDate(birthday.snoozed_until)}</span>
        ) : null}
      </div>

      <Card.Actions>
        <Button onClick={() => onEdit(birthday)} size="sm" variant="secondary">
          Edit
        </Button>
        <Button onClick={() => onSnooze(birthday)} size="sm" variant="ghost">
          Remind me on the day
        </Button>
        <Button onClick={() => onDelete(birthday.id)} size="sm" variant="danger">
          Delete
        </Button>
      </Card.Actions>
    </Card>
  )
}
