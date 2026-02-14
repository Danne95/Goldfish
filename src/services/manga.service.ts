import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase.config';
import type { WeeklyManga } from '../types';

const COLLECTION_NAME = 'manga';

export const createManga = async (userId: string, mangaData: Omit<WeeklyManga, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...mangaData,
      userId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating manga:', error);
    throw error;
  }
};

export const getMangaByUser = async (userId: string): Promise<WeeklyManga[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as WeeklyManga));
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

export const updateManga = async (mangaId: string, mangaData: Partial<WeeklyManga>): Promise<void> => {
  try {
    const mangaRef = doc(db, COLLECTION_NAME, mangaId);
    await updateDoc(mangaRef, {
      ...mangaData,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating manga:', error);
    throw error;
  }
};

export const deleteManga = async (mangaId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, mangaId));
  } catch (error) {
    console.error('Error deleting manga:', error);
    throw error;
  }
};
