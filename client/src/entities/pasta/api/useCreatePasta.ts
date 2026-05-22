import { http } from "@/shared/api/https.ts";
import { type Pasta } from "@/entities/pasta";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createPasta(data: FormData): Promise<Pasta> {
  const response = await http.post<Pasta>("/pasta/", data);
  return response.data;
}

export function useCreatePasta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPasta,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pastas"],
      });
    },
  });
}
