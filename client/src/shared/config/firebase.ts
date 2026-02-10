import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXq5YFbkjMLv50TDt842zY6QWEZeAFo2Q",
  authDomain: "syncpasta.firebaseapp.com",
  projectId: "syncpasta",
  storageBucket: "syncpasta.firebasestorage.app",
  messagingSenderId: "217775296764",
  appId: "1:217775296764:web:392b13f22aa56b26594779",
  measurementId: "G-LC71NC10ED",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
