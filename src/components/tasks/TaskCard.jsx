import Badge from '../common/Badge'
import Button from '../common/Button'
import Card from '../common/Card'
import { formatDate } from '../../utils/dateUtils'

export default function TaskCard({ disabled, onDelete, onEdit, onToggleComplete, task }) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start gap-4">
        <input
          checked={task.completed}
          className="mt-2 h-5 w-5 rounded border-line accent-brand"
          disabled={disabled}
          onChange={() => onToggleComplete(task)}
          type="checkbox"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Card.Title className={task.completed ? 'text-ink-soft line-through' : ''}>
              {task.name}
            </Card.Title>
            <Badge tone={task.priority}>{task.priority}</Badge>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-ink-muted">
            {task.deadline ? <span>Deadline {formatDate(task.deadline)}</span> : <span>No deadline</span>}
            {task.recurrence_type ? (
              <span>
                Repeats every {task.recurrence_interval || 1} {task.recurrence_type}
              </span>
            ) : null}
            {task.next_occurrence ? <span>Active again {formatDate(task.next_occurrence)}</span> : null}
          </div>
        </div>
      </div>

      {task.notes ? <p className="text-sm leading-6 text-ink-muted">{task.notes}</p> : null}

      <Card.Actions>
        <Button onClick={() => onEdit(task)} size="sm" variant="secondary">
          Edit
        </Button>
        <Button onClick={() => onDelete(task.id)} size="sm" variant="danger">
          Delete
        </Button>
      </Card.Actions>
    </Card>
  )
}
