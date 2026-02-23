import { http } from "@/shared/api/https.ts";
import type { AxiosResponse } from "axios";
import type { Application } from "@/entities/application";

export function getApplications(): Promise<AxiosResponse<Application[]>> {
  return http.get(`/api-key`);
}
