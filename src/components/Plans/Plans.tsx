import { useEffect, useState } from 'react';
import type { User, Plan } from '../../types';
import { getPlansByUser, createPlan, updatePlan, deletePlan } from '../../services/plans.service';
import { PlanForm } from './PlanForm';

interface PlansProps {
  user: User;
}

export const Plans: React.FC<PlansProps> = ({ user }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const data = await getPlansByUser(user.uid);
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [user.uid]);

  const handleSubmit = async (formData: Omit<Plan, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingPlan?.id) {
        await updatePlan(editingPlan.id, formData);
      } else {
        await createPlan(user.uid, formData);
      }
      setShowForm(false);
      setEditingPlan(null);
      fetchPlans();
    } catch (error) {
      console.error('Error saving plan:', error);
    }
  };

  const handleDelete = async (planId: string) => {
    if (confirm('Are you sure you want to delete this plan?')) {
      try {
        await deletePlan(planId);
        fetchPlans();
      } catch (error) {
        console.error('Error deleting plan:', error);
      }
    }
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setShowForm(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">📅 Plans</h2>
        <button
          onClick={() => {
            setEditingPlan(null);
            setShowForm(!showForm);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showForm ? 'Cancel' : '➕ Add Plan'}
        </button>
      </div>

      {showForm && (
        <PlanForm
          plan={editingPlan}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingPlan(null);
          }}
        />
      )}

      {loading ? (
        <p className="text-center text-gray-600">Loading plans...</p>
      ) : plans.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-600">No plans yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plans.map(plan => (
            <div key={plan.id} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-gray-800">{plan.name}</h3>
              <p className="text-sm text-gray-600 mt-2">
                📅 {new Date(plan.date).toLocaleDateString()} at {plan.time}
              </p>
              <p className="text-gray-700 mt-2">{plan.notes}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(plan)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan.id!)}
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
