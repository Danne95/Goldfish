import type { User } from '../types';
import { signOutUser } from '../services/auth.service';

interface NavbarProps {
  user: User;
  currentTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, currentTab, onTabChange, onLogout }) => {
  const handleLogout = async () => {
    await signOutUser();
    onLogout();
  };

  const tabs = ['home', 'plans', 'birthdays', 'anime', 'manga', 'tasks'];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">📋 Task & Events Manager</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-sm">{user.displayName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-4 py-2 rounded font-semibold capitalize whitespace-nowrap transition ${
                currentTab === tab
                  ? 'bg-white text-blue-600'
                  : 'bg-blue-500 hover:bg-blue-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
