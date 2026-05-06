import Badge from '../common/Badge'
import Button from '../common/Button'
import Card from '../common/Card'
import { formatDateTime } from '../../utils/dateUtils'

export default function MeetingCard({ meeting, onDelete, onEdit }) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Card.Title>{meeting.title}</Card.Title>
          <p className="mt-1 text-sm text-ink-muted">{formatDateTime(meeting.date, meeting.time)}</p>
          {meeting.location ? <p className="mt-1 text-sm text-ink-muted">{meeting.location}</p> : null}
        </div>
        {meeting.is_recurring ? <Badge tone="brand">{meeting.recurrence_type}</Badge> : null}
      </div>

      {meeting.notes ? <p className="text-sm leading-6 text-ink-muted">{meeting.notes}</p> : null}

      <Card.Actions>
        <Button onClick={() => onEdit(meeting)} size="sm" variant="secondary">
          Edit
        </Button>
        <Button onClick={() => onDelete(meeting.id)} size="sm" variant="danger">
          Delete
        </Button>
      </Card.Actions>
    </Card>
  )
}
