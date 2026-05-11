import type { Pasta } from "@/entities/pasta";
import { http } from "@/shared/api/https.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function editPasta(data: {
  id: number;
  data: { keywords?: string; text?: string };
}): Promise<Pasta> {
  const response = await http.patch<Pasta>("/pasta/" + data.id, data.data);
  return response.data;
}

export function useEditPasta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editPasta,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pastas"],
      });
    },
  });
}
