import { useState } from "react";
import { usePastaStore } from "@/entities/pasta";
import { AxiosError } from "axios";
import { updatePastaRequest } from "@/entities/pasta/api/updatePastaRequest.ts";
import { removePastaRequest } from "@/entities/pasta/api/removePastaRequest.ts";

export function useEditPasta() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const { update, remove } = usePastaStore();

  const editPasta = async (
    id: number,
    data: { keywords?: string; text?: string },
  ) => {
    try {
      setLoading(true);
      setError(null);
      const updatePastaResponse = await updatePastaRequest(id, data);
      update(updatePastaResponse.data);
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
      await removePastaRequest(id);
      remove(id);
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
