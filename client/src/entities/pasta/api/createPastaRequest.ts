import type { AxiosResponse } from "axios";
import { http } from "@/shared/api/https.ts";
import type { CreatePastaDTO, Pasta } from "@/entities/pasta";

export function createPastaRequest(
  pasta: CreatePastaDTO,
): Promise<AxiosResponse<Pasta>> {
  return http.post("/pasta", pasta, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
