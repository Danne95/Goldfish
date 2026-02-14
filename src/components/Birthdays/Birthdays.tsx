import { useEffect, useState } from 'react';
import type { User, Birthday } from '../../types';
import { getBirthdaysByUser, createBirthday, updateBirthday, deleteBirthday } from '../../services/birthdays.service';
import { BirthdayForm } from './BirthdayForm';

interface BirthdaysProps {
  user: User;
}

export const Birthdays: React.FC<BirthdaysProps> = ({ user }) => {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBirthday, setEditingBirthday] = useState<Birthday | null>(null);

  const fetchBirthdays = async () => {
    try {
      setLoading(true);
      const data = await getBirthdaysByUser(user.uid);
      setBirthdays(data);
    } catch (error) {
      console.error('Error fetching birthdays:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBirthdays();
  }, [user.uid]);

  const handleSubmit = async (formData: Omit<Birthday, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingBirthday?.id) {
        await updateBirthday(editingBirthday.id, formData);
      } else {
        await createBirthday(user.uid, formData);
      }
      setShowForm(false);
      setEditingBirthday(null);
      fetchBirthdays();
    } catch (error) {
      console.error('Error saving birthday:', error);
    }
  };

  const handleDelete = async (birthdayId: string) => {
    if (confirm('Are you sure you want to delete this birthday?')) {
      try {
        await deleteBirthday(birthdayId);
        fetchBirthdays();
      } catch (error) {
        console.error('Error deleting birthday:', error);
      }
    }
  };

  const handleEdit = (birthday: Birthday) => {
    setEditingBirthday(birthday);
    setShowForm(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">🎂 Birthdays</h2>
        <button
          onClick={() => {
            setEditingBirthday(null);
            setShowForm(!showForm);
          }}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        >
          {showForm ? 'Cancel' : '➕ Add Birthday'}
        </button>
      </div>

      {showForm && (
        <BirthdayForm
          birthday={editingBirthday}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingBirthday(null);
          }}
        />
      )}

      {loading ? (
        <p className="text-center text-gray-600">Loading birthdays...</p>
      ) : birthdays.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-600">No birthdays added yet!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {birthdays.map(birthday => (
            <div key={birthday.id} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-pink-500">
              <h3 className="text-lg font-bold text-gray-800">{birthday.name}</h3>
              <p className="text-sm text-gray-600 mt-2">📅 {birthday.date}</p>
              <p className="text-gray-700 mt-2">{birthday.notes}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(birthday)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(birthday.id!)}
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
