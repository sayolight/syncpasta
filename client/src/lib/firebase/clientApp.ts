import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const clientCredentials = {
    apiKey: "AIzaSyBXq5YFbkjMLv50TDt842zY6QWEZeAFo2Q",
    authDomain: "syncpasta.firebaseapp.com",
    projectId: "syncpasta",
    storageBucket: "syncpasta.firebasestorage.app",
    messagingSenderId: "217775296764",
    appId: "1:217775296764:web:392b13f22aa56b26594779",
    measurementId: "G-LC71NC10ED"
};

export const firebaseApp = initializeApp(clientCredentials);
export const auth = getAuth(firebaseApp);


