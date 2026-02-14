import { useEffect, useState } from 'react';
import type { User, WeeklyAnime } from '../../types';
import { getAnimeByUser, createAnime, updateAnime, deleteAnime } from '../../services/anime.service';
import { AnimeForm } from './AnimeForm';

interface AnimeProps {
  user: User;
}

export const Anime: React.FC<AnimeProps> = ({ user }) => {
  const [anime, setAnime] = useState<WeeklyAnime[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAnime, setEditingAnime] = useState<WeeklyAnime | null>(null);

  const fetchAnime = async () => {
    try {
      setLoading(true);
      const data = await getAnimeByUser(user.uid);
      setAnime(data);
    } catch (error) {
      console.error('Error fetching anime:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, [user.uid]);

  const handleSubmit = async (formData: Omit<WeeklyAnime, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingAnime?.id) {
        await updateAnime(editingAnime.id, formData);
      } else {
        await createAnime(user.uid, formData);
      }
      setShowForm(false);
      setEditingAnime(null);
      fetchAnime();
    } catch (error) {
      console.error('Error saving anime:', error);
    }
  };

  const handleDelete = async (animeId: string) => {
    if (confirm('Are you sure you want to delete this anime?')) {
      try {
        await deleteAnime(animeId);
        fetchAnime();
      } catch (error) {
        console.error('Error deleting anime:', error);
      }
    }
  };

  const handleEdit = (item: WeeklyAnime) => {
    setEditingAnime(item);
    setShowForm(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">🎬 Weekly Anime</h2>
        <button
          onClick={() => {
            setEditingAnime(null);
            setShowForm(!showForm);
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          {showForm ? 'Cancel' : '➕ Add Anime'}
        </button>
      </div>

      {showForm && (
        <AnimeForm
          anime={editingAnime}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingAnime(null);
          }}
        />
      )}

      {loading ? (
        <p className="text-center text-gray-600">Loading anime...</p>
      ) : anime.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-600">No anime tracked yet!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {anime.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-2">
                📅 {new Date(item.date).toLocaleDateString()} at {item.time}
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
