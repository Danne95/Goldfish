import { useState, useEffect } from 'react';
import type { WeeklyManga } from '../../types';

interface MangaFormProps {
  manga?: WeeklyManga | null;
  onSubmit: (formData: Omit<WeeklyManga, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const MangaForm: React.FC<MangaFormProps> = ({ manga, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
  });

  useEffect(() => {
    if (manga) {
      setFormData({
        name: manga.name,
        date: manga.date,
      });
    }
  }, [manga]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">{manga ? 'Edit Manga' : 'New Manga'}</h3>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Manga Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter manga name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Release Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          {manga ? 'Update Manga' : 'Add Manga'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
