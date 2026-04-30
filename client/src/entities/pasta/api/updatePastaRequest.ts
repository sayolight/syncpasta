import type { AxiosResponse } from "axios";
import { http } from "@/shared/api/https.ts";
import type { Pasta } from "@/entities/pasta";

export function updatePastaRequest(
  id: number,
  data: { keywords?: string; text?: string },
): Promise<AxiosResponse<Pasta>> {
  return http.patch<Pasta>("/pasta/" + id, data);
}
