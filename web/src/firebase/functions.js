import { functions } from './firebase';

export const registerStudent = functions.httpsCallable('registerStudent');
export const registerExamStudent = functions.httpsCallable('registerExamStudent');
