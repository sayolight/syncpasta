import { http } from "@/shared/api/https.ts";
import type { Application } from "@/entities/application";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function removeApplication(data: { id: string }): Promise<Application> {
  const response = await http.post("/applications/revoke", data);
  return response.data;
}

export function useRemoveApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeApplication,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },
  });
}
