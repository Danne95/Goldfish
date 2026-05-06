import Badge from '../common/Badge'
import Button from '../common/Button'
import Card from '../common/Card'
import { ANIME_STATUSES, ANIME_STATUS_OPTIONS, DAY_LABELS } from '../../utils/constants'
import { formatTime } from '../../utils/dateUtils'

const statusLabels = ANIME_STATUS_OPTIONS.reduce((accumulator, status) => {
  accumulator[status.value] = status.label
  return accumulator
}, {})

export default function AnimeCard({ anime, onDelete, onEdit }) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Card.Title>{anime.name}</Card.Title>
          <p className="mt-1 text-sm text-ink-muted">
            {DAY_LABELS[anime.release_day]} at {formatTime(anime.release_time)}
          </p>
        </div>
        <Badge tone={anime.status === ANIME_STATUSES.WATCHING ? 'success' : 'default'}>
          {statusLabels[anime.status] || anime.status}
        </Badge>
      </div>

      <Card.Actions>
        <Button onClick={() => onEdit(anime)} size="sm" variant="secondary">
          Edit
        </Button>
        <Button onClick={() => onDelete(anime.id)} size="sm" variant="danger">
          Delete
        </Button>
      </Card.Actions>
    </Card>
  )
}
