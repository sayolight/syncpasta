import type { AxiosResponse } from "axios";
import { http } from "@/shared/api/https.ts";
import type { Pasta } from "@/entities/pasta";

export function getPasta(): Promise<AxiosResponse<Pasta[]>> {
  return http.get(`/pasta`);
}
