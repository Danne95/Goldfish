import { useState, useEffect } from 'react';
import type { Birthday } from '../../types';

interface BirthdayFormProps {
  birthday?: Birthday | null;
  onSubmit: (formData: Omit<Birthday, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const BirthdayForm: React.FC<BirthdayFormProps> = ({ birthday, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    notes: '',
  });

  useEffect(() => {
    if (birthday) {
      setFormData({
        name: birthday.name,
        date: birthday.date,
        notes: birthday.notes,
      });
    }
  }, [birthday]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">{birthday ? 'Edit Birthday' : 'New Birthday'}</h3>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter person's name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Date (MM-DD format)</label>
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
          placeholder="MM-DD (e.g., 01-15)"
          pattern="\d{2}-\d{2}"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any notes or special info"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 h-24 resize-none"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        >
          {birthday ? 'Update Birthday' : 'Add Birthday'}
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
