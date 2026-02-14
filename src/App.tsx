import { useEffect, useState } from 'react';
import { onAuthChange, signOutUser } from './services/auth.service';
import type { User } from './types';
import { Login } from './components/Auth/Login';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home/Home';
import { Plans } from './components/Plans/Plans';
import { Birthdays } from './components/Birthdays/Birthdays';
import { Anime } from './components/Anime/Anime';
import { Manga } from './components/Manga/Manga';
import { Tasks } from './components/Tasks/Tasks';
import './App.css';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentTab, setCurrentTab] = useState('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOutUser();
    setUser(null);
    setCurrentTab('home');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Home user={user} />;
      case 'plans':
        return <Plans user={user} />;
      case 'birthdays':
        return <Birthdays user={user} />;
      case 'anime':
        return <Anime user={user} />;
      case 'manga':
        return <Manga user={user} />;
      case 'tasks':
        return <Tasks user={user} />;
      default:
        return <Home user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        user={user}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onLogout={handleLogout}
      />
      <main>{renderContent()}</main>
    </div>
  );
}

export default App;
