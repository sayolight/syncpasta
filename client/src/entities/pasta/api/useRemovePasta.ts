import { http } from "@/shared/api/https.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function removePasta(id: number) {
  const response = await http.delete("/pasta/" + id);
  return response.data;
}

export function useRemovePasta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removePasta,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pastas"],
      });
    },
  });
}
