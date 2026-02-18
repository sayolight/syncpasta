import axios from "axios";
import { getAuth } from "@/shared/api/firebase";
import { onIdTokenChanged } from "@firebase/auth";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

http.interceptors.request.use(async (config) => {
  const auth = getAuth();

  if (!auth.currentUser) {
    await new Promise((resolve) => {
      const unsubscribe = onIdTokenChanged(auth, () => {
        unsubscribe();
        resolve(null);
      });
    });
  }

  const idToken = await auth.currentUser?.getIdToken();

  config.headers.Authorization = "Bearer " + idToken;
  return config;
});
