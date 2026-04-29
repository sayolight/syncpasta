import {
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  getAuth as getAuthFirebase,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail as sendPasswordResetEmailFirebase,
  verifyBeforeUpdateEmail as verifyBeforeUpdateEmailFirebase,
  type User,
} from "@firebase/auth";
import { auth, app } from "@/shared/config/firebase.ts";

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = () => {
  return signOutFirebase(auth);
};

export const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const onChange = (cb: (user: User | null) => void) => {
  return onAuthStateChanged(auth, cb);
};

export const sendPasswordResetEmail = (email: string) => {
  return sendPasswordResetEmailFirebase(auth, email);
};

export const verifyBeforeUpdateEmail = (email: string) => {
  if (!auth.currentUser) {
    throw new Error("NOT_AUTHORIZED");
  }
  return verifyBeforeUpdateEmailFirebase(auth.currentUser, email);
};

export const getAuth = () => {
  return getAuthFirebase(app);
};
