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
import type { WeeklyAnime } from '../types';

const COLLECTION_NAME = 'anime';

export const createAnime = async (userId: string, animeData: Omit<WeeklyAnime, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...animeData,
      userId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating anime:', error);
    throw error;
  }
};

export const getAnimeByUser = async (userId: string): Promise<WeeklyAnime[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as WeeklyAnime));
  } catch (error) {
    console.error('Error fetching anime:', error);
    throw error;
  }
};

export const updateAnime = async (animeId: string, animeData: Partial<WeeklyAnime>): Promise<void> => {
  try {
    const animeRef = doc(db, COLLECTION_NAME, animeId);
    await updateDoc(animeRef, {
      ...animeData,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating anime:', error);
    throw error;
  }
};

export const deleteAnime = async (animeId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, animeId));
  } catch (error) {
    console.error('Error deleting anime:', error);
    throw error;
  }
};
