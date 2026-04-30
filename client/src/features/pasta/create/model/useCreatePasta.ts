import { useState } from "react";
import { AxiosError } from "axios";
import { createPastaRequest } from "@/entities/pasta/api/createPastaRequest.ts";
import { type CreatePastaDTO, usePastaStore } from "@/entities/pasta";

export function useCreatePasta() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const { add } = usePastaStore();

  const createPasta = async (data: FormData) => {
    try {
      setLoading(true);
      setError(null);
      const pastaResponse = await createPastaRequest(
        data as unknown as CreatePastaDTO,
      ); // TODO: fix "as" usage
      add(pastaResponse.data);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.name);
      }
    } finally {
      setLoading(false);
    }
  };

  return { createPasta, isLoading, error };
}
