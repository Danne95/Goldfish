import { useState } from 'react';
import { signInWithGoogle } from '../../services/auth.service';
import type { User } from '../../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithGoogle();
      onLogin(user);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Task & Events Manager
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Manage your plans, birthdays, anime, manga, and tasks all in one place
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : '🔑 Sign in with Google'}
        </button>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4">Features:</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>✓ Track plans and appointments</li>
            <li>✓ Remember birthdays</li>
            <li>✓ Keep up with anime releases</li>
            <li>✓ Track manga chapters</li>
            <li>✓ Manage your tasks with priorities</li>
            <li>✓ Sync across all devices</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
