import {
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  onAuthStateChanged,
  type User,
} from "@firebase/auth";
import { auth } from "@/shared/config/firebase.ts";

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = () => {
  return signOutFirebase(auth);
};

export const onChange = (cb: (user: User | null) => void) => {
  return onAuthStateChanged(auth, cb);
};
