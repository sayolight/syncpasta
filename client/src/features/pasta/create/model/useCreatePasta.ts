import { useState } from "react";
import type { Pasta } from "@/entities/pasta";
import { http } from "@/shared/api/https.ts";
import { AxiosError } from "axios";

export function useCreatePasta() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const createPasta = async (data: FormData) => {
    try {
      setLoading(true);
      setError(null);
      await http.post<Pasta>("/pasta", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
