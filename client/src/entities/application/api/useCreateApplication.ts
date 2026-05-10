import { http } from "@/shared/api/https.ts";
import type { Application } from "@/entities/application";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createApplication(data: {
  name: string;
  description: string;
}): Promise<Application> {
  const response = await http.post<Application>("/applications/", data);
  return response.data;
}

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApplication,

    onSuccess: (data) => {
      queryClient.setQueryData<Application[]>(["applications"], (old = []) => [
        ...old,
        data,
      ]);
      // queryClient.invalidateQueries({
      //   queryKey: ["applications"],
      // });
    },
  });
}
