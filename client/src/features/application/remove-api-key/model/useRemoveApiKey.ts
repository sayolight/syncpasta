import { useState } from "react";
import { http } from "@/shared/api/https.ts";
import type { Application } from "@/entities/application";
import { AxiosError } from "axios";
import { useApplicationStore } from "@/entities/application/model/store.ts";

export function useRemoveApiKey() {
  const { remove } = useApplicationStore();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const removeApiKey = async (data: { id: string }) => {
    try {
      setLoading(true);
      setError(null);
      await http.post<Application>("/applications/revoke", data);
      remove(data.id);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.name);
      }
    } finally {
      setLoading(false);
    }
  };

  return { removeApiKey, isLoading, error };
}
