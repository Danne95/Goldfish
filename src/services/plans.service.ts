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
import type { Plan } from '../types';

const COLLECTION_NAME = 'plans';

// Create a new plan
export const createPlan = async (userId: string, planData: Omit<Plan, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...planData,
      userId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating plan:', error);
    throw error;
  }
};

// Get all plans for a user
export const getPlansByUser = async (userId: string): Promise<Plan[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Plan));
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
};

// Update a plan
export const updatePlan = async (planId: string, planData: Partial<Plan>): Promise<void> => {
  try {
    const planRef = doc(db, COLLECTION_NAME, planId);
    await updateDoc(planRef, {
      ...planData,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating plan:', error);
    throw error;
  }
};

// Delete a plan
export const deletePlan = async (planId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, planId));
  } catch (error) {
    console.error('Error deleting plan:', error);
    throw error;
  }
};
