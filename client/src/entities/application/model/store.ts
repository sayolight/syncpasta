import { create } from "zustand";
import { type Application, getApplications } from "@/entities/application";

interface ApplicationState {
  applications: Application[];

  fetch: () => Promise<void>;
  add: (app: Application) => void;
  update: (app: Application) => void;
  remove: (id: string) => void;
}

export const useApplicationStore = create<ApplicationState>((set) => ({
  applications: [],
  fetch: async () => {
    const res = await getApplications();
    set({ applications: res.data });
  },

  add: (app) => {
    set((state) => ({
      applications: [...state.applications, app],
    }));
  },

  update: (updatedApp) => {
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === updatedApp.id ? updatedApp : app,
      ),
    }));
  },

  remove: (id) => {
    set((state) => ({
      applications: state.applications.filter((app) => app.id !== id),
    }));
  },
}));
