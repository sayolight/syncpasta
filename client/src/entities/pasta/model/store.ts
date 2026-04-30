import type { Pasta } from "@/entities/pasta";
import { create } from "zustand";

interface PastaState {
  pastas: Pasta[];

  save: (pastas: Pasta[]) => Promise<void>;
  add: (pasta: Pasta) => void;
  update: (pasta: Partial<Pasta> & { id: number }) => void;
  remove: (id: number) => void;
}

export const usePastaStore = create<PastaState>((set) => ({
  pastas: [],
  save: async (pastas) => {
    set({ pastas });
  },

  add: (pasta) => {
    set((state) => ({
      pastas: [...state.pastas, pasta],
    }));
  },

  update: (updatedPasta) => {
    set((state) => ({
      pastas: state.pastas.map((pasta) =>
        pasta.id === pasta.id ? { ...pasta, ...updatedPasta } : pasta,
      ),
    }));
  },

  remove: (id) => {
    set((state) => ({
      pastas: state.pastas.filter((pasta) => pasta.id !== id),
    }));
  },
}));
