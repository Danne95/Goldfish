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
import type { Birthday } from '../types';

const COLLECTION_NAME = 'birthdays';

export const createBirthday = async (userId: string, birthdayData: Omit<Birthday, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...birthdayData,
      userId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating birthday:', error);
    throw error;
  }
};

export const getBirthdaysByUser = async (userId: string): Promise<Birthday[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Birthday));
  } catch (error) {
    console.error('Error fetching birthdays:', error);
    throw error;
  }
};

export const updateBirthday = async (birthdayId: string, birthdayData: Partial<Birthday>): Promise<void> => {
  try {
    const birthdayRef = doc(db, COLLECTION_NAME, birthdayId);
    await updateDoc(birthdayRef, {
      ...birthdayData,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating birthday:', error);
    throw error;
  }
};

export const deleteBirthday = async (birthdayId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, birthdayId));
  } catch (error) {
    console.error('Error deleting birthday:', error);
    throw error;
  }
};
