import { useEffect, useState } from 'react';
import type { User, Alert } from '../../types';
import { getPlansByUser } from '../../services/plans.service';
import { getBirthdaysByUser } from '../../services/birthdays.service';
import { getAnimeByUser } from '../../services/anime.service';
import { getMangaByUser } from '../../services/manga.service';
import { getTasksByUser } from '../../services/tasks.service';

interface HomeProps {
  user: User;
}

export const Home: React.FC<HomeProps> = ({ user }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const [plans, birthdays, anime, manga, tasks] = await Promise.all([
          getPlansByUser(user.uid),
          getBirthdaysByUser(user.uid),
          getAnimeByUser(user.uid),
          getMangaByUser(user.uid),
          getTasksByUser(user.uid),
        ]);

        const now = new Date();
        const allAlerts: Alert[] = [];

        // Add plans
        plans.forEach(plan => {
          const planDate = new Date(plan.date);
          if (planDate > now) {
            allAlerts.push({
              type: 'plan',
              title: plan.name,
              description: plan.notes,
              dueDate: `${plan.date} ${plan.time}`,
              id: plan.id || '',
            });
          }
        });

        // Add birthdays (upcoming this year or next)
        birthdays.forEach(birthday => {
          const [, month, day] = birthday.date.split('-');
          const birthdayThisYear = new Date(now.getFullYear(), parseInt(month) - 1, parseInt(day));
          if (birthdayThisYear < now) {
            birthdayThisYear.setFullYear(now.getFullYear() + 1);
          }
          allAlerts.push({
            type: 'birthday',
            title: `${birthday.name}'s Birthday`,
            description: birthday.notes,
            dueDate: birthdayThisYear.toDateString(),
            id: birthday.id || '',
          });
        });

        // Add anime
        anime.forEach(item => {
          const itemDate = new Date(item.date);
          if (itemDate > now) {
            allAlerts.push({
              type: 'anime',
              title: item.name,
              description: `Anime episode at ${item.time}`,
              dueDate: `${item.date} ${item.time}`,
              id: item.id || '',
            });
          }
        });

        // Add manga
        manga.forEach(item => {
          const itemDate = new Date(item.date);
          if (itemDate > now) {
            allAlerts.push({
              type: 'manga',
              title: item.name,
              description: 'Manga release',
              dueDate: item.date,
              id: item.id || '',
            });
          }
        });

        // Add high priority tasks not completed
        tasks.forEach(task => {
          if (!task.completed && task.priority === 'high') {
            allAlerts.push({
              type: 'task',
              title: task.name,
              description: task.notes,
              dueDate: task.date,
              priority: task.priority,
              id: task.id || '',
            });
          }
        });

        // Sort by date
        allAlerts.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

        setAlerts(allAlerts.slice(0, 10)); // Show top 10 alerts
      } catch (error) {
        console.error('Error fetching alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [user.uid]);

  const typeColors: Record<Alert['type'], string> = {
    plan: 'bg-blue-100 text-blue-800 border-blue-300',
    birthday: 'bg-pink-100 text-pink-800 border-pink-300',
    anime: 'bg-purple-100 text-purple-800 border-purple-300',
    manga: 'bg-orange-100 text-orange-800 border-orange-300',
    task: 'bg-red-100 text-red-800 border-red-300',
  };

  const typeIcons: Record<Alert['type'], string> = {
    plan: '📅',
    birthday: '🎂',
    anime: '🎬',
    manga: '📚',
    task: '✓',
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Welcome, {user.displayName}!</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading your alerts...</p>
      ) : alerts.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg">
            No upcoming items. You're all set! 🎉
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {alerts.map(alert => (
            <div
              key={`${alert.type}-${alert.id}`}
              className={`border-l-4 rounded-lg p-4 ${typeColors[alert.type]}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{typeIcons[alert.type]}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{alert.title}</h3>
                  {alert.description && (
                    <p className="text-sm opacity-90">{alert.description}</p>
                  )}
                  <p className="text-xs font-semibold mt-1">
                    📍 {new Date(alert.dueDate).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
