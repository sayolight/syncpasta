import { Button } from "@ui/button";
import type { Application } from "@/entities/application";
import { useResetApiKey } from "@/features/application/reset-api-key/model/useResetApiKey.ts";
import { useTranslation } from "react-i18next";

interface ResetApiKeyButtonProps {
  application: Application;
}

export function ResetApiKeyButton({ application }: ResetApiKeyButtonProps) {
  const { t } = useTranslation();
  const { resetApiKey, isLoading } = useResetApiKey();

  return (
    <Button
      variant={"primary"}
      disabled={isLoading}
      onClick={() => resetApiKey({ id: application.id })}
    >
      {t("application.key.reset")}
    </Button>
  );
}
