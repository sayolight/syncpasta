import { useState } from "react";
import { AxiosError } from "axios";
import { http } from "@/shared/api/https.ts";
import {
  type ApplicationLogs,
} from "@/entities/application";

export function useViewApplicationLogs() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const viewLogs = async (applicationId: string) => {
    try {
      setLoading(true);
      setError(null);
      const logs = await http.get<ApplicationLogs[]>(
        "/applications/" + applicationId + "/logs",
      );
      // update({
      //   id: applicationId,
      //   logs: logs.data,
      // });
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.name);
      }
    } finally {
      setLoading(false);
    }
  };

  return { viewLogs, isLoading, error };
}
