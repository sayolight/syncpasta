import { http } from "@/shared/api/https.ts";
import type { Application } from "@/entities/application";
import { useQuery } from "@tanstack/react-query";

async function fetchApplications(): Promise<Application[]> {
  const response = await http.get<Application[]>(`/applications`);
  return response.data;
}

export function useApplications() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });
}
