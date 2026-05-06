import Badge from '../../components/common/Badge'
import Card from '../../components/common/Card'
import EmptyState from '../../components/common/EmptyState'
import ErrorMessage from '../../components/common/ErrorMessage'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import PageWrapper from '../../components/layout/PageWrapper'
import { useHomeData } from '../../hooks/useHomeData'
import { formatDate, formatDateTime, formatTime } from '../../utils/dateUtils'

export default function HomePage() {
  const { completeTask, data, error, loading } = useHomeData()

  return (
    <PageWrapper eyebrow="Dashboard" title="Today at a glance">
      <ErrorMessage message={error} />

      {loading ? (
        <LoadingSkeleton count={4} />
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Card.Title>Birthday Alerts</Card.Title>
              <Badge tone="brand">{data.birthdayAlerts.length}</Badge>
            </div>
            {data.birthdayAlerts.length ? (
              <div className="space-y-3">
                {data.birthdayAlerts.map((birthday) => (
                  <div
                    className="rounded-3xl border border-line bg-canvas-muted p-4"
                    key={birthday.id}
                  >
                    <p className="font-bold text-ink">{birthday.name}</p>
                    <p className="text-sm text-ink-muted">
                      Birthday on {formatDate(birthday.birth_date)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="No birthday alerts">No birthdays are inside their alert window.</EmptyState>
            )}
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Card.Title>Today's Anime</Card.Title>
              <Badge tone="success">{data.todayAnime.length}</Badge>
            </div>
            {data.todayAnime.length ? (
              <div className="space-y-3">
                {data.todayAnime.map((anime) => (
                  <div className="flex items-center justify-between rounded-3xl border border-line bg-canvas-muted p-4" key={anime.id}>
                    <p className="font-bold text-ink">{anime.name}</p>
                    <p className="text-sm font-bold text-brand">{formatTime(anime.release_time)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="No anime today">Watching shows with today's release day will appear here.</EmptyState>
            )}
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Card.Title>Meetings</Card.Title>
              <Badge tone="default">{data.meetings.length}</Badge>
            </div>
            {data.meetings.length ? (
              <div className="space-y-3">
                {data.meetings.map((meeting) => (
                  <div className="rounded-3xl border border-line bg-canvas-muted p-4" key={meeting.id}>
                    <p className="font-bold text-ink">{meeting.title}</p>
                    <p className="text-sm text-ink-muted">{formatDateTime(meeting.date, meeting.time)}</p>
                    {meeting.location ? <p className="text-sm text-ink-muted">{meeting.location}</p> : null}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="No meetings queued">Today's meetings and the next two upcoming meetings appear here.</EmptyState>
            )}
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Card.Title>Active Tasks</Card.Title>
              <Badge tone="danger">{data.tasks.length}</Badge>
            </div>
            {data.tasks.length ? (
              <div className="max-h-[28rem] space-y-3 overflow-y-auto pr-1">
                {data.tasks.map((task) => (
                  <label
                    className="flex items-start gap-3 rounded-3xl border border-line bg-canvas-muted p-4"
                    key={task.id}
                  >
                    <input
                      className="mt-1 h-5 w-5 rounded border-line accent-brand"
                      onChange={() => completeTask(task)}
                      type="checkbox"
                    />
                    <span className="min-w-0">
                      <span className="block font-bold text-ink">{task.name}</span>
                      <span className="mt-1 flex flex-wrap gap-2 text-sm text-ink-muted">
                        <span>{task.priority}</span>
                        {task.deadline ? <span>Deadline {formatDate(task.deadline)}</span> : null}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <EmptyState title="No active tasks">Incomplete tasks available today will appear here.</EmptyState>
            )}
          </Card>
        </div>
      )}
    </PageWrapper>
  )
}
