import { useEffect, useState } from 'react';
import type { User, WeeklyManga } from '../../types';
import { getMangaByUser, createManga, updateManga, deleteManga } from '../../services/manga.service';
import { MangaForm } from './MangaForm';

interface MangaProps {
  user: User;
}

export const Manga: React.FC<MangaProps> = ({ user }) => {
  const [manga, setManga] = useState<WeeklyManga[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingManga, setEditingManga] = useState<WeeklyManga | null>(null);

  const fetchManga = async () => {
    try {
      setLoading(true);
      const data = await getMangaByUser(user.uid);
      setManga(data);
    } catch (error) {
      console.error('Error fetching manga:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManga();
  }, [user.uid]);

  const handleSubmit = async (formData: Omit<WeeklyManga, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingManga?.id) {
        await updateManga(editingManga.id, formData);
      } else {
        await createManga(user.uid, formData);
      }
      setShowForm(false);
      setEditingManga(null);
      fetchManga();
    } catch (error) {
      console.error('Error saving manga:', error);
    }
  };

  const handleDelete = async (mangaId: string) => {
    if (confirm('Are you sure you want to delete this manga?')) {
      try {
        await deleteManga(mangaId);
        fetchManga();
      } catch (error) {
        console.error('Error deleting manga:', error);
      }
    }
  };

  const handleEdit = (item: WeeklyManga) => {
    setEditingManga(item);
    setShowForm(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">📚 Weekly Manga</h2>
        <button
          onClick={() => {
            setEditingManga(null);
            setShowForm(!showForm);
          }}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          {showForm ? 'Cancel' : '➕ Add Manga'}
        </button>
      </div>

      {showForm && (
        <MangaForm
          manga={editingManga}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingManga(null);
          }}
        />
      )}

      {loading ? (
        <p className="text-center text-gray-600">Loading manga...</p>
      ) : manga.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-600">No manga tracked yet!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {manga.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-2">
                📅 {new Date(item.date).toLocaleDateString()}
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id!)}
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
