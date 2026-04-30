import { useState } from "react";
import { getPastaRequest, usePastaStore } from "@/entities/pasta";
import { AxiosError } from "axios";

export function usePastaSearch() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const { save } = usePastaStore();

  const pastaSearch = async (query?: string) => {
    try {
      setLoading(true);
      setError(null);
      const getPastaResponse = await getPastaRequest(query);
      await save(getPastaResponse.data);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.name);
      }
    } finally {
      setLoading(false);
    }
  };

  return { pastaSearch, isLoading, error };
}
