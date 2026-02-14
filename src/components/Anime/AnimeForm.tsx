import { useState, useEffect } from 'react';
import type { WeeklyAnime } from '../../types';

interface AnimeFormProps {
  anime?: WeeklyAnime | null;
  onSubmit: (formData: Omit<WeeklyAnime, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const AnimeForm: React.FC<AnimeFormProps> = ({ anime, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    if (anime) {
      setFormData({
        name: anime.name,
        date: anime.date,
        time: anime.time,
      });
    }
  }, [anime]);

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
      <h3 className="text-xl font-bold mb-4">{anime ? 'Edit Anime' : 'New Anime'}</h3>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Anime Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter anime name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          {anime ? 'Update Anime' : 'Add Anime'}
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
