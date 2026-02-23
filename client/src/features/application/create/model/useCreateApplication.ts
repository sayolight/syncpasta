import { useState } from "react";
import { http } from "@/shared/api/https.ts";
import { AxiosError } from "axios";
import type { Application } from "@/entities/application";
import { useApplicationStore } from "@/entities/application/model/store.ts";

export function useCreateApplication() {
  const { add } = useApplicationStore();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const createApplication = async (data: {
    name: string;
    description: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const application = await http.post<Application>("/api-key/", data);
      add(application.data);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.name);
      }
    } finally {
      setLoading(false);
    }
  };

  return { createApplication, isLoading, error };
}
