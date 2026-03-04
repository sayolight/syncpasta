import { useState } from "react";
import { http } from "@/shared/api/https.ts";
import type { Application } from "@/entities/application";
import { AxiosError } from "axios";
import { useApplicationStore } from "@/entities/application/model/store.ts";

export function useResetApiKey() {
  const { update } = useApplicationStore();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const resetApiKey = async (data: { id: string }) => {
    try {
      setLoading(true);
      const applicationUpdated = await http.post<Application>(
        "/applications/reset",
        {
          id: data.id,
        },
      );
      update(applicationUpdated.data);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.name);
      }
    } finally {
      setLoading(false);
    }
  };

  return { resetApiKey, isLoading, error };
}
