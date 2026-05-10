import { http } from "@/shared/api/https.ts";
import type { Application } from "@/entities/application";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function resetApplication(data: { id: string }): Promise<Application> {
  const response = await http.post("/applications/reset", data);
  return response.data;
}

export function useResetApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetApplication,

    onSuccess: (data) => {
      queryClient.setQueryData<Application[]>(["applications"], (old = []) =>
        old.map((app: Application) => (app.id === data.id ? data : app)),
      );
    },
  });
}
