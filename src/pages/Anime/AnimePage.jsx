import { useState } from 'react'
import AnimeCard from '../../components/anime/AnimeCard'
import AnimeForm from '../../components/anime/AnimeForm'
import Button from '../../components/common/Button'
import EmptyState from '../../components/common/EmptyState'
import ErrorMessage from '../../components/common/ErrorMessage'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import Modal from '../../components/common/Modal'
import PageWrapper from '../../components/layout/PageWrapper'
import { useAnime } from '../../hooks/useAnime'
import { DAYS_OF_WEEK } from '../../utils/constants'

export default function AnimePage() {
  const { addAnime, anime, deleteAnime, error, loading, saving, updateAnime } = useAnime()
  const [editingAnime, setEditingAnime] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  function closeModal() {
    setIsModalOpen(false)
    setEditingAnime(null)
  }

  async function handleSubmit(values) {
    if (editingAnime) {
      await updateAnime(editingAnime.id, values)
    } else {
      await addAnime(values)
    }
    closeModal()
  }

  async function handleDelete(id) {
    if (window.confirm('Delete this anime?')) {
      await deleteAnime(id)
    }
  }

  return (
    <PageWrapper
      actions={<Button onClick={() => setIsModalOpen(true)}>Add anime</Button>}
      eyebrow="Watchlist"
      title="Anime"
    >
      <ErrorMessage message={error} />
      {loading ? (
        <LoadingSkeleton />
      ) : anime.length ? (
        <div className="space-y-8">
          {DAYS_OF_WEEK.map((day) => {
            const dayAnime = anime.filter((item) => item.release_day === day.value)
            if (!dayAnime.length) return null

            return (
              <section key={day.value}>
                <h2 className="mb-4 font-display text-2xl font-bold text-ink">{day.label}</h2>
                <div className="grid gap-5 xl:grid-cols-2">
                  {dayAnime.map((item) => (
                    <AnimeCard
                      anime={item}
                      key={item.id}
                      onDelete={handleDelete}
                      onEdit={(nextAnime) => {
                        setEditingAnime(nextAnime)
                        setIsModalOpen(true)
                      }}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <EmptyState actionLabel="Add anime" onAction={() => setIsModalOpen(true)} title="No anime yet">
          Add shows by release day and status. Watching shows power the dashboard widget.
        </EmptyState>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Anime form">
        <Modal.Header onClose={closeModal}>
          <h2 className="font-display text-3xl font-bold text-ink">
            {editingAnime ? 'Edit anime' : 'Add anime'}
          </h2>
        </Modal.Header>
        <Modal.Body>
          <AnimeForm
            initialData={editingAnime}
            onCancel={closeModal}
            onSubmit={handleSubmit}
            saving={saving}
          />
        </Modal.Body>
      </Modal>
    </PageWrapper>
  )
}
