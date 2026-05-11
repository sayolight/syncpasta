import { http } from "@/shared/api/https.ts";
import { useQuery } from "@tanstack/react-query";
import type { Pasta } from "@/entities/pasta";

async function fetchPastas(): Promise<Pasta[]> {
  const response = await http.get<Pasta[]>(`/pasta`);
  return response.data;
}

export function usePastas() {
  return useQuery({
    queryKey: ["pastas"],
    queryFn: fetchPastas,
  });
}
