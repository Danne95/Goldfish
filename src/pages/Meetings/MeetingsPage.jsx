import { useState } from 'react'
import MeetingCard from '../../components/meetings/MeetingCard'
import MeetingForm from '../../components/meetings/MeetingForm'
import Button from '../../components/common/Button'
import EmptyState from '../../components/common/EmptyState'
import ErrorMessage from '../../components/common/ErrorMessage'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import Modal from '../../components/common/Modal'
import PageWrapper from '../../components/layout/PageWrapper'
import { useMeetings } from '../../hooks/useMeetings'

export default function MeetingsPage() {
  const { addMeeting, deleteMeeting, error, loading, meetings, saving, updateMeeting } = useMeetings()
  const [editingMeeting, setEditingMeeting] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  function closeModal() {
    setIsModalOpen(false)
    setEditingMeeting(null)
  }

  async function handleSubmit(values) {
    if (editingMeeting) {
      await updateMeeting(editingMeeting.id, values)
    } else {
      await addMeeting(values)
    }
    closeModal()
  }

  async function handleDelete(id) {
    if (window.confirm('Delete this meeting?')) {
      await deleteMeeting(id)
    }
  }

  return (
    <PageWrapper
      actions={<Button onClick={() => setIsModalOpen(true)}>Add meeting</Button>}
      eyebrow="Calendar"
      title="Meetings"
    >
      <ErrorMessage message={error} />
      {loading ? (
        <LoadingSkeleton />
      ) : meetings.length ? (
        <div className="grid gap-5 xl:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              onDelete={handleDelete}
              onEdit={(nextMeeting) => {
                setEditingMeeting(nextMeeting)
                setIsModalOpen(true)
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          actionLabel="Add meeting"
          onAction={() => setIsModalOpen(true)}
          title="No meetings yet"
        >
          Add meetings and the dashboard will show today's meetings plus the next two upcoming.
        </EmptyState>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Meeting form">
        <Modal.Header onClose={closeModal}>
          <h2 className="font-display text-3xl font-bold text-ink">
            {editingMeeting ? 'Edit meeting' : 'Add meeting'}
          </h2>
        </Modal.Header>
        <Modal.Body>
          <MeetingForm
            initialData={editingMeeting}
            onCancel={closeModal}
            onSubmit={handleSubmit}
            saving={saving}
          />
        </Modal.Body>
      </Modal>
    </PageWrapper>
  )
}
