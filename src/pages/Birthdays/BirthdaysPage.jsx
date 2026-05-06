import { useState } from 'react'
import BirthdayCard from '../../components/birthdays/BirthdayCard'
import BirthdayForm from '../../components/birthdays/BirthdayForm'
import Button from '../../components/common/Button'
import EmptyState from '../../components/common/EmptyState'
import ErrorMessage from '../../components/common/ErrorMessage'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import Modal from '../../components/common/Modal'
import PageWrapper from '../../components/layout/PageWrapper'
import { useBirthdays } from '../../hooks/useBirthdays'

export default function BirthdaysPage() {
  const {
    addBirthday,
    birthdays,
    deleteBirthday,
    error,
    loading,
    saving,
    snoozeBirthday,
    updateBirthday,
  } = useBirthdays()
  const [editingBirthday, setEditingBirthday] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  function closeModal() {
    setIsModalOpen(false)
    setEditingBirthday(null)
  }

  async function handleSubmit(values) {
    if (editingBirthday) {
      await updateBirthday(editingBirthday.id, values)
    } else {
      await addBirthday(values)
    }
    closeModal()
  }

  async function handleDelete(id) {
    if (window.confirm('Delete this birthday?')) {
      await deleteBirthday(id)
    }
  }

  return (
    <PageWrapper
      actions={<Button onClick={() => setIsModalOpen(true)}>Add birthday</Button>}
      eyebrow="People"
      title="Birthdays"
    >
      <ErrorMessage message={error} />
      {loading ? (
        <LoadingSkeleton />
      ) : birthdays.length ? (
        <div className="grid gap-5 xl:grid-cols-2">
          {birthdays.map((birthday) => (
            <BirthdayCard
              birthday={birthday}
              key={birthday.id}
              onDelete={handleDelete}
              onEdit={(nextBirthday) => {
                setEditingBirthday(nextBirthday)
                setIsModalOpen(true)
              }}
              onSnooze={snoozeBirthday}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          actionLabel="Add birthday"
          onAction={() => setIsModalOpen(true)}
          title="No birthdays yet"
        >
          Add people you want to remember and configure alert windows per person.
        </EmptyState>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Birthday form">
        <Modal.Header onClose={closeModal}>
          <h2 className="font-display text-3xl font-bold text-ink">
            {editingBirthday ? 'Edit birthday' : 'Add birthday'}
          </h2>
        </Modal.Header>
        <Modal.Body>
          <BirthdayForm
            initialData={editingBirthday}
            onCancel={closeModal}
            onSubmit={handleSubmit}
            saving={saving}
          />
        </Modal.Body>
      </Modal>
    </PageWrapper>
  )
}
