import { http } from "@/shared/api/https.ts";
import { type ApplicationLogs } from "@/entities/application";
import { useQuery } from "@tanstack/react-query";

async function viewApplicationLogs(applicationId: string) {
  const response = await http.get<ApplicationLogs[]>(
    "/applications/" + applicationId + "/logs",
  );
  return response.data;
}

export function useViewApplicationLogs(applicationId: string) {
  return useQuery({
    queryKey: ["applicationLogs", applicationId],
    queryFn: () => viewApplicationLogs(applicationId),
  });
}
