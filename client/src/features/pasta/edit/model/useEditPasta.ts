import { useState } from "react";
import type { Pasta } from "@/entities/pasta";
import { AxiosError } from "axios";
import { http } from "@/shared/api/https.ts";

export function useEditPasta(onUpdate: () => void) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const editPasta = async (
    id: number,
    data: { keywords?: string; text?: string },
  ) => {
    try {
      setLoading(true);
      setError(null);
      await http.patch<Pasta>("/pasta/" + id, data);
      onUpdate();
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.name);
      }
    } finally {
      setLoading(false);
    }
  };

  const removePasta = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await http.delete<Pasta>("/pasta/" + id);
      onUpdate();
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.name);
      }
    } finally {
      setLoading(false);
    }
  };

  return { editPasta, removePasta, isLoading, error };
}
