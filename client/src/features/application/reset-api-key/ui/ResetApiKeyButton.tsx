import { Button } from "@ui/button";
import type { Application } from "@/entities/application";
import { useResetApiKey } from "@/features/application/reset-api-key/model/useResetApiKey.ts";
import { useApplicationStore } from "@/entities/application/model/store.ts";

interface ResetApiKeyButtonProps {
  application: Application;
}

export function ResetApiKeyButton({ application }: ResetApiKeyButtonProps) {
  const { update } = useApplicationStore();
  const { resetApiKey, isLoading } = useResetApiKey();

  return (
    <Button
      variant={"primary"}
      disabled={isLoading}
      onClick={() => resetApiKey({ id: application.id }, update)}
    >
      reset
    </Button>
  );
}
