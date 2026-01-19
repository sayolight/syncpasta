import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
    headers: {
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use(async (config) => {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            const token = await user.getIdToken();
            config.headers["Authorization"] = `Bearer ${token}`;
        }
    });
    return config;
});

export default api;