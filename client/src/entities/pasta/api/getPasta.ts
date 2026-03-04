import type { AxiosResponse } from "axios";
import { http } from "@/shared/api/https.ts";
import type { Pasta } from "@/entities/pasta";

export function getPasta(query?: string): Promise<AxiosResponse<Pasta[]>> {
  return http.get(`/pasta`, {
    params: {
      query: query,
    },
  });
}
