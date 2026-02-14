// User type
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

// Plans
export interface Plan {
  id?: string;
  userId: string;
  name: string;
  date: string; // ISO format
  time: string; // HH:mm format
  notes: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Birthdays
export interface Birthday {
  id?: string;
  userId: string;
  name: string;
  date: string; // MM-DD format or ISO
  notes: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Weekly Anime
export interface WeeklyAnime {
  id?: string;
  userId: string;
  name: string;
  date: string; // ISO format
  time: string; // HH:mm format
  createdAt?: Date;
  updatedAt?: Date;
}

// Weekly Manga
export interface WeeklyManga {
  id?: string;
  userId: string;
  name: string;
  date: string; // ISO format
  createdAt?: Date;
  updatedAt?: Date;
}

// Tasks
export interface Task {
  id?: string;
  userId: string;
  name: string;
  date: string; // ISO format
  notes: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Home page alert item
export interface Alert {
  type: 'plan' | 'birthday' | 'anime' | 'manga' | 'task';
  title: string;
  description: string;
  dueDate: string;
  priority?: string;
  id: string;
}
