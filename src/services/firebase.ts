import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface UserPreference {
  ingredients: string[];
  age: string;
  allergens: string[];
  timestamp: Date;
}

export const savePreferences = async (preferences: Omit<UserPreference, 'timestamp'>) => {
  try {
    await addDoc(collection(db, 'preferences'), {
      ...preferences,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error saving preferences:', error);
    throw new Error('Failed to save preferences');
  }
};

export const getRecentPreferences = async (): Promise<UserPreference[]> => {
  try {
    const q = query(
      collection(db, 'preferences'),
      orderBy('timestamp', 'desc'),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate()
    })) as UserPreference[];
  } catch (error) {
    console.error('Error fetching preferences:', error);
    return [];
  }
};