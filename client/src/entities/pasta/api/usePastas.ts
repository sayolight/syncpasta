import { http } from "@/shared/api/https.ts";
import { useQuery } from "@tanstack/react-query";
import type { Pasta } from "@/entities/pasta";

async function fetchPastas(query?: string): Promise<Pasta[]> {
  const response = await http.get<Pasta[]>(`/pasta`, {
    params: {
      query,
    },
  });
  return response.data;
}

export function usePastas(query?: string) {
  return useQuery({
    queryKey: ["pastas", query],
    queryFn: () => fetchPastas(query),
  });
}
