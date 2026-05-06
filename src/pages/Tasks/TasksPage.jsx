import { useState } from 'react'
import TaskCard from '../../components/tasks/TaskCard'
import TaskForm from '../../components/tasks/TaskForm'
import Button from '../../components/common/Button'
import EmptyState from '../../components/common/EmptyState'
import ErrorMessage from '../../components/common/ErrorMessage'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import Modal from '../../components/common/Modal'
import PageWrapper from '../../components/layout/PageWrapper'
import { useTasks } from '../../hooks/useTasks'
import { getActiveTasks, isTaskAvailable, sortTasks } from '../../utils/taskUtils'

export default function TasksPage() {
  const { addTask, completeTask, deleteTask, error, loading, saving, tasks, updateTask } = useTasks()
  const [editingTask, setEditingTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const activeTasks = getActiveTasks(tasks)
  const scheduledTasks = sortTasks(tasks.filter((task) => !task.completed && !isTaskAvailable(task)))
  const completedTasks = sortTasks(tasks.filter((task) => task.completed))

  function closeModal() {
    setIsModalOpen(false)
    setEditingTask(null)
  }

  async function handleSubmit(values) {
    if (editingTask) {
      await updateTask(editingTask.id, values)
    } else {
      await addTask(values)
    }
    closeModal()
  }

  async function handleDelete(id) {
    if (window.confirm('Delete this task?')) {
      await deleteTask(id)
    }
  }

  async function handleToggle(task) {
    if (task.completed) {
      await updateTask(task.id, { completed: false })
      return
    }

    await completeTask(task)
  }

  return (
    <PageWrapper
      actions={<Button onClick={() => setIsModalOpen(true)}>Add task</Button>}
      eyebrow="Execution"
      title="Tasks"
    >
      <ErrorMessage message={error} />
      {loading ? (
        <LoadingSkeleton />
      ) : tasks.length ? (
        <div className="space-y-8">
          <section>
            <h2 className="mb-4 font-display text-2xl font-bold text-ink">Active</h2>
            {activeTasks.length ? (
              <div className="grid gap-5 xl:grid-cols-2">
                {activeTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    onDelete={handleDelete}
                    onEdit={(nextTask) => {
                      setEditingTask(nextTask)
                      setIsModalOpen(true)
                    }}
                    onToggleComplete={handleToggle}
                    task={task}
                  />
                ))}
              </div>
            ) : (
              <EmptyState title="No active tasks">Recurring tasks reopen when their next occurrence date arrives.</EmptyState>
            )}
          </section>

          {scheduledTasks.length ? (
            <section>
              <h2 className="mb-4 font-display text-2xl font-bold text-ink">Scheduled Recurring</h2>
              <div className="grid gap-5 xl:grid-cols-2">
                {scheduledTasks.map((task) => (
                  <TaskCard
                    disabled
                    key={task.id}
                    onDelete={handleDelete}
                    onEdit={(nextTask) => {
                      setEditingTask(nextTask)
                      setIsModalOpen(true)
                    }}
                    onToggleComplete={handleToggle}
                    task={task}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {completedTasks.length ? (
            <section>
              <h2 className="mb-4 font-display text-2xl font-bold text-ink">Completed</h2>
              <div className="grid gap-5 xl:grid-cols-2">
                {completedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    onDelete={handleDelete}
                    onEdit={(nextTask) => {
                      setEditingTask(nextTask)
                      setIsModalOpen(true)
                    }}
                    onToggleComplete={handleToggle}
                    task={task}
                  />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      ) : (
        <EmptyState actionLabel="Add task" onAction={() => setIsModalOpen(true)} title="No tasks yet">
          Add one-off or recurring work. Priority sorting is strategy-based in task utilities.
        </EmptyState>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Task form">
        <Modal.Header onClose={closeModal}>
          <h2 className="font-display text-3xl font-bold text-ink">
            {editingTask ? 'Edit task' : 'Add task'}
          </h2>
        </Modal.Header>
        <Modal.Body>
          <TaskForm
            initialData={editingTask}
            onCancel={closeModal}
            onSubmit={handleSubmit}
            saving={saving}
          />
        </Modal.Body>
      </Modal>
    </PageWrapper>
  )
}
