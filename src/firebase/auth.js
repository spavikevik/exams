import { auth } from './firebase';

// Sign Up
export const createUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const signInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const signOut = () =>
  auth.signOut();

// Password Reset
export const passwordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const passwordUpdate = (password) =>
  auth.currentUser.updatePassword(password);