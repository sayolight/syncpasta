import type { AxiosResponse } from "axios";
import type { Pasta } from "@/entities/pasta";
import { http } from "@/shared/api/https.ts";

export function removePastaRequest(id: number): Promise<AxiosResponse<Pasta>> {
  return http.delete<Pasta>("/pasta/" + id);
}
