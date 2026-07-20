import { http } from "@/shared/api/https.ts";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchPastas(offset: number, query?: string) {
  const response = await http.get(`/pasta`, {
    params: {
      offset,
      query,
    },
  });
  return response.data;
}

export function usePastas(query?: string) {
  return useInfiniteQuery({
    queryKey: ["pastas", query],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchPastas(pageParam, query),
    getNextPageParam: (lastPage) => lastPage.pagination.nextOffset,
  });
}
