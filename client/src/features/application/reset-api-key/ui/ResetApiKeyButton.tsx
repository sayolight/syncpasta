import { Button } from "@ui/button";
import type { Application } from "@/entities/application";
import { useResetApiKey } from "@/features/application/reset-api-key/model/useResetApiKey.ts";

interface ResetApiKeyButtonProps {
  application: Application;
}

export function ResetApiKeyButton({ application }: ResetApiKeyButtonProps) {
  const { resetApiKey, isLoading } = useResetApiKey();

  return (
    <Button
      variant={"primary"}
      disabled={isLoading}
      onClick={() => resetApiKey({ id: application.id })}
    >
      reset
    </Button>
  );
}
