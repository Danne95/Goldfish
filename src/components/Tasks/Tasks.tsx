import { useEffect, useState } from 'react';
import type { User, Task } from '../../types';
import { getTasksByUser, createTask, updateTask, deleteTask } from '../../services/tasks.service';
import { TaskForm } from './TaskForm';

interface TasksProps {
  user: User;
}

export const Tasks: React.FC<TasksProps> = ({ user }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasksByUser(user.uid);
      setTasks(data.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user.uid]);

  const handleSubmit = async (formData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingTask?.id) {
        await updateTask(editingTask.id, formData);
      } else {
        await createTask(user.uid, formData);
      }
      setShowForm(false);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDelete = async (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleToggle = async (task: Task) => {
    await updateTask(task.id!, { ...task, completed: !task.completed });
    fetchTasks();
  };

  const priorityColors: Record<Task['priority'], string> = {
    high: 'bg-red-100 border-red-500 text-red-800',
    medium: 'bg-yellow-100 border-yellow-500 text-yellow-800',
    low: 'bg-green-100 border-green-500 text-green-800',
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">✓ Tasks</h2>
        <button
          onClick={() => {
            setEditingTask(null);
            setShowForm(!showForm);
          }}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          {showForm ? 'Cancel' : '➕ Add Task'}
        </button>
      </div>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}

      {loading ? (
        <p className="text-center text-gray-600">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-600">No tasks yet. Great work! 🎉</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`rounded-lg shadow-md p-4 border-l-4 flex items-start gap-4 ${priorityColors[task.priority]}`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task)}
                className="mt-1 w-5 h-5 cursor-pointer"
              />
              <div className="flex-1">
                <h3
                  className={`text-lg font-bold ${
                    task.completed ? 'line-through opacity-60' : ''
                  }`}
                >
                  {task.name}
                </h3>
                {task.notes && <p className="text-sm mt-1">{task.notes}</p>}
                <p className="text-xs font-semibold mt-1">
                  📅 {new Date(task.date).toLocaleDateString()} • Priority: {task.priority.toUpperCase()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id!)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
